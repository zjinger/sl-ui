import * as L from "leaflet";

export interface SlMapControlOptions {
    position: L.ControlPosition;
    element: HTMLElement;
}

export class SlMapControl extends L.Control {
    private _options: SlMapControlOptions;
    private _map!: L.Map;
    private _container!: HTMLDivElement
    constructor(options: SlMapControlOptions) {
        super({ position: options.position });
        this._options = options;
        this.setPosition(options.position);
    }
    override onAdd(map: L.Map): HTMLElement {
        this._map = map;
        const { position, element } = this._options;
        this._container = L.DomUtil.create('div', 'leaflet-control-' + position);
        this._container.appendChild(element);
        this._container.style.margin = '0';
        return this._container;
    }

    override onRemove(map: L.Map): void {
        if (this._container) {
            L.DomUtil.remove(this._container);
        }
    }
}

export interface SlMapControlRef {
    control: SlMapControl
}