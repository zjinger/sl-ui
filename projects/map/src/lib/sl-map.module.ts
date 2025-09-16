import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { SlMapControlComponent, SlMapControlDirective, SlMapZoomControlComponent, SlMapCoordinateControlComponent, SlMapScaleControlComponent } from './sl-map-control';
import { SlMapOutletComponent, SlMapOutletDirective, SlMapOutletItemComponent, SlMapOutletService } from './sl-map-outlet';
import { SlMapComponent } from './sl-map.component';
import { SlMapService } from './sl-map.service';
import { SlMapOutletUtilService } from './sl-map-outlet/sl-map-outlet-util.service';
import { SlMapTilelayerComponent } from './sl-map-tilelayer/sl-map-tilelayer.component';

@NgModule({
  declarations: [
    SlMapOutletComponent,
    SlMapOutletItemComponent,
    SlMapControlComponent,
    SlMapOutletDirective,
    SlMapComponent,
    SlMapControlDirective,
    SlMapZoomControlComponent,
    SlMapCoordinateControlComponent,
    SlMapScaleControlComponent,
    SlMapTilelayerComponent
  ],
  imports: [
    CommonModule,
    NzButtonModule,
    NzIconModule,
    NzToolTipModule
  ],
  providers: [
    SlMapService,
    SlMapOutletService,
    SlMapOutletUtilService
  ],
  exports: [
    SlMapComponent,
    SlMapOutletComponent,
    SlMapControlComponent,
    SlMapControlDirective,
    SlMapZoomControlComponent,
    SlMapCoordinateControlComponent,
    SlMapScaleControlComponent,
    SlMapTilelayerComponent
  ]
})
export class SlMapModule { }
