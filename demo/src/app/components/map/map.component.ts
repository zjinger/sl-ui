import { Component } from '@angular/core';
import { SlMapModule, SlMapOptions, SlMapOutletService } from 'ngx-sl-ui/map';
import { MapPopupCompComponent } from './map-popup-comp/map-popup-comp.component';
import { CommonModule } from '@angular/common';
import { environment } from 'demo/src/environments/environment';
@Component({
  selector: 'app-map',
  imports: [CommonModule, SlMapModule],
  templateUrl: './map.component.html',
  styleUrl: './map.component.less',
})
export class MapComponent {
  mapOptions: SlMapOptions = {
    tianditu: {
      tdtKey: environment.tdtKey,
    },
  };

  constructor(private slOutlet: SlMapOutletService) {}

  openPopup() {
    this.slOutlet.addComponent({
      component: MapPopupCompComponent,
      key: 'unique-popup-1',
      options: {
        title: '弹出组件标题',
        position: {
          left: '100px',
          top: '100px',
        },
      },
    });

    setTimeout(() => {
      this.slOutlet.addComponent({
        component: MapPopupCompComponent,
        key: 'unique-popup-2',
        options: {
          draggable: true,
          title: '弹出组件标题2',
          position: {
            left: '300px',
            top: '400px',
          },
        },
      });
    }, 1000);
  }
}
