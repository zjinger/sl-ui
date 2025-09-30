import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SlMenuNode } from '../menu.model';
import { SlMenuItemComponent } from '../menu-item.component';
import { SlSubmenuComponent } from '../submenu.component';
@Component({
  selector: 'sl-menu-nodes',
  imports: [CommonModule, SlMenuItemComponent, SlSubmenuComponent],
  templateUrl: './menu-nodes.component.html',
  styleUrl: './menu-nodes.component.less'
})
export class SlMenuNodesComponent {
  @Input() slNodes: SlMenuNode[] = [];

  /** 当前选中的 key（由最外层 <sl-menu> 控制） */
  @Input() slActiveKey?: string;

  /** 当前已展开的 keys（由最外层 <sl-menu> 控制） */
  @Input() slOpenKeys: string[] = [];

  /** 向上冒泡：选中项 */
  @Output() slSelect = new EventEmitter<string>();
  /** 向上冒泡：展开/收起 */
  @Output() slOpenChange = new EventEmitter<{ key: string; open: boolean }>();

  isOpen(key?: string) {
    return !!key && this.slOpenKeys.includes(key);
  }

  trackByKey = (_: number, n: SlMenuNode) => ('key' in n && n.key ? n.key : n.type);
}
