import { Component, ElementRef, Input, Renderer2 } from '@angular/core';
import { ControlPosition } from 'leaflet';
import { SlMapService } from '../sl-map.service';
import { SlMapBaseControlComponent } from './sl-map-base-control.component';

/**
 * @description 地图比例尺控件 ，支持显示海里比例线（海里）。
 * @author ZhangJing
 * @date 2024-08-19
 * @export
 * @class SlMapScaleControlComponent
 * @extends {SlMapBaseControlComponent}
 */
@Component({
  selector: 'sl-map-scale-control',
  standalone: true,
  template: `
    <div class="sl-map-scale">
      <div class="scale-line" [style.width.px]="scaleLineWidth">
        {{ scaleText }}
      </div>
    </div>
  `,
  styles: [
    `
      .sl-map-scale {
        display: flex;
        align-items: center;
        background: #1d2935;
        border-radius: 4px;
        padding: 4px 6px;
        font-size: 12px;
        line-height: 1.5;
      }
      .scale-line {
        white-space: nowrap;
        border: 1px solid #fff;
        border-top: none;
        overflow: hidden;
        line-height: 1.1;
        font-size: 11px;
        padding: 2px 1px 1px;
        text-align: center;
        background-color: transparent;
        color: #fff;
      }
    `,
  ],
})
export class SlMapScaleControlComponent extends SlMapBaseControlComponent {
  @Input() override position: ControlPosition = 'bottomright';
  @Input() nautic = true; // 是否显示海里比例线（海里）。
  @Input() maxWidth = 100;
  // @Input() metric = false; // 是否显示公制比例线（米/公里）。

  scaleText: string = '';
  scaleLineWidth: number = 0;

  constructor(
    protected override eleRef: ElementRef,
    protected override renderer: Renderer2,
    protected override mapService: SlMapService
  ) {
    super(eleRef, renderer, mapService);
  }

  override onAdd(): void {
    this._map.on('move', this._update, this);
    this._update(); // 初始化时更新比例尺
    // 原生leaflet的比例尺控件
    // L.control.scale().addTo(this._map);
  }

  override onRemove(): void {
    this._map.off('move', this._update, this);
  }

  private _update() {
    const map = this._map,
      y = map.getSize().y / 2;

    const maxMeters = map.distance(
      map.containerPointToLatLng([0, y]),
      map.containerPointToLatLng([this.maxWidth, y])
    );

    this._updateScales(maxMeters);
  }

  private _updateScales(maxMeters: number) {
    // if (this.metric && maxMeters) {
    //   this._updateMetric(maxMeters);
    // }
    if (this.nautic && maxMeters) {
      this._updateNautic(maxMeters);
    }
  }

  private _updateMetric(maxMeters: number) {
    const meters = this._getRoundNum(maxMeters),
      label = meters < 1000 ? meters + ' m' : meters / 1000 + ' km';
    this._updateScale(label, meters / maxMeters);
  }

  private _updateNautic(maxMeters: number) {
    let maxNauticalMiles = maxMeters / 1852,
      nauticalMiles;
    if (maxMeters >= 1852) {
      nauticalMiles = this._getRoundNum.call(this, maxNauticalMiles);
      this._updateScale(
        nauticalMiles + ' nm',
        nauticalMiles / maxNauticalMiles
      );
    } else {
      // nauticalMiles = maxNauticalMiles > 0.1 ? Math.round(maxNauticalMiles * 10) / 10 : Math.round(maxNauticalMiles * 100) / 100;
      // 使用米/公里的比例尺
      this._updateMetric(maxMeters);
    }
  }

  private _updateScale(text: string, ratio: number) {
    this.scaleText = text;
    this.scaleLineWidth = this.maxWidth * ratio;
  }

  _getRoundNum(num: number) {
    let pow10 = Math.pow(10, (Math.floor(num) + '').length - 1),
      d = num / pow10;
    d = d >= 10 ? 10 : d >= 5 ? 5 : d >= 3 ? 3 : d >= 2 ? 2 : 1;

    return pow10 * d;
  }
}
