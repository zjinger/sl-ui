import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { uuidV4 } from '../utils';
import {
  SlMapCompHookMethod,
  SlMapCompHookMethodEnum,
  SlMapCompHookType,
  SlMapCompHookTypeEnum,
  SlMapCompOptions,
  SlMapCompRef,
  SlMapDynamicComp,
  SlMapOutletEvent,
} from './sl-map-outlet.model';
import { filter } from 'rxjs/operators';
/**
 * @description 地图弹出组件服务，用于管理地图弹出组件的增删改查等操作
 * @author ZhangJing
 * @date 2024-08-16
 * @export
 * @class SlMapOutletService
 */
@Injectable()
export class SlMapOutletService {
  private _cachedComps: SlMapDynamicComp[] = [];

  private _chagne$: Subject<SlMapOutletEvent> =
    new BehaviorSubject<SlMapOutletEvent>(null!);

  get change$(): Observable<SlMapOutletEvent> {
    return this._chagne$.asObservable().pipe(filter((ele) => ele !== null));
  }

  get components() {
    return this._cachedComps;
  }

  constructor() {}

  /**
   * @description 添加地图弹出组件
   * @author ZhangJing
   * @date 2024-08-16
   * @param {SlMapDynamicComp} component 组件
   * @param {boolean} [force=false] 是否强制刷新：true 强制刷新会先销毁组件再重新创建，false 刷新组件，调用组件的 _onReuseInit 方法
   * @memberof SlMapOutletService
   */
  addComponent(component: SlMapDynamicComp, force = false) {
    const name = component.component.name;
    const index = this._cachedComps.findIndex(
      (ele) => ele.component.name === name
    );
    if (index === -1) {
      component.uuid = uuidV4();
      this._cachedComps.push(component);
      this._chagne$.next({
        type: 'add',
        component,
        list: this._cachedComps,
        index: this._cachedComps.length - 1,
      });
    } else {
      this._refreshCompnoentByIndex(index, component, force);
    }
  }

  removeComponent(componet: SlMapDynamicComp) {
    const index = this.getIndex(componet);
    if (index > -1) {
      this._cachedComps.splice(index, 1);
      this._chagne$.next({
        type: 'remove',
        component: componet,
        list: this._cachedComps,
        index,
      });
    }
  }

  refreshComponent(component: SlMapDynamicComp, force = false) {
    const index = this.getIndex(component);
    if (index > -1) {
      this._refreshCompnoentByIndex(index, component, force);
    }
  }

  private _refreshCompnoentByIndex(
    index: number,
    newCom: SlMapDynamicComp,
    force = false
  ) {
    const component = this._cachedComps[index];
    const options = newCom.options;
    if (force) {
      component.uuid = uuidV4();
    }
    if (component.instance) {
      component.options = options;
      component.instance.options = options as SlMapCompOptions;
      // 如果是强制刷新，则会触发_onReuseInit hook type 为 init, 否则执行 refresh
      if (!force) {
        this.runHook(
          SlMapCompHookMethodEnum.INIT,
          component.instance,
          SlMapCompHookTypeEnum.REFRESH
        );
      }
    }
    this._refreshComponent(component, index);
  }

  private _refreshComponent(component: SlMapDynamicComp, index: number) {
    this._chagne$.next({
      type: 'refresh',
      component,
      list: this._cachedComps,
      index,
    });
  }

  private getIndex(component: SlMapDynamicComp): number {
    return this._cachedComps.findIndex(
      (ele) => ele.component.name === component.component.name
    );
  }

  runHook(
    method: SlMapCompHookMethod,
    compThis: SlMapCompRef,
    type: SlMapCompHookType = 'init'
  ) {
    const fn = (compThis as any)[method];
    if (typeof fn !== 'function') {
      return;
    }
    if (method === SlMapCompHookMethodEnum.INIT) {
      fn.call(compThis, type);
    } else {
      (fn as () => void).call(compThis);
    }
  }

  clearComponents() {
    this._cachedComps = [];
    this._chagne$.next({
      type: 'clear',
      list: this._cachedComps,
      component: null!,
    });
  }
}
