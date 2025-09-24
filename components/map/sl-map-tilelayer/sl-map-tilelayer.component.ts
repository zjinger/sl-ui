import {
  Component,
  InjectionToken,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges,
} from '@angular/core';
import * as L from 'leaflet';
import { Subject } from 'rxjs';
import { SlMapService } from '../sl-map.service';
import { cloneDeep } from '../utils';
import {
  SlMapTiandituLayerNameType,
  SlMapTilelayerOptions,
} from './sl-map-tilelayer.model';
import { takeUntil } from 'rxjs/operators';
import { SL_MAP_SEACHART_OPTIONS, SL_MAP_TDT_OPTIONS } from '../sl-map.conf';
import { CommonModule } from '@angular/common';
export const SL_TILE_URL_TEMPLATE = new InjectionToken<string>(
  'tile_url_template'
);
export const SL_TILE_OPTIONS = new InjectionToken<L.TileLayerOptions>(
  'tile_options'
);
/**
 * @description 地图瓦片图层组件,用于在地图上加载和显示瓦片图层
 * @author ZhangJing
 * @date 2024-08-19
 * @export
 * @class SlMapTilelayerComponent
 */
@Component({
  selector: 'sl-map-tilelayer',
  standalone: true,
  imports: [CommonModule],
  template: ``,
})
export class SlMapTilelayerComponent implements OnDestroy, OnChanges {
  @Input() options: SlMapTilelayerOptions = {};
  private layers: L.TileLayer[] = [];
  private _map!: L.Map;
  private destroy$: Subject<void> = new Subject();
  constructor(private mapService: SlMapService) {
    this.mapService.map$.pipe(takeUntil(this.destroy$)).subscribe((map) => {
      this._map = map;
      this.addTileLayers(map);
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { options } = changes;
    if (options && options.currentValue) {
      this.addTileLayers(this._map);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.layers.forEach((layer) => {
      layer.remove();
    });
  }

  ngOnInit(): void {}

  addTileLayers(map: L.Map) {
    if (!map) {
      return;
    }
    this.layers = [];
    const { url, wms, tianditu, seachart, ...options } = this.options || {};
    // 添加天地图
    if (tianditu) {
      const tiandituOptions = Object.assign(
        {},
        cloneDeep(SL_MAP_TDT_OPTIONS),
        tianditu
      );
      let { url, tdtKey, tdtLayerName, ...otherOptions } = tiandituOptions!;
      if (!tdtKey) {
        console.error('请配置天地图密钥 tdtKey');
      }
      const tdtLayers =
        typeof tdtLayerName === 'string' ? [tdtLayerName] : tdtLayerName;
      if (tdtLayers?.length) {
        tdtLayers.forEach((layerName: SlMapTiandituLayerNameType) => {
          const layer = L.tileLayer(
            `${url}/DataServer?T=${layerName}_w&x={x}&y={y}&l={z}&tk=${tdtKey}`,
            { ...otherOptions }
          );
          this.layers.push(layer);
        });
      }
    }
    // 添加海图
    if (seachart) {
      const seachartOptions = Object.assign(
        {},
        cloneDeep(SL_MAP_SEACHART_OPTIONS),
        seachart
      );
      const { url, ...otherOptions } = seachartOptions!;
      console.log('seachartOptions', seachartOptions);
      if (url) {
        const seachartLayer = L.tileLayer.wms(url, otherOptions);
        this.layers.push(seachartLayer);
      }
    }
    // 添加其他瓦片图层
    if (url) {
      const layer = wms
        ? L.tileLayer.wms(url, options)
        : L.tileLayer(url, options);
      this.layers.push(layer);
    }

    this.layers.forEach((layer) => {
      layer.addTo(map);
    });
  }
}
