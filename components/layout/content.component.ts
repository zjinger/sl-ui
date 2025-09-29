import { Component } from '@angular/core';

@Component({
  selector: 'sl-content',
  imports: [],
  standalone: true,
  template: `<ng-content></ng-content>`,
  host: {
    class: 'sl-layout-content',
  },
})
export class SlContentComponent {}
