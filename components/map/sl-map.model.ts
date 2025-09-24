import { SlMapSeachartOptions, SlMapTiandituOptions } from "./sl-map-tilelayer";

export interface SlMapOptions extends L.MapOptions {
    tianditu?: SlMapTiandituOptions;
    seachart?: SlMapSeachartOptions;
    layers?: L.Layer[];
}