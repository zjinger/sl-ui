import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewEncapsulation
} from '@angular/core';
import { toCssPixel } from 'ngx-sl-ui/core/util';

@Component({
  selector: 'sl-sider',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  template: `
    <div class="sl-layout-sider-children">
      <ng-content></ng-content>
    </div>
  `,
  host: {
    class: 'sl-layout-sider',
    '[class.sl-layout-sider-light]': `slTheme === 'light'`,
    '[class.sl-layout-sider-dark]': `slTheme === 'dark'`,
    '[style.flex]': 'flexSetting',
    '[style.maxWidth]': 'widthSetting',
    '[style.minWidth]': 'widthSetting',
    '[style.width]': 'widthSetting'
  }
})
export class SlSiderComponent implements OnInit, OnChanges {
  private cdr = inject(ChangeDetectorRef);
  @Input() slWidth: number | string = 200;
  @Input() slTheme: 'light' | 'dark' = 'light';
  widthSetting: string | null = null;
  flexSetting: string | null = null;

  ngOnInit(): void {
    this.updateStyleMap();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { slWidth } = changes;
    if (slWidth) {
      this.updateStyleMap();
    }
  }

  updateStyleMap(): void {
    this.widthSetting = toCssPixel(this.slWidth);
    this.flexSetting = `0 0 ${this.widthSetting}`;
    this.cdr.markForCheck();
  }
}
