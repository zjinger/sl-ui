import { NgModule } from '@angular/core';
import {
  SlMapControlComponent,
  SlMapControlDirective,
  SlMapZoomControlComponent,
  SlMapCoordinateControlComponent,
  SlMapScaleControlComponent,
} from './sl-map-control';
import {
  SlMapOutletComponent,
  SlMapOutletDirective,
  SlMapOutletItemComponent,
  SlMapOutletService,
} from './sl-map-outlet';
import { SlMapComponent } from './sl-map.component';
import { SlMapService } from './sl-map.service';
import { SlMapOutletUtilService } from './sl-map-outlet/sl-map-outlet-util.service';
import { SlMapTilelayerComponent } from './sl-map-tilelayer/sl-map-tilelayer.component';

@NgModule({
  declarations: [],
  imports: [
    SlMapOutletComponent,
    SlMapOutletItemComponent,
    SlMapControlComponent,
    SlMapOutletDirective,
    SlMapComponent,
    SlMapControlDirective,
    SlMapZoomControlComponent,
    SlMapCoordinateControlComponent,
    SlMapScaleControlComponent,
    SlMapTilelayerComponent,
  ],
  providers: [SlMapService, SlMapOutletService, SlMapOutletUtilService],
  exports: [
    SlMapOutletComponent,
    SlMapOutletItemComponent,
    SlMapControlComponent,
    SlMapOutletDirective,
    SlMapComponent,
    SlMapControlDirective,
    SlMapZoomControlComponent,
    SlMapCoordinateControlComponent,
    SlMapScaleControlComponent,
    SlMapTilelayerComponent,
  ],
})
export class SlMapModule {}
