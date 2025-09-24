import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { SlMapService } from '../sl-map.service';
import { SlMapBaseControlComponent } from './sl-map-base-control.component';
@Component({
  selector: 'sl-map-control',
  standalone: true,
  template: `<ng-content></ng-content>`,
  host: {
    class: 'sl-map-control-container',
  },
})
export class SlMapControlComponent
  extends SlMapBaseControlComponent
  implements OnInit
{
  constructor(
    protected override eleRef: ElementRef,
    protected override renderer: Renderer2,
    protected override mapService: SlMapService
  ) {
    super(eleRef, renderer, mapService);
  }
}
