import { booleanAttribute, Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlSubmenuService } from './submenu.service';
@Component({
  selector: 'sl-sub-menu',
  imports: [CommonModule],
  template: ``
})
export class SlSubmenuComponent {
  public readonly slSubmenuService = inject(SlSubmenuService);
  @Input({ transform: booleanAttribute }) slOpen = false;
  setOpenStateWithoutDebounce(open: boolean): void {
    this.slSubmenuService.setOpenStateWithoutDebounce(open);
  }
}
