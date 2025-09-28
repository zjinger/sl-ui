import {
  booleanAttribute,
  DestroyRef,
  Directive,
  ElementRef,
  inject,
  input,
  OnInit,
  signal,
  ViewContainerRef,
} from '@angular/core';
import { FocusMonitor } from '@angular/cdk/a11y';
import { NgControl } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

const PREFIX_CLS = 'sl-input';
@Directive({
  selector: 'input[nz-input],textarea[nz-input]',
  exportAs: 'slInput',
  host: {
    class: 'sl-input',
    '[attr.disabled]': 'finalDisabled() || null',
    '[class.sl-input-disabled]': 'finalDisabled()',
    '[class.sl-input-focus]': 'focused()',
  },
})
export class SlInputDirective implements OnInit {
  private elementRef = inject(ElementRef);
  private focusMonitor = inject(FocusMonitor);
  private destroyRef = inject(DestroyRef);
  protected hostView = inject(ViewContainerRef);
  readonly ngControl = inject(NgControl, { self: true, optional: true });
  readonly controlDisabled = signal(false);
  protected readonly focused = signal<boolean>(false);
  readonly disabled = input(false, { transform: booleanAttribute });

  readonly finalDisabled = this.ngControl
    ? this.controlDisabled
    : this.disabled;

  constructor() {
    this.destroyRef.onDestroy(() => {
      this.focusMonitor.stopMonitoring(this.elementRef);
    });
    this.focusMonitor
      .monitor(this.elementRef, false)
      .pipe(takeUntilDestroyed())
      .subscribe((origin) => {
        this.focused.set(!!origin);
      });
  }
  ngOnInit(): void {}
}
