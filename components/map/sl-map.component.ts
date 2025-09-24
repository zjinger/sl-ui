import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import * as L from 'leaflet';
import { SlMapService } from './sl-map.service';
import { SlMapOptions } from './sl-map.model';
import { CommonModule } from '@angular/common';
/**
 * @description 地图组件，用于初始化地图对象，地图事件等操作
 * @author ZhangJing
 * @date 2024-08-16
 * @export
 * @class SlMapComponent
 * @implements {AfterViewInit}
 */
@Component({
  selector: 'sl-map',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="map-container" #map></div>
    <ng-content></ng-content>
  `,
  styles: [
    `
      :host,
      .map-container {
        position: relative;
        width: 100%;
        height: 100%;
        display: block;
        overflow: hidden;
      }
    `,
  ],
})
export class SlMapComponent implements AfterViewInit {
  @Input() slMapOption: SlMapOptions = {};
  @Output() slMapInit: EventEmitter<L.Map> = new EventEmitter();
  @ViewChild('map', { read: ElementRef, static: true }) mapEle!: ElementRef;

  map?: L.Map;
  constructor(private service: SlMapService) {}
  ngAfterViewInit(): void {
    setTimeout(() => {
      const map = this.service.initMap(
        this.mapEle.nativeElement,
        this.slMapOption
      );
      this.slMapInit.emit(map);
      this.map = map;
    });
  }
}
