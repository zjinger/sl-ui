import { Component } from '@angular/core';

@Component({
  selector: 'sl-content',
  imports: [],
  standalone: true,
  template: `<ng-content></ng-content>`,
  styleUrl: './content.component.less',
  host: {
    class: 'sl-content',
  },
})
export class SlContentComponent {}
