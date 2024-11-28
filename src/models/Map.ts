import { IdType } from "./Common";
import {
  Layer,
  LayerDescription,
  LayerDescriptionState,
  LayerState,
} from "./Layer";
import { createLocalizer } from "./Localization";

export const DefaultScaleValues = {
  Country: 10000,
  Region: 20000,
  Municipality: 30000,
  City: 40000,
  Town: 50000,
};

export type DefaultScaleNames = keyof typeof DefaultScaleValues;

export interface ScaleLevelType {
  name: string;
  scale: number;
}

export type ScaleLevelDTO = ScaleLevelType;

export interface TypedScaleLevel<LayerType> {
  type: ScaleLevelType;
  layers: LayerType[];
}

export interface TypedMap<LayerType> {
  id?: IdType;
  name: string;
  scaleLavels: TypedScaleLevel<LayerType>[];
}

export type GeoMap = TypedMap<Layer>;
export type MapDescription = TypedMap<LayerDescription>;

export interface MapStateExtra {
  selectedScaleLevelIndex?: number;
}

export type MapState = TypedMap<LayerState> & MapStateExtra;
export type MapDescriptionState = TypedMap<LayerDescriptionState> &
  MapStateExtra;

export const MapLocalizer = createLocalizer("Map");
