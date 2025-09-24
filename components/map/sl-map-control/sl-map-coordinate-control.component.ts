import {
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  Renderer2,
} from '@angular/core';
import { ControlPosition } from 'leaflet';
import { SlMapService } from '../sl-map.service';
import { SlMapBaseControlComponent } from './sl-map-base-control.component';
import { CommonModule } from '@angular/common';
/**
 * @description 地图坐标控件
 * @author ZhangJing
 * @date 2024-08-16
 * @export
 * @class SlMapCoordinateControlComponent
 * @extends {SlMapBaseControlComponent}
 * @implements {OnInit}
 * @implements {OnDestroy}
 */
@Component({
  selector: 'sl-map-coordinate-control',
  standalone: true,
  imports: [CommonModule, SlMapBaseControlComponent],
  template: `<div class="sl-map-coordinate">
    <span *ngIf="latlng">{{ latlng.lat }} {{ latlng.lng }}</span>
  </div>`,
  styles: [
    `
      .sl-map-coordinate {
        background: #1d2935;
        color: #fff;
        border-radius: 4px;
        padding: 4px 6px;
      }
    `,
  ],
})
export class SlMapCoordinateControlComponent
  extends SlMapBaseControlComponent
  implements OnInit, OnDestroy
{
  @Input() override position: ControlPosition = 'bottomright';
  latlng: L.LatLng | undefined;
  constructor(
    protected override eleRef: ElementRef,
    protected override renderer: Renderer2,
    protected override mapService: SlMapService
  ) {
    super(eleRef, renderer, mapService);
  }

  private updateLatlng(e: L.LeafletMouseEvent) {
    this.latlng = e.latlng;
  }

  override onAdd(): void {
    this.latlng = this._map.getCenter();
    this._map.on('mousemove', this.updateLatlng, this);
  }

  override onRemove(): void {
    this._map.off('mousemove', this.updateLatlng, this);
  }
}
