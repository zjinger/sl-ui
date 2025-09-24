import { Component } from '@angular/core';

@Component({
  selector: 'sl-header',
  imports: [],
  standalone: true,
  template: `<ng-content></ng-content>`,
  styleUrl: './header.component.less',
  host: {
    class: 'sl-header',
  },
})
export class SlHeaderComponent {}
