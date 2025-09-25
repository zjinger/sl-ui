import {
  Component,
  ContentChildren,
  EventEmitter,
  HostBinding,
  Input,
  Output,
  QueryList,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlMenuItemComponent } from '../menu-item/menu-item.component';
@Component({
  selector: 'sl-sub-menu',
  imports: [CommonModule, SlMenuItemComponent],
  templateUrl: './sub-menu.component.html',
  styleUrl: './sub-menu.component.less',
})
export class SlSubMenuComponent {
  @Input() slKey!: string;
  @Input() slTitle!: string;
  @Input() slIcon?: string;
  @Input() slOpen = false;
  @Input() slLevel = 0; // 菜单层级，从0开始
  @Output() slOpenChange = new EventEmitter<boolean>();
  @ContentChildren(SlMenuItemComponent) items!: QueryList<SlMenuItemComponent>;
  @HostBinding('class.sl-sub-menu') baseCls = true;
  @HostBinding('class.open') get openedCls() {
    return this.slOpen;
  }

  toggle() {
    this.slOpen = !this.slOpen;
    this.slOpenChange.emit(this.slOpen);
  }
}
