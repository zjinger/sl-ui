import { Component, Input } from '@angular/core';
import { SlMapCompHookType, SlMapCompInstance } from '@sl-ui/map';

@Component({
  selector: 'app-map-popup-comp',
  imports: [],
  templateUrl: './map-popup-comp.component.html',
  styleUrl: './map-popup-comp.component.less',
})
export class MapPopupCompComponent implements SlMapCompInstance {
  onMapCompInit(type: SlMapCompHookType) {
    // type === 'init' 首次，type === 'refresh' 为服务端触发的“刷新”
    // 这里可以做一些数据重载或UI调整
    console.log('弹出组件被初始化', type);
  }

  onMapCompDestroy() {
    // 清理资源
    console.log('弹出组件被销毁');
  }
}
