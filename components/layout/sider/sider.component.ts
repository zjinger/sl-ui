import { Component } from '@angular/core';

@Component({
  selector: 'sl-sider',
  imports: [],
  standalone: true,
  template: `<ng-content></ng-content>`,
  styleUrl: './sider.component.less',
  host: {
    class: 'sl-sider',
  },
})
export class SlSiderComponent {}
