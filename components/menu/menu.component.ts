import {
  Component,
  ContentChildren,
  EventEmitter,
  Input,
  Output,
  QueryList,
} from '@angular/core';
import { SlMenuItemComponent } from './menu-item/menu-item.component';
import { SlMenuMode, SlMenuNode, SlSubMenuNode } from './menu.model';
import { CommonModule } from '@angular/common';
import { SlMenuNodesComponent } from './menu-nodes/menu-nodes.component';

@Component({
  selector: 'sl-menu',
  exportAs: 'slMenu',
  imports: [CommonModule, SlMenuNodesComponent],
  template: `
    <nav
      class="sl-menu"
      [class.horizontal]="slMode === 'horizontal'"
      role="menu"
    >
      <ng-container *ngIf="slItems?.length; else projected">
        <sl-menu-nodes
          [slNodes]="slItems!"
          [slActiveKey]="slActiveKey"
          [slOpenKeys]="slOpenKeys"
          (slSelect)="onNodesSelect($event)"
          (slOpenChange)="onNodesOpenChange($event)"
        >
        </sl-menu-nodes>
      </ng-container>

      <ng-template #projected>
        <ng-content></ng-content>
      </ng-template>
    </nav>
  `,
  styleUrl: './menu.component.less',
})
export class SlMenuComponent {
  /** 菜单类型：垂直/水平 */
  @Input() slMode: SlMenuMode = 'vertical';
  @Input() slInlineIndent = 16; // 内联缩进

  /** 受控选中项 */
  @Input() slActiveKey?: string;
  @Output() slActiveKeyChange = new EventEmitter<string>();

  /** 受控/双向绑定：展开中的子菜单 keys */
  @Input() slOpenKeys: string[] = [];
  @Output() slOpenKeysChange = new EventEmitter<string[]>();

  /** 数据驱动：如果提供了 items，则忽略投影内容用 items 渲染 */
  @Input() slItems?: SlMenuNode[];

  @ContentChildren(SlMenuItemComponent, { descendants: true })
  private projectedItems!: QueryList<SlMenuItemComponent>;

  ngAfterContentInit(): void {
    // 如果没有传 items，才绑定投影形式的 sl-menu-item
    if (!this.slItems) {
      this.bindProjectedItems();
      this.projectedItems.changes.subscribe(() => this.bindProjectedItems());
      this.refreshActive();
    }
    // 初始化 openKeys：读取 defaultOpen
    if (this.slItems) {
      if (this.slOpenKeys.length === 0) {
        this.slOpenKeys = this.collectDefaultOpen(this.slItems);
        this.slOpenKeysChange.emit(this.slOpenKeys.slice());
      }
      // 计算level
      this.computeLevels(this.slItems);
      console.log('SlMenuComponent slItems after level=', this.slItems);
    }
  }

  private computeLevels(nodes: SlMenuNode[], parentLevel = 0) {
    if (!nodes || nodes.length === 0) return;
    nodes.forEach((n) => {
      if (n.type === 'sub') {
        (n as SlSubMenuNode).level = parentLevel;
        this.computeLevels((n as SlSubMenuNode).children, parentLevel + 1);
      } else {
        (n as any).level = parentLevel; // item 也设置 level
      }
    });
  }

  private bindProjectedItems() {
    this.projectedItems?.forEach((it) => {
      const original = it.onClick.bind(it);
      it.onClick = () => {
        original();
        this.onItemSelect(it.slKey);
      };
      it.slSelect.subscribe((key) => this.onItemSelect(key));
    });
  }

  private onItemSelect(key: string) {
    if (this.slActiveKey !== key) {
      this.slActiveKey = key;
      this.slActiveKeyChange.emit(key);
      this.refreshActive();
    }
  }

  private refreshActive() {
    const current = this.slActiveKey;
    this.projectedItems?.forEach((it) => (it.slActive = it.slKey === current));
  }

  onNodesSelect(key: string) {
    if (this.slActiveKey !== key) {
      this.slActiveKey = key;
      this.slActiveKeyChange.emit(key);
      this.refreshActive();
    }
  }

  onNodesOpenChange(ev: { key: string; open: boolean }) {
    const { key, open } = ev;
    const set = new Set(this.slOpenKeys);
    open ? set.add(key) : set.delete(key);
    this.slOpenKeys = Array.from(set);
    this.slOpenKeysChange.emit(this.slOpenKeys.slice());
  }

  private collectDefaultOpen(
    nodes: SlMenuNode[],
    acc: string[] = []
  ): string[] {
    for (const n of nodes) {
      if (n.type === 'sub') {
        if ((n as SlSubMenuNode).defaultOpen && n.key) acc.push(n.key);
        this.collectDefaultOpen((n as SlSubMenuNode).children, acc);
      }
    }
    return acc;
  }
}
