import { Directive, ElementRef, Input, OnDestroy, OnInit, Renderer2 } from "@angular/core";
import { Subject } from "rxjs";
import { SlMapService } from "../sl-map.service";
import { SlMapControl, SlMapControlOptions } from "./sl-map-control.model";
import { takeUntil } from "rxjs/operators";

@Directive({
    selector: 'sl-map-base-control',
})
export class SlMapBaseControlComponent implements OnInit, OnDestroy {
    @Input() position: L.ControlPosition = 'topleft';
    // 边距
    @Input() marginX: string | number = '8px';
    @Input() marginY: string | number = '8px';

    protected _map!: L.Map;
    control: SlMapControl | undefined;
    private el: HTMLElement
    protected destroy$: Subject<void> = new Subject()
    constructor(protected eleRef: ElementRef,
        protected renderer: Renderer2,
        protected mapService: SlMapService
    ) {
        this.el = this.eleRef.nativeElement
        this.mapService.map$.pipe(
            takeUntil(this.destroy$)
        ).subscribe(map => {
            this._map = map
            if (this.control) {
                this.control.addTo(map)
                this.onAdd()
            }
        })
    }

    ngOnDestroy(): void {
        this.destroy$.next()
        this.destroy$.complete()
        if (this.control) {
            this.control.remove()
            this.onRemove()
        }
    }

    ngOnInit(): void {
        this.setStyle();
        this.control = this.initControl(this.el)
        this.updatePosition()
    }

    onAdd() { }

    onRemove() { }

    private setStyle() {
        const el = this.el
        this.renderer.addClass(el, 'sl-map-control-container');
        this.renderer.setStyle(el, 'position', 'relative');
        this.renderer.setStyle(el, 'display', 'block');
    }
    private initControl(ele: HTMLElement) {
        const options: SlMapControlOptions = {
            position: this.position,
            element: ele
        }
        return new SlMapControl(options);
    }

    private updatePosition() {
        const position = this.position;
        const rules = {
            'topleft': ['marginTop', 'marginLeft'],
            'topright': ['marginTop', 'marginRight'],
            'bottomleft': ['marginBottom', 'marginLeft'],
            'bottomright': ['marginBottom', 'marginRight']
        }
        const rule = rules[position];
        if (!rule) {
            return;
        }

        const [tb, lr] = rule;
        const marginX = typeof this.marginX === 'number' ? `${this.marginX}px` : this.marginX;
        const marginY = typeof this.marginY === 'number' ? `${this.marginY}px` : this.marginY;
        this.renderer.setStyle(this.el, lr, marginX);
        this.renderer.setStyle(this.el, tb, marginY);
    }
}