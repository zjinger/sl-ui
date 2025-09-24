/**
 * 地图瓦片图层组件配置项
 */
export interface SlMapTilelayerOptions extends L.TileLayerOptions {
  /** 瓦片服务地址 */
  url?: string;
  /** 是否是WMS服务 */
  wms?: boolean;
  /** 用于将 WMS 海图服务显示为地图上的瓦片图层 */
  seachart?: SlMapSeachartOptions;
  /** 天地图: true 时，使用默认的配置项 */
  tianditu?: SlMapTiandituOptions;
}

/**
 * 地图API 类型: http://lbs.tianditu.gov.cn/server/MapService.html
 * 默认使用球面球面墨卡托投影 ${type}_w (L.CRS.EPSG3857:https://leafletjs.cn/reference.html#crs)
 * vec:天地图矢量底图
 * cva:天地图矢量注记
 * img:天地图影像底图
 * cia:天地图影像注记
 * ter:天地图地形底图
 * cta:天地图地形注记
 * ibo:天地图地形注记
 * */
export type SlMapTiandituLayerNameType =
  | 'vec'
  | 'cva'
  | 'img'
  | 'cia'
  | 'ter'
  | 'cta'
  | 'ibo';

/**
 * 用于将天地图服务显示为地图上的瓦片图层
 */
export interface SlMapTiandituOptions {
  /** 天地图服务地址，默认 http://t{s}.tianditu.gov.cn */
  url?: string;
  /** 天地图密钥，必填*/
  tdtKey: string;
  /** 天地图图层名称,默认 ['vec','cva','ibo'] */
  tdtLayerName?: SlMapTiandituLayerNameType | SlMapTiandituLayerNameType[];
  /** 天地图瓦片子域: 默认0-7 */
  subdomains?: string[];
}

/**
 * 用于将海图WMS服务显示为地图上的瓦片图层
 */

export interface SlMapSeachartOptions extends L.WMSOptions {
  url: string;
  tiled?: boolean;
}
