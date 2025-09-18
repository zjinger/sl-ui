import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SlHeaderComponent } from './sl-header/sl-header.component';
import { SlContentComponent } from './sl-content/sl-content.component';
import { SlSiderComponent } from './sl-sider/sl-sider.component';
import { SlFooterComponent } from './sl-footer/sl-footer.component';
import { SlLayoutComponent } from './sl-layout.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SlLayoutComponent,
    SlHeaderComponent,
    SlContentComponent,
    SlSiderComponent,
    SlFooterComponent,
  ],
  exports: [
    SlLayoutComponent,
    SlHeaderComponent,
    SlContentComponent,
    SlSiderComponent,
    SlFooterComponent,
  ],
})
export class SlLayoutModule {}
