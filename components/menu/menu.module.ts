import { NgModule } from '@angular/core';
import { SlMenuItemComponent } from './menu-item/menu-item.component';
import { SlMenuComponent } from './menu.component';
import { SlSubMenuComponent } from './sub-menu/sub-menu.component';
import { SlMenuNodesComponent } from './menu-nodes/menu-nodes.component';

@NgModule({
  declarations: [],
  imports: [
    SlMenuItemComponent,
    SlMenuComponent,
    SlSubMenuComponent,
    SlMenuNodesComponent,
  ],
  exports: [
    SlMenuComponent,
    SlMenuItemComponent,
    SlSubMenuComponent,
    SlMenuNodesComponent,
  ],
})
export class SlMenuModule {}
