import type { ComponentRef, Type } from '@angular/core';
import type { LatLng } from 'leaflet';

// ---- 基础别名 ----
export type NzSafeAny = any;

/** 事件类型 */
export type SlMapOutletEventType = 'add' | 'remove' | 'refresh' | 'clear';

/** 组件生命周期 Hook 类型 */
export type SlMapCompHookType = 'init' | 'refresh';
export enum SlMapCompHookTypeEnum {
  INIT = 'init',
  REFRESH = 'refresh',
}

/** 组件生命周期 Hook 方法名 */
export type SlMapCompHookMethod = 'onMapCompInit' | 'onMapCompDestroy';
export enum SlMapCompHookMethodEnum {
  INIT = 'onMapCompInit',
  DESTROY = 'onMapCompDestroy',
}

/**
 * 弹出组件类型
 * popup：弹窗,类似于modal, 可拖拽
 * layer：图层，用于实现leaflet 的图层叠加效果（轨迹、图标等）
 */
export type SlMapDynamicCompType = 'popup' | 'layer';

// ---- 定位与样式 ----
export interface SlMapCompPosition {
  /** 水平居中（坐标定位时默认 true） */
  horizontalCenter?: boolean;
  /** 垂直居中（默认 false） */
  verticalCenter?: boolean;
}

/** 坐标定位：根据经纬度定位，支持偏移量 */
export interface SlMapCompCoordinatePosition extends SlMapCompPosition {
  /** 经纬度 */
  latlng: LatLng;
  /** 地图偏移量 [x, y]（right/下为正） */
  offset?: [number, number];
  /** 地图放大级别（可选） */
  zoom?: number;
  /** 是否将 latlng 定位到中心（setView） */
  center?: boolean;
  /** 选中高亮的定位图标 */
  selectedMarker?: {
    iconUrl: string;
    iconSize: [number, number];
  };
}

/** 绝对定位：根据 top/right/bottom/left 定位 */
export interface SlMapCompAbsolutePosition extends SlMapCompPosition {
  top?: string | number;
  right?: string | number;
  bottom?: string | number;
  left?: string | number;
}

/** 弹出组件大小 */
export interface SlMapCompSize {
  width: string;
  height: string;
}

/** 弹出组件样式 */
export interface SlMapCompStyle {
  zIndex?: number;
  width?: string | number;
  height?: string | number;
  [key: string]: NzSafeAny;
}

/** 地图弹出组件参数配置（定位/大小/样式等） */
export interface SlMapCompOptions {
  title?: string;
  params?: NzSafeAny;
  type?: SlMapDynamicCompType;
  position?: SlMapCompCoordinatePosition | SlMapCompAbsolutePosition;
  size?: SlMapCompSize;
  style?: SlMapCompStyle;
  className?: string;
  /** 仅对 popup 生效 */
  draggable?: boolean;
  /** 是否强制刷新 */
  force?: boolean;
}

/** 动态组件实例必须至少实现：@Input() options */
export interface SlMapCompInstance {
  onMapCompInit?(type: SlMapCompHookType): void;
  onMapCompDestroy?(): void;
  options?: SlMapCompOptions;
}

/** 可选：初始化/销毁 Hook（若实现，服务会按约定调用） */
export interface SlMapOnInit {
  onMapCompInit(type: SlMapCompHookType): void;
}
export interface SlMapOnDestroy {
  onMapCompDestroy(): void;
}

/**
 * 动态组件定义：
 * T 必须实现 SlMapCompRef；这样 createComponent 后的 instance / componentRef 均有强类型。
 */
export interface SlMapDynamicComp<
  T extends SlMapCompInstance = SlMapCompInstance
> {
  /** 组件类型（必须是实现了 SlMapCompInstance  的 Angular 组件） */
  component: Type<T>;
  /** 唯一标识（支持同类多实例并存；不传则按 component 做去重） */
  key?: string;
  /** Angular 组件引用 */
  componentRef?: ComponentRef<T>;
  /** 组件实例（严格为 T） */
  instance?: T;
  /** 内部使用的 uuid（服务生成） */
  uuid?: string;
  /** 组件配置（会同步注入给 instance.options） */
  options?: SlMapCompOptions;
}

// ---- 事件（带泛型，默认 SlMapCompRef） ----
export interface SlMapOutletEvent<
  T extends SlMapCompInstance = SlMapCompInstance
> {
  type: SlMapOutletEventType;
  component: SlMapDynamicComp<T>;
  list: Array<SlMapDynamicComp<T>>;
  index?: number;
}
