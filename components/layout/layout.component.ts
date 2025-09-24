import { Component, ElementRef, Input, Renderer2 } from '@angular/core';

@Component({
  selector: 'sl-layout',
  exportAs: 'slLayout',
  imports: [],
  standalone: true,
  template: `<ng-content></ng-content>`,
  styleUrl: './layout.component.less',
  host: {
    class: 'sl-layout',
  },
})
export class SlLayoutComponent {
  @Input() slDirection: 'horizontal' | 'vertical' = 'vertical';
  constructor(private renderer: Renderer2, private elementRef: ElementRef) {}

  ngOnInit() {
    this.renderer.setStyle(
      this.elementRef.nativeElement,
      'flex-direction',
      this.slDirection === 'vertical' ? 'column' : 'row'
    );
  }
}
