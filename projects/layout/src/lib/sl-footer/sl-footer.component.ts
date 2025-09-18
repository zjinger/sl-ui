import { Component } from '@angular/core';

@Component({
  selector: 'sl-footer',
  imports: [],
  standalone: true,
  template: `<ng-content></ng-content>`,
  styleUrl: './sl-footer.component.less',
  host: { class: 'sl-footer' },
})
export class SlFooterComponent {}
