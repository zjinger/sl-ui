import { Component } from '@angular/core';

@Component({
  selector: 'sl-footer',
  imports: [],
  standalone: true,
  template: `<ng-content></ng-content>`,
  host: { class: 'sl-layout-footer' },
})
export class SlFooterComponent {}
