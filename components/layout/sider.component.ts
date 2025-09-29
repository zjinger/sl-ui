import { Component } from '@angular/core';

@Component({
  selector: 'sl-sider',
  imports: [],
  standalone: true,
  template: `<ng-content></ng-content>`,
  host: {
    class: 'sl-layout-sider',
  },
})
export class SlSiderComponent {}
