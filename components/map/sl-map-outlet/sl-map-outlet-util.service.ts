import { Injectable } from '@angular/core';
import * as L from 'leaflet';
import { SlMapCompStyle } from './sl-map-outlet.model';

/**
 * @description 地图弹出组件工具类
 * @author ZhangJing
 * @date 2024-08-16
 * @export
 * @class SlMapOutletUtilService
 */
@Injectable({
  providedIn: 'root',
})
export class SlMapOutletUtilService {
  constructor() {}

  /**
   * @description 获取水平方向left值与偏移量
   * @author ZhangJing
   * @date 2024-08-16
   * @param {boolean} center 是否水平居中
   * @param {number} offsetX 水平方向偏移量
   * @param {number} pointX
   * @param {number} width
   * @param {number} mapWidth
   * @returns {*}  {{ left: number, offsetX: number }}
   * @memberof SlMapOutletUtilService
   */
  getHorizontalLeft(
    center: boolean,
    offsetX: number,
    pointX: number,
    width: number,
    mapWidth: number
  ): { left: number; offsetX: number } {
    let left = 0;
    if (center) {
      left = mapWidth / 2 - width / 2;
      offsetX = pointX - left - width / 2 - offsetX;
    } else {
      left = pointX - width / 2;
      if (left < 0) {
        left = 0;
        offsetX = pointX - width / 2 - offsetX;
      } else {
        offsetX = -offsetX;
      }
    }
    return { left, offsetX };
  }

  /**
   * @description 获取垂直方向top值与偏移量
   * @author ZhangJing
   * @date 2024-08-16
   * @param {boolean} center 是否垂直居中
   * @param {number} _offsetY  垂直方向偏移量
   * @param {number} pointY 坐标点Y
   * @param {number} height 容器高度
   * @param {number} mapHeight 地图高度
   * @returns {*}  {{ top: number, offsetY: number }}
   * @memberof SlMapOutletUtilService
   */
  getVerticalTop(
    center: boolean,
    offsetY: number,
    pointY: number,
    height: number,
    mapHeight: number
  ): { top: number; offsetY: number } {
    let top = 0;
    let _offsetY = 0;
    if (center) {
      top = mapHeight / 2 - height / 2 - offsetY;
      _offsetY = pointY - top - height - offsetY;
    } else {
      top = pointY - height;
      if (top <= 0) {
        top = 0;
        _offsetY = pointY - height - offsetY;
      } else if (top > 0 && top < offsetY) {
        _offsetY = top - offsetY;
      } else {
        top -= offsetY;
      }
    }
    return { top, offsetY: _offsetY };
  }

  /**
   *  设置拖拽
   * @param map 地图实例
   * @param container  需要拖动的容器
   * @param dragEl  控制拖动的元素
   * @param boundDistance  边界距离
   */
  setDraggable(
    map: L.Map,
    container: HTMLElement,
    dragEl: HTMLElement,
    boundDistance = 10
  ) {
    const _draggable = new L.Draggable(container);
    dragEl.style.cursor = 'move';
    L.DomEvent.on(dragEl, 'mousedown', (e) => {
      _draggable.enable();
    });
    L.DomEvent.on(dragEl, 'mouseup', (e) => {
      _draggable.disable();
    });
    _draggable.on('drag', (e) => {
      const mapRect = map.getContainer().getBoundingClientRect();
      const { top: mapTop, width, height } = mapRect;
      const rect = container.getBoundingClientRect();
      const { x, y, width: w, height: h } = rect;
      const { x: translateX, y: translateY } = e.target._newPos;
      let newX, newY;
      if (x < boundDistance) {
        newX = translateX - x + boundDistance;
      }
      if (y < boundDistance + mapTop) {
        newY = translateY - y + boundDistance + mapTop;
      }
      if (x + w > width - boundDistance) {
        newX = translateX - x + width - w - boundDistance;
      }
      if (y + h > height - boundDistance) {
        newY = translateY - y + height - h - boundDistance + mapTop;
      }
      if (newX || newY) {
        L.DomUtil.setPosition(
          container,
          L.point(newX || translateX, newY || translateY)
        );
      }
    });
  }

  /**
   * @description 获取像素值，如果是字符串则直接返回，否则加上px单位返回字符串值
   * @author ZhangJing
   * @date 2024-08-16
   * @param {(number | string)} v
   * @returns {*}
   * @memberof SlMapOutletUtilService
   */
  getPx(v: number | string) {
    if (v == null || v == undefined) return 'auto';
    return typeof v == 'string' ? v : v + 'px';
  }

  genSelectedMarker(
    latlng: L.LatLng,
    selectedMarker: { iconSize: [number, number]; iconUrl: string }
  ) {
    const { iconSize, iconUrl } = selectedMarker;
    const icon = L.icon({
      iconUrl,
      iconSize,
      iconAnchor: [iconSize[0] / 2, iconSize[1] / 2],
      className: 'selected-marker-icon',
    });
    const marker = L.marker(latlng, { icon });
    return marker;
  }

  genCompStyle(styleObj: SlMapCompStyle | any): SlMapCompStyle {
    const { zIndex, width, height } = styleObj || {};
    const style: SlMapCompStyle = Object.assign({}, styleObj, {
      zIndex: zIndex || 400,
      width: this.getPx(width),
      height: this.getPx(height),
    });
    return style;
  }
}
