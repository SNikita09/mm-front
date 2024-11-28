import { IdType } from "./Common";
import { EntityName } from "./Context";
import {
  Layer,
  LayerDescription,
  LayerDescriptionState,
  LayerState,
} from "./Layer";
import { GeoMap, MapDescription, MapDescriptionState, MapState } from "./Map";

export interface LayerHelper {
  inflate: (t: Layer) => Promise<LayerDescription>;
  deflate: (t: LayerDescription) => Layer;
}

export interface LayerStateHelper {
  inflate: (t: LayerState) => Promise<LayerDescriptionState>;
  deflate: (t: LayerDescriptionState) => LayerState;
}

export interface MapHelper {
  inflate: (t: GeoMap) => Promise<MapDescription>;
  deflate: (t: MapDescription) => GeoMap;
}

export interface MapDescriptionStateHelper {
  inflate: (t: MapState) => Promise<MapDescriptionState>;
  deflate: (t: MapDescriptionState) => MapState;
}

export interface DefaultState {
  map: (t: GeoMap) => Promise<MapState>;
  layer: (t: Layer) => Promise<LayerState>;
}

export interface EntityHelper {
  getAll: () => Promise<any[]>;
  delete: (id: IdType) => Promise<void>;
  create: (e: any) => Promise<void>;
  update: (e: any) => Promise<void>;
}

export interface TypedEntityHelper<CreateDTO, ReadDTO, UpdateDTO>
  extends EntityHelper {
  getAll: () => Promise<ReadDTO[]>;
  delete: (id: IdType) => Promise<void>;
  create: (e: CreateDTO) => Promise<void>;
  update: (e: UpdateDTO) => Promise<void>;
}

export type EntityHelpers = Record<EntityName, EntityHelper>;

export const Helper: {
  layer: LayerHelper;
  layerState: LayerStateHelper;
  map: MapHelper;
  mapState: MapDescriptionStateHelper;
  default: DefaultState;
  entityHelpers: EntityHelpers;
} = {
  //TODO: implement
} as any;
