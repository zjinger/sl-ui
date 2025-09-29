import { Component, ContentChildren, DestroyRef, inject, QueryList } from '@angular/core';
import { Direction, Directionality } from '@angular/cdk/bidi';
import { SlSiderComponent } from './sider.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
@Component({
  selector: 'sl-layout',
  exportAs: 'slLayout',
  imports: [],
  standalone: true,
  template: `<ng-content></ng-content>`,
  host: {
    class: 'sl-layout',
    '[class.sl-layout-rtl]': `dir === 'rtl'`,
    '[class.sl-layout-has-sider]': 'listOfNzSiderComponent.length > 0'
  }
})
export class SlLayoutComponent {
  private destroyRef = inject(DestroyRef);
  private directionality = inject(Directionality);
  @ContentChildren(SlSiderComponent) listOfNzSiderComponent!: QueryList<SlSiderComponent>;

  dir: Direction = 'ltr';

  ngOnInit(): void {
    this.dir = this.directionality.value;
    this.directionality.change?.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(direction => {
      this.dir = direction;
    });
  }
}
