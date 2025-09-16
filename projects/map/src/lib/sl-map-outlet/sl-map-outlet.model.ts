import { ComponentRef, Type } from "@angular/core";
import { NzSafeAny } from "ng-zorro-antd/core/types";

/**
 * 弹出组件事件类型
 */
export type SlMapOutletEventType = 'add' | 'remove' | 'refresh' | 'clear';

/**
 * 弹出组件钩子类型
 */
export type SlMapCompHookType = 'init' | 'refresh';

export enum SlMapCompHookTypeEnum {
    INIT = 'init',
    REFRESH = 'refresh'
}

/**
 * 弹出组件钩子方法
 */
export type SlMapCompHookMethod = 'onMapCompInit' | 'onMapCompDestroy';

export enum SlMapCompHookMethodEnum {
    INIT = 'onMapCompInit',
    DESTROY = 'onMapCompDestroy'
}

/** 
 * 弹出组件类型
 */
export type SlMapDynamicCompType = 'popup' | 'layer'

/**
 * 弹出组件事件
 * @export
 */
export interface SlMapOutletEvent {
    type: SlMapOutletEventType;
    component: SlMapDynamicComp;
    list: SlMapDynamicComp[];
    index?: number;
}

export declare interface SlMapOnInit {
    onMapCompInit(type: SlMapCompHookType): void;
}
export declare interface SlMapOnDestroy {
    onMapCompDestroy(): void;
}
/**
 * 弹出组件接口
 * @export
 */
export declare interface SlMapCompRef {
    options: SlMapCompOptions;
}
/**
 * 定位方式
 * @export
 */
export interface SlMapCompPosition {
    /** 水平居中 ：当定位方式为坐标定位时，默认true */
    horizontalCenter?: boolean;
    /** 垂直居中 默认false */
    verticalCenter?: boolean;
}
/**
 * 坐标定位：根据经纬度定位，支持偏移量
 *  @export
 */
export interface SlMapCompCoordinatePosition extends SlMapCompPosition {
    /** 经纬度 */
    latlng: L.LatLng;
    /** 地图偏移量 ,偏移方向 top right  */
    offset?: [number, number];
    /** 地图放大到一定级别 */
    zoom?: number;
    /** 是否定位到中心点，使用map.setView() */
    center?: boolean;
    /** 选中的定位图标 */
    selectedMarker?: {
        iconUrl: string;
        iconSize: [number, number];
    };
}

/**
 *  绝对定位：根据top、right、bottom、left定位
 *  @export
 */
export interface SlMapCompAbsolutePosition extends SlMapCompPosition {
    top?: string | number;
    right?: string | number;
    bottom?: string | number;
    left?: string | number;
}

/**
 * 弹出组件大小
 * @export
 */
export interface SlMapCompSize {
    width: string;
    height: string;
}

/**
 * 弹出组件样式
 * @export
 */
export interface SlMapCompStyle {
    zIndex?: number;
    width?: string | number;
    height?: string | number;
    [key: string]: NzSafeAny;
}

/**
 * @description 地图弹出组件参数配置，支持定位、大小、样式等配置项
 * @author ZhangJing
 * @date 2024-08-16
 * @export
 * @interface SlMapCompOptions
 */
export interface SlMapCompOptions {
    title?: string;
    params?: NzSafeAny;
    type?: SlMapDynamicCompType
    position?: SlMapCompCoordinatePosition | SlMapCompAbsolutePosition;
    size?: SlMapCompSize;
    style?: SlMapCompStyle;
    className?: string;
    /** 是否可拖拽:只适用于 type 为popup 的组件 */
    draggable?: boolean;
    /** 是否强制刷新: true 强制刷新会先销毁组件再重新创建，false 刷新组件，调用组件的 _onReuseInit 方法 */
    force?: boolean;
}

/**
 * @description 地图动态弹出组件
 * @author ZhangJing
 * @date 2024-08-16
 * @export
 * @interface SlMapDynamicComp
 */
export interface SlMapDynamicComp {
    component: Type<SlMapCompRef>
    componentRef?: ComponentRef<SlMapCompRef>;
    instance?: SlMapCompRef;
    uuid?: string;
    options?: SlMapCompOptions;
}
