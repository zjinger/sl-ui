import { CommonModule } from '@angular/common';
import { Component, EventEmitter, HostBinding, HostListener, Input, Output } from '@angular/core';

@Component({
  selector: 'sl-menu-item',
  exportAs: 'slMenuItem',
  imports: [CommonModule],
  templateUrl: './menu-item.component.html',
  styleUrl: './menu-item.component.less',
  host: {
    class: 'sl-menu-item',
    '[style.paddingLeft.px]': '(slLevel  + 1) * (slInlineIndent??16)'
  }
})
export class SlMenuItemComponent {
  /** 唯一键值，用于选中态联动 */
  @Input() slKey!: string;
  /** 可选图标名（接入自家 icon 体系） */
  @Input() slIcon?: string;
  /** 禁用 */
  @Input() slDisabled = false;
  /** 选中 */
  @Input() slActive = false;

  @Input() slLevel = 0; // 菜单层级，从0开始

  @Input() slSubMenu = false; // 是否为子菜单项
  @Input() slOpen = false; // 子菜单项是否展开
  @Input() slInlineIndent = 16; // 子菜单项的左内边距增量

  /** 点击/键盘选择事件 */
  @Output() slSelect = new EventEmitter<string>();

  @HostBinding('attr.data-key') get dataKey() {
    return this.slKey;
  }
  @HostBinding('attr.role') role = 'menuitem';
  @HostBinding('attr.tabindex') get tabIndex() {
    return this.slDisabled ? -1 : 0;
  }
  @HostBinding('class.sl-menu-item') baseCls = true;
  @HostBinding('class.active') get activeCls() {
    return this.slActive;
  }
  @HostBinding('class.disabled') get disabledCls() {
    return this.slDisabled;
  }

  @HostBinding('class.open') get openedCls() {
    return this.slOpen;
  }

  onClick() {
    if (this.slDisabled) return;
    this.slSelect.emit(this.slKey);
  }

  @HostListener('keydown', ['$event'])
  onKeydown(e: KeyboardEvent) {
    if (this.slDisabled) return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      this.slSelect.emit(this.slKey);
    }
  }

  @HostListener('click', ['$event'])
  handleClick(e: MouseEvent) {
    this.onClick();
  }
}
