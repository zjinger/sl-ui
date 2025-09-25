import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  Output,
  Renderer2,
} from '@angular/core';
import { ControlPosition } from 'leaflet';
import { SlMapService } from '../sl-map.service';
import { SlMapBaseControlComponent } from './sl-map-base-control.component';
import { CommonModule } from '@angular/common';

/**
 * @description 地图控件 ，支持缩放，全屏控制
 * @author ZhangJing
 * @date 2024-08-15
 * @export
 * @class SlMapZoomControlComponent
 * @extends {SlMapBaseControlComponent}
 * @implements {OnInit}
 */
@Component({
  selector: 'sl-map-zoom-control',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="sl-map-zoom">
      <ul>
        <li>
          <a href="javascript:void(0)" title="Zoom Level">
            <span>{{ zoom }}</span>
          </a>
        </li>
        <li>
          <a href="javascript:void(0)" (click)="zoomIn()" title="放大"> + </a>
        </li>
        <li>
          <a href="javascript:void(0)" (click)="zoomOut()" title="缩小"> - </a>
        </li>
        <li>
          <a
            href="javascript:void(0)"
            (click)="fullscreenToggle()"
            [title]="isFullscreen ? '退出全屏' : '全屏'"
          >
            <span [ngClass]="isFullscreen ? 'fullscreen-exit' : 'fullscreen'">
              {{ isFullscreen ? '⤢' : '⤡' }}
            </span>
          </a>
        </li>
      </ul>
    </div>
  `,
  styles: [
    `
      .sl-map-zoom {
        background: #1d2935;
        color: #fff;
        border-radius: 4px;
        ul {
          margin: 0;
          padding: 0;
          list-style: none;
        }
        li {
          a {
            transition: background-color 0.3s;
            padding: 5px 6px;
            text-align: center;
            display: block;
            color: #fff;
          }
        }
      }
    `,
  ],
})
export class SlMapZoomControlComponent
  extends SlMapBaseControlComponent
  implements OnInit, OnDestroy
{
  @Input() override position: ControlPosition = 'bottomright';
  @Output() zoomChange: EventEmitter<number> = new EventEmitter();
  isFullscreen = false;
  zoom: number = 0;
  constructor(
    protected override eleRef: ElementRef,
    protected override renderer: Renderer2,
    protected override mapService: SlMapService
  ) {
    super(eleRef, renderer, mapService);
  }

  private updateZoom() {
    if (this._map) {
      this.zoom = this._map?.getZoom();
      this.zoomChange.emit(this.zoom);
    }
  }

  override onAdd(): void {
    this.updateZoom();
    this._map.on('zoomend', this.updateZoom, this);
  }

  override onRemove(): void {
    this._map.off('zoomend', this.updateZoom, this);
  }

  zoomIn() {
    if (this._map) {
      this._map.zoomIn();
    }
  }
  zoomOut() {
    if (this._map) {
      this._map.zoomOut();
    }
  }

  /** 监听F11 */
  @HostListener('document:keyup', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'F11') {
      event.preventDefault();
      this.fullscreenToggle();
    }
  }

  /**
   * 监听全屏事件
   */
  @HostListener('document:fullscreenchange', ['$event'])
  @HostListener('document:webkitfullscreenchange', ['$event'])
  @HostListener('document:mozfullscreenchange', ['$event'])
  @HostListener('document:MSFullscreenChange', ['$event'])
  @HostListener('document:msfullscreenchange', ['$event'])
  fullscreenChange() {
    console.log('fullscreenChange');
    this.isFullscreen = !this.isFullscreen;
  }

  fullscreenToggle() {
    if (!this.isFullscreen) {
      const docElmWithBrowsersFullScreenFunctions =
        document.documentElement as HTMLElement & {
          mozRequestFullScreen(): Promise<void>;
          webkitRequestFullscreen(): Promise<void>;
          msRequestFullscreen(): Promise<void>;
        };

      if (docElmWithBrowsersFullScreenFunctions.requestFullscreen) {
        docElmWithBrowsersFullScreenFunctions.requestFullscreen();
      } else if (docElmWithBrowsersFullScreenFunctions.mozRequestFullScreen) {
        /* Firefox */
        docElmWithBrowsersFullScreenFunctions.mozRequestFullScreen();
      } else if (
        docElmWithBrowsersFullScreenFunctions.webkitRequestFullscreen
      ) {
        /* Chrome, Safari and Opera */
        docElmWithBrowsersFullScreenFunctions.webkitRequestFullscreen();
      } else if (docElmWithBrowsersFullScreenFunctions.msRequestFullscreen) {
        /* IE/Edge */
        docElmWithBrowsersFullScreenFunctions.msRequestFullscreen();
      }
    } else {
      const docWithBrowsersExitFunctions = document as Document & {
        mozCancelFullScreen(): Promise<void>;
        webkitExitFullscreen(): Promise<void>;
        msExitFullscreen(): Promise<void>;
      };
      if (docWithBrowsersExitFunctions.exitFullscreen) {
        docWithBrowsersExitFunctions.exitFullscreen();
      } else if (docWithBrowsersExitFunctions.mozCancelFullScreen) {
        /* Firefox */
        docWithBrowsersExitFunctions.mozCancelFullScreen();
      } else if (docWithBrowsersExitFunctions.webkitExitFullscreen) {
        /* Chrome, Safari and Opera */
        docWithBrowsersExitFunctions.webkitExitFullscreen();
      } else if (docWithBrowsersExitFunctions.msExitFullscreen) {
        /* IE/Edge */
        docWithBrowsersExitFunctions.msExitFullscreen();
      }
    }
  }
}
