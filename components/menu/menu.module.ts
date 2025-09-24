import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlMenuItemComponent } from './menu-item/menu-item.component';
import { SlMenuComponent } from './menu.component';

@NgModule({
  declarations: [],
  imports: [CommonModule, SlMenuItemComponent, SlMenuComponent],
  exports: [SlMenuComponent, SlMenuItemComponent],
})
export class SlMenuModule {}
