import { Component } from '@angular/core';
import { SlMenuModule } from 'ngx-sl-ui/menu';

@Component({
  selector: 'app-menu',
  imports: [SlMenuModule],
  template: `
    <sl-menu>
      <sl-menu-item key="item1">Item 1</sl-menu-item>
      <sl-menu-item key="item2">Item 2</sl-menu-item>
      <sl-menu-item key="item3">Item 3</sl-menu-item>
    </sl-menu>
  `,
  styles: ``,
})
export class MenuComponent {}
