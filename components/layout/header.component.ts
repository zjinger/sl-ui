import { Component } from '@angular/core';

@Component({
  selector: 'sl-header',
  imports: [],
  standalone: true,
  template: `<ng-content></ng-content>`,
  host: {
    class: 'sl-layout-header'
  }
})
export class SlHeaderComponent {}
