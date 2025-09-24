import { Inject, Injectable, OnDestroy, Optional } from '@angular/core';
import * as L from 'leaflet';
import { BehaviorSubject, Subject } from 'rxjs';
import { DEFAULT_SL_MAP_CONFIG, SL_MAP_CONFIG } from './sl-map.conf';
import { filter, takeUntil } from 'rxjs/operators';
import { cloneDeep } from './utils';
import { SlMapOptions } from './sl-map.model';
/**
 * @description 地图服务，用于管理地图对象，地图事件等操作
 * @author ZhangJing
 * @date 2024-08-16
 * @export
 * @class SlMapService
 * @implements {OnDestroy}
 */
@Injectable()
export class SlMapService implements OnDestroy {
  private _worldMapKey = '';
  private destroy$: Subject<void> = new Subject<void>();
  private _map!: L.Map;
  private _change$: Subject<L.LeafletEvent> = new Subject<L.LeafletEvent>();
  private _map$: Subject<L.Map> = new BehaviorSubject<L.Map>(null!);

  get map$() {
    return this._map$.asObservable().pipe(
      takeUntil(this.destroy$),
      filter((ele) => ele != null)
    );
  }

  get worldMapKey() {
    return this._worldMapKey;
  }

  get change$() {
    return this._change$.asObservable().pipe(takeUntil(this.destroy$));
  }

  get map() {
    return this._map;
  }

  setWorldMapKey(key: string) {
    this._worldMapKey = key;
  }

  constructor(@Optional() @Inject(SL_MAP_CONFIG) cfg?: SlMapOptions) {
    this._worldMapKey = cfg?.tianditu?.tdtKey ?? '';
  }

  ngOnDestroy(): void {
    if (this.map) {
      this.map.off('zoomend', this.listener);
      this.map.off('mousemove', this.listener);
      this.map.off('moveend', this.listener);
    }
    this.destroy$.next();
    this.destroy$.complete();
    this.map.remove();
  }

  initMap(ele: HTMLElement, options?: L.MapOptions) {
    const defaultOpt = cloneDeep(DEFAULT_SL_MAP_CONFIG);
    const map = (this._map = L.map(ele, Object.assign(defaultOpt, options)));
    const layers = options?.layers || [];
    this.addLayers(layers);
    map.on('mousemove', this.listener);
    map.on('zoomend', this.listener);
    map.on('moveend', this.listener);
    this._map$.next(map);
    return map;
  }

  private listener: L.LeafletEventHandlerFn = (
    e: L.LeafletMouseEvent | L.LeafletEvent
  ) => {
    this._change$.next(e);
  };
  addLayers(layers: L.Layer[]) {
    layers.forEach((ele) => {
      ele.addTo(this.map);
    });
  }
  removeLayers(layers: L.Layer[]) {
    layers.forEach((ele) => {
      ele.remove();
    });
  }
}
