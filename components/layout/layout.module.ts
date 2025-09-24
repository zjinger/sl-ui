import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SlHeaderComponent } from './header/header.component';
import { SlContentComponent } from './content/content.component';
import { SlSiderComponent } from './sider/sider.component';
import { SlFooterComponent } from './footer/footer.component';
import { SlLayoutComponent } from './layout.component';

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
