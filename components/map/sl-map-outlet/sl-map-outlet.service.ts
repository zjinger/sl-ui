import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { uuidV4 } from '../utils';
import {
  SlMapCompHookMethod,
  SlMapCompHookMethodEnum,
  SlMapCompHookType,
  SlMapCompHookTypeEnum,
  SlMapCompInstance,
  SlMapDynamicComp,
  SlMapOutletEvent,
} from './sl-map-outlet.model';

/**
 * @description 地图弹出组件服务（严格泛型版）
 * @author
 */
@Injectable()
export class SlMapOutletService<
  T extends SlMapCompInstance = SlMapCompInstance
> {
  private _cachedComps: Array<SlMapDynamicComp<T>> = [];

  private _change$ = new Subject<SlMapOutletEvent<T>>();

  get change$(): Observable<SlMapOutletEvent<T>> {
    return this._change$.asObservable().pipe(filter((e) => !!e));
  }

  get components(): Array<SlMapDynamicComp<T>> {
    return this._cachedComps;
  }

  constructor() {}

  /** 新增（或刷新同 key / 同 component 的组件） */
  addComponent(component: SlMapDynamicComp<T>, force = false): void {
    const index = this.getIndex(component);
    if (index === -1) {
      component.uuid = uuidV4();
      this._cachedComps.push(component);
      this._change$.next({
        type: 'add',
        component,
        list: this._cachedComps,
        index: this._cachedComps.length - 1,
      });
    } else {
      this._refreshComponentByIndex(index, component, force);
    }
  }

  removeComponent(component: SlMapDynamicComp<T>): void {
    const index = this.getIndex(component);
    if (index > -1) {
      const removed = this._cachedComps.splice(index, 1)[0];
      this._change$.next({
        type: 'remove',
        component: removed,
        list: this._cachedComps,
        index,
      });
    }
  }

  refreshComponent(component: SlMapDynamicComp<T>, force = false): void {
    const index = this.getIndex(component);
    if (index > -1) {
      this._refreshComponentByIndex(index, component, force);
    }
  }

  clearComponents(): void {
    this._cachedComps = [];
    this._change$.next({
      type: 'clear',
      list: this._cachedComps,
      component: null as any, // 事件结构需要该字段，外部无需使用
    });
  }

  /** ---- 内部方法 ---- */

  private _refreshComponentByIndex(
    index: number,
    newCom: SlMapDynamicComp<T>,
    force = false
  ): void {
    const component = this._cachedComps[index];
    const options = newCom.options;

    // 与方法入参合并：add/refresh 的 force 优先；若都未传可兼容 options.force
    const doForce = force || !!options?.force;

    if (doForce) {
      component.uuid = uuidV4();
    }

    if (component.instance) {
      component.options = options;
      // 非强刷 → 触发 refresh 钩子；强刷 → 交给宿主重新创建并触发 init
      if (!doForce) {
        this.runHook(
          SlMapCompHookMethodEnum.INIT,
          component.instance as T,
          SlMapCompHookTypeEnum.REFRESH
        );
      }
    }

    this._emitRefresh(component, index);
  }

  private _emitRefresh(component: SlMapDynamicComp<T>, index: number): void {
    this._change$.next({
      type: 'refresh',
      component,
      list: this._cachedComps,
      index,
    });
  }

  /** key 优先；无 key 时按 component 去重 */
  private getIndex(component: SlMapDynamicComp<T>): number {
    return this._cachedComps.findIndex((ele) => {
      if (component.key && ele.key) return ele.key === component.key;
      return ele.component.name === component.component.name;
    });
  }

  /** 统一 Hook 调用 */
  runHook(
    method: SlMapCompHookMethod,
    compThis: T,
    type: SlMapCompHookType = 'init'
  ): void {
    const fn = (compThis as any)[method];
    if (typeof fn !== 'function') return;
    if (method === SlMapCompHookMethodEnum.INIT) {
      fn.call(compThis, type);
    } else {
      (fn as () => void).call(compThis);
    }
  }
}
