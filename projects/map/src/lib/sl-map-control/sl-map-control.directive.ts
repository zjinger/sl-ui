import { Directive, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { SlMapService } from '../sl-map.service';
import { SlMapBaseControlComponent } from './sl-map-base-control.component';

@Directive({
  selector: '[sl-map-control]',
  standalone: false,
})
export class SlMapControlDirective
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
