import { NgModule } from '@angular/core';
import { SlMenuItemComponent } from './menu-item.component';
import { SlSubmenuComponent } from './submenu.component';
import { SlMenuNodesComponent } from './menu-nodes/menu-nodes.component';
import { SlMenuDirective } from './menu.directive';

@NgModule({
  imports: [SlMenuDirective, SlMenuItemComponent, SlSubmenuComponent, SlMenuNodesComponent],
  exports: [SlMenuDirective, SlMenuItemComponent, SlSubmenuComponent, SlMenuNodesComponent]
})
export class SlMenuModule {}
