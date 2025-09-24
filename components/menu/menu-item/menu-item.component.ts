import { CommonModule } from '@angular/common';
import { Component, EventEmitter, HostBinding, HostListener, Input, Output } from '@angular/core';

@Component({
  selector: 'sl-menu-item',
  exportAs: 'slMenuItem',
  imports: [CommonModule],
  templateUrl: './menu-item.component.html',
  styleUrl: './menu-item.component.less',
  host: { 'class': 'sl-menu-item' },
})
export class SlMenuItemComponent {
  /** 唯一键值，用于选中态联动 */
  @Input() key!: string;
  /** 可选图标名（接入自家 icon 体系） */
  @Input() icon?: string;
  /** 禁用 */
  @Input() disabled = false;
  /** 选中 */
  @Input() active = false;

  /** 点击/键盘选择事件 */
  @Output() select = new EventEmitter<string>();

  @HostBinding('attr.data-key') get dataKey() { return this.key; }
  @HostBinding('attr.role') role = 'menuitem';
  @HostBinding('attr.tabindex') get tabIndex() { return this.disabled ? -1 : 0; }
  @HostBinding('class.sl-menu-item') baseCls = true;
  @HostBinding('class.active') get activeCls() { return this.active; }
  @HostBinding('class.disabled') get disabledCls() { return this.disabled; }

  onClick() {
    if (!this.disabled) this.select.emit(this.key);
  }

  @HostListener('keydown', ['$event'])
  onKeydown(e: KeyboardEvent) {
    if (this.disabled) return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      this.select.emit(this.key);
    }
  }
}
