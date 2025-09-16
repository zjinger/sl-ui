import * as L from 'leaflet';
import { SlMapOptions } from './sl-map.model';
import { SlMapSeachartOptions, SlMapTiandituOptions } from './sl-map-tilelayer';
import { InjectionToken, makeEnvironmentProviders } from '@angular/core';

// 默认配置（可选）
export const DEFAULT_SL_MAP_CONFIG: SlMapOptions = {
  center: L.latLng(39.906217, 116.3912757), // 北京市
  maxBounds: L.latLngBounds([-90, -220], [90, 220]),
  maxBoundsViscosity: 1,
  // worldCopyJump: false, // 超过最大东经数值变为西经，纬度同理
  zoom: 8,
  maxZoom: 18,
  minZoom: 2,
  dragging: true,
  /** The default zoom control (only available if the zoomControl option was true when creating the map). */
  zoomControl: false, // 默认的缩放控件
  attributionControl: false, // 默认的版权控件
  doubleClickZoom: false,
  preferCanvas: true, //如果使用，则polyline中没有_path属性
  closePopupOnClick: false, //点击地图不关闭弹出层
};
/** 用于在应用层注入配置 */
export const SL_MAP_CONFIG = new InjectionToken<SlMapOptions>('SL_MAP_CONFIG');

export const SL_MAP_TDT_OPTIONS: SlMapTiandituOptions = {
  url: 'http://t{s}.tianditu.gov.cn',
  tdtKey: '',
  tdtLayerName: ['vec', 'cva', 'ibo'], // 默认加载['vec','cva','ibo']
  subdomains: ['0', '1', '2', '3', '4', '5', '6', '7'],
};

export const SL_MAP_SEACHART_OPTIONS: SlMapSeachartOptions = {
  url: '',
  format: 'image/png',
  transparent: true,
  layers: '',
  tiled: true,
  zIndex: 105,
};

/** Standalone 风格的提供器 */
export function provideSlMap(config: Partial<SlMapOptions> = {}) {
  const value: SlMapOptions = { ...DEFAULT_SL_MAP_CONFIG, ...config };
  return makeEnvironmentProviders([
    { provide: SL_MAP_CONFIG, useValue: value },
  ]);
}

/** 兼容 NgModule 的 forRoot 写法*/
export class SlMapRootModule {
  static forRoot(config: Partial<SlMapOptions> = {}) {
    return {
      ngModule: SlMapRootModule,
      providers: [
        {
          provide: SL_MAP_CONFIG,
          useValue: { ...DEFAULT_SL_MAP_CONFIG, ...config },
        },
      ],
    };
  }
}
