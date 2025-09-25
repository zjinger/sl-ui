import {
  AfterViewInit,
  Component,
  ElementRef,
  EnvironmentInjector,
  Injector,
  Input,
  OnDestroy,
  Renderer2,
  ViewChild,
} from '@angular/core';
import * as L from 'leaflet';
import { takeUntil, throttleTime } from 'rxjs/operators';
import { resizeObservable } from '../utils';
import {
  SlMapCompAbsolutePosition,
  SlMapCompCoordinatePosition,
  SlMapCompHookMethodEnum,
  SlMapCompInstance,
  SlMapCompOptions,
  SlMapCompPosition,
  SlMapDynamicComp,
} from './sl-map-outlet.model';
import { SlMapService } from '../sl-map.service';
import { SlMapOutletService } from './sl-map-outlet.service';
import { SlMapOutletDirective } from './sl-map-outlet.direcitve';
import { SlMapOutletUtilService } from './sl-map-outlet-util.service';
import { Subject } from 'rxjs';
import { CommonModule } from '@angular/common';

/**
 * @description 地图弹出 component 组件, 用于弹出组件或图层组件的容器
 * @author ZhangJing
 * @date 2024-08-16
 * @export
 * @class SlMapOutletItemComponent
 * @implements {AfterViewInit}
 * @implements {OnDestroy}
 */
@Component({
  selector: 'sl-map-outlet-item',
  imports: [CommonModule, SlMapOutletDirective],
  templateUrl: './sl-map-outlet-item.component.html',
  styleUrls: ['./sl-map-outlet-item.component.less'],
  host: {
    '[class.popup]': 'componentType==="popup"',
    '[class.layer]': 'componentType==="layer"',
  },
})
export class SlMapOutletItemComponent implements AfterViewInit, OnDestroy {
  compOptions: SlMapCompOptions = {};
  @Input() component: SlMapDynamicComp | null = null;
  @ViewChild(SlMapOutletDirective, { static: true })
  slMapOutlet!: SlMapOutletDirective;
  @ViewChild('headerRef', { static: false })
  headerEleRef!: ElementRef<HTMLDivElement>;
  private map: L.Map;
  private destroy$: Subject<void> = new Subject<void>();
  private markerGroupLayer: L.LayerGroup | null = null;

  get componentType() {
    return this.component?.options?.type || 'popup';
  }

  get isPopup() {
    return this.componentType === 'popup';
  }

  get container() {
    return this.elementRef.nativeElement;
  }
  get containerSize() {
    return {
      width: this.container.clientWidth,
      height: this.container.clientHeight,
    };
  }
  get mapSize() {
    const rect = this.map.getContainer().getBoundingClientRect();
    return { width: rect.width, height: rect.height };
  }

  constructor(
    private mapService: SlMapService,
    private elementRef: ElementRef<HTMLElement>,
    private renderer: Renderer2,
    private outletService: SlMapOutletService,
    private utilService: SlMapOutletUtilService,
    private injector: Injector,
    private envInjector: EnvironmentInjector
  ) {
    this.renderer.addClass(this.container, 'leaflet-map-outlet-item');
    this.map = this.mapService.map;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    if (this.markerGroupLayer) {
      this.map.removeLayer(this.markerGroupLayer);
    }
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.loadComponent();
      if (this.isPopup) {
        resizeObservable(this.container)
          .pipe(takeUntil(this.destroy$), throttleTime(500))
          .subscribe(() => {
            this.updateCompPosition();
          });
      }
    });
  }

  close() {
    if (this.component) {
      this.outletService.runHook(
        SlMapCompHookMethodEnum.DESTROY,
        this.component.instance!
      );
      this.outletService.removeComponent(this.component);
    }
  }
  private updateCompPosition() {
    const position = this.compOptions.position as SlMapCompPosition;
    console.log('updateCompPosition', this.compOptions);
    if (!position) return;
    const { horizontalCenter, verticalCenter } = position;
    // 判断position的类型
    const isCoordinatePos = 'latlng' in position;
    // 根据坐标定位
    if (isCoordinatePos) {
      const coordinatePos = position as SlMapCompCoordinatePosition;
      const { latlng, selectedMarker, zoom, center } = coordinatePos;
      const [_offsetX, _offsetY] = coordinatePos.offset || [0, 0];
      if (zoom || center) {
        const _latlng = center ? latlng : this.map.getCenter();
        const _zoom = zoom || this.map.getZoom();
        this.map.setView(_latlng, _zoom, { animate: false });
      }
      const { x: pointX, y: pointY } = this.map.latLngToContainerPoint(latlng);
      const { width, height } = this.containerSize;
      const { width: mapWidht, height: mapHeight } = this.mapSize;
      const isHorizontalCenter = horizontalCenter !== false;
      const isVerticalCenter = verticalCenter === true;
      const { left, offsetX } = this.utilService.getHorizontalLeft(
        isHorizontalCenter,
        _offsetX,
        pointX,
        width,
        mapWidht
      );
      const { top, offsetY } = this.utilService.getVerticalTop(
        isVerticalCenter,
        _offsetY,
        pointY,
        height,
        mapHeight
      );
      this.renderer.setStyle(this.container, 'left', left + 'px');
      this.renderer.setStyle(this.container, 'top', top + 'px');
      // L.DomUtil.setPosition(this.container, L.point(left, top));
      this.map.panBy([offsetX, offsetY], { animate: false });
      this.setSelectedMarker(latlng, selectedMarker);
    } else {
      const absolutePos = position as SlMapCompAbsolutePosition;
      // 绝对定位：根据 top、left、right、bottom 定位
      Object.keys(absolutePos).forEach((key) => {
        const v = absolutePos[key as keyof typeof absolutePos];
        if (v != undefined) {
          this.renderer.setStyle(
            this.container,
            key,
            this.utilService.getPx(v as string)
          );
        }
      });
    }
    if (this.compOptions.draggable) {
      console.log('setDraggable', this.headerEleRef);
      console.log('setDraggable', this.container);
      console.log('setDraggable', this.map);
      this.utilService.setDraggable(
        this.map,
        this.container,
        this.headerEleRef.nativeElement
      );
    }
  }

  private setSelectedMarker(
    latlng: L.LatLng,
    selectedMarker?: { iconSize: [number, number]; iconUrl: string }
  ) {
    if (!selectedMarker) return;
    const marker = this.utilService.genSelectedMarker(latlng, selectedMarker);
    if (!this.markerGroupLayer) {
      this.markerGroupLayer = L.layerGroup([marker]).addTo(this.map);
    } else {
      this.markerGroupLayer.clearLayers();
      this.markerGroupLayer.addLayer(marker);
    }
  }

  private setCompStyle() {
    const style = this.utilService.genCompStyle(this.compOptions?.style);
    Object.keys(style).forEach((key) => {
      this.renderer.setStyle(this.container, key, style[key]);
    });
  }

  updateCompOptions(options: SlMapCompOptions) {
    console.log('updateCompOptions', options);
    this.compOptions = options;
    if (this.isPopup) {
      this.updateCompPosition();
      this.setCompStyle();
      // translate3d(0px, 0px, 0px)
      L.DomUtil.setPosition(this.container, L.point(0, 0));
    }
  }

  private loadComponent() {
    if (!this.component) return;
    const vcr = this.slMapOutlet.viewContainerRef;
    vcr.clear();
    const compRef = vcr.createComponent(this.component.component, {
      injector: this.injector,
      environmentInjector: this.envInjector,
    });
    const initialOptions: SlMapCompOptions = this.component.options ?? {};
    (compRef.instance as SlMapCompInstance).options = initialOptions;
    console.log('loadComponent', initialOptions);
    this.compOptions = initialOptions;
    this.component.instance = compRef.instance as SlMapCompInstance;
    this.component.componentRef = compRef;

    this.outletService.runHook(
      SlMapCompHookMethodEnum.INIT,
      this.component.instance
    );

    if (this.isPopup) {
      this.setCompStyle();
    }
  }
}
