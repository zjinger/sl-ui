import { Component } from '@angular/core';
import { SlMapModule, SlMapOptions, SlMapOutletService } from '@sl-ui/map';
import { environment } from '../environments/environment';
import { MapPopupCompComponent } from './map-popup-comp/map-popup-comp.component';
@Component({
  selector: 'app-root',
  imports: [SlMapModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.less',
})
export class AppComponent {
  title = 'demo';
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
