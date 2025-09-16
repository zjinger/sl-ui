import { Component } from '@angular/core';
import { SlMapModule, SlMapOptions } from '@sl-ui/map';
import { environment } from '../environments/environment';
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
}
