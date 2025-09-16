import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[slMapOutlet]',
  standalone: false,
})
export class SlMapOutletDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
