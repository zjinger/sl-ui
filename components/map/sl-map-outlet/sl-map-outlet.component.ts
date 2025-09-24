import { Component, OnDestroy, ViewChildren } from '@angular/core';
import { Subscription } from 'rxjs';
import { SlMapDynamicComp, SlMapOutletEvent } from './sl-map-outlet.model';
import { SlMapOutletService } from './sl-map-outlet.service';
import { SlMapOutletItemComponent } from './sl-map-outlet-item.component';

@Component({
  selector: 'sl-map-outlet',
  standalone: true,
  imports: [SlMapOutletItemComponent],
  template: `
    <ng-container *ngFor="let comp of list; trackBy: trackById">
      <sl-map-outlet-item [component]="comp"></sl-map-outlet-item>
    </ng-container>
  `,
})
export class SlMapOutletComponent implements OnDestroy {
  @ViewChildren(SlMapOutletItemComponent) items!: SlMapOutletItemComponent[];
  list: SlMapDynamicComp[] = [];
  private sub: Subscription = new Subscription();
  // map!: L.Map
  constructor(
    private service: SlMapOutletService // private elementRef: ElementRef<HTMLElement>, // private renderer: Renderer2, // private mapService: SlMapService
  ) {
    this.sub.add(
      this.service.change$.subscribe((event) => {
        this.genComponents(event);
      })
    );
    // this.sub.add(
    //   this.mapService.map$.subscribe(map => {
    //     this.map = map
    //     const overlayPane = this.map.getPane('overlayPane')
    //     this.renderer.appendChild(overlayPane, this.elementRef.nativeElement)
    //   })
    // )
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  private genComponents(event: SlMapOutletEvent) {
    this.list = event.list;
    // 非强制刷新时，只更新组件的 options
    if (event.type === 'refresh') {
      const item = this.items.find(
        (ele) => ele.component?.uuid === event.component?.uuid
      );
      if (item) {
        item.updateCompOptions(event.component?.options || {});
        // 这里不直接调整位置，而是通过排序实现,确保刷新的组件在最后，置于最上层
        this.list = this.list.sort((a, b) => {
          // 确保目标组件排在后面
          return a.uuid === event.component?.uuid ? 1 : -1;
        });
      }
    }
  }

  trackById(index: number, item: SlMapDynamicComp) {
    return item.uuid!;
  }
}
