import {
  Component,
  ContentChildren,
  EventEmitter,
  Input,
  Output,
  QueryList,
} from '@angular/core';
import { SlMenuItemComponent } from './menu-item/menu-item.component';

@Component({
  selector: 'sl-menu',
  exportAs: 'slMenu',
  template: `
    <nav class="sl-menu" [class.horizontal]="mode === 'horizontal'" role="menu">
      <ng-content></ng-content>
    </nav>
  `,
  styles: `
    .sl-menu {
      display: flex;
      flex-direction: column;

      &.horizontal {
        flex-direction: row;

        ::ng-deep sl-menu-item {
          height: 44px;
        }
      }
    }
  `,
})
export class SlMenuComponent {
  @Input() mode: 'vertical' | 'horizontal' = 'vertical';

  /** 受控选中项 */
  @Input() activeKey?: string;
  @Output() activeKeyChange = new EventEmitter<string>();

  @ContentChildren(SlMenuItemComponent, { descendants: true })
  items!: QueryList<SlMenuItemComponent>;

  ngAfterContentInit(): void {
    this.bindItems();
    this.items.changes.subscribe(() => this.bindItems());
    this.refreshActive();
  }

  private bindItems() {
    this.items.forEach((it) => {
      // 防止重复订阅，这里用一次性赋值（简化）
      const original = it.onClick.bind(it);
      it.onClick = () => {
        original();
        this.onItemSelect(it.key);
      };
      it.select.subscribe((key) => this.onItemSelect(key));
    });
  }

  private onItemSelect(key: string) {
    if (this.activeKey !== key) {
      this.activeKey = key;
      this.activeKeyChange.emit(key);
      this.refreshActive();
    }
  }

  private refreshActive() {
    const current = this.activeKey;
    this.items?.forEach((it) => (it.active = it.key === current));
  }
}
