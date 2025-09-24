import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[slMapOutlet]',
  standalone: true,
})
export class SlMapOutletDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
