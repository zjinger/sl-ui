import { NgModule } from '@angular/core';

import { SlHeaderComponent } from './header.component';
import { SlContentComponent } from './content.component';
import { SlSiderComponent } from './sider.component';
import { SlFooterComponent } from './footer.component';
import { SlLayoutComponent } from './layout.component';

@NgModule({
  declarations: [],
  imports: [
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
