import { CommonModule } from '@angular/common';
import {
  booleanAttribute,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  EventEmitter,
  HostBinding,
  inject,
  Input,
  Output
} from '@angular/core';
import { SlMenuService } from './menu.service';
import { numberAttributeWithZeroFallback } from 'ngx-sl-ui/core/util';
import { Subject } from 'rxjs';
import { SlSubmenuService } from './submenu.service';

@Component({
  selector: 'sl-menu-item',
  exportAs: 'slMenuItem',
  imports: [CommonModule],
  template: `
    <span class="sl-menu-title-content">
      <ng-content></ng-content>
    </span>
  `,
  host: {
    class: 'sl-menu-item',
    '[class.sl-menu-item-selected]': 'slSelected',
    '[class.sl-menu-item-disabled]': 'slDisabled',
    '[style.paddingLeft.px]': '(slLevel  + 1) * (slInlineIndent??16)',
    '(click)': 'handleClick($event)'
  }
})
export class SlMenuItemComponent {
  private readonly slMenuService = inject(SlMenuService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly slSubmenuService = inject(SlSubmenuService, { optional: true });

  level = this.slSubmenuService ? this.slSubmenuService.level + 1 : 1;
  selected$ = new Subject<boolean>();

  /** 唯一键值，用于选中态联动 */
  @Input() slKey!: string;
  /** 可选图标名（接入自家 icon 体系） */
  @Input() slIcon?: string;
  /** 禁用 */
  @Input() slDisabled = false;
  /** 选中 */
  @Input({ transform: numberAttributeWithZeroFallback }) slPaddingLeft?: number;
  @Input({ transform: booleanAttribute }) slSelected = false;

  @Input() slSubMenu = false; // 是否为子菜单项
  @Input() slOpen = false; // 子菜单项是否展开
  @Input() slInlineIndent = 16; // 子菜单项的左内边距增量

  /** 点击/键盘选择事件 */
  @Output() slSelect = new EventEmitter<string>();

  @HostBinding('attr.data-key') get dataKey() {
    return this.slKey;
  }
  @HostBinding('attr.role') role = 'menuitem';

  setSelectedState(value: boolean): void {
    this.slSelected = value;
    this.selected$.next(value);
  }

  onClick() {
    if (this.slDisabled) return;
    this.slSelect.emit(this.slKey);
  }

  handleClick(e: MouseEvent) {
    if (this.slDisabled) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    this.slMenuService.onDescendantMenuItemClick(this);
  }
}
