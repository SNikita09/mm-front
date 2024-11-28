import { IdType } from "./Common";
import { createLocalizer } from "./Localization";

export type LayerSubType = "WMS" | "WFS"; // and more

export type LayerType = "Group" | "OtherLayer" | LayerSubType;

export interface ILayer {
  type: LayerType;
  name: string;
  id?: IdType;
}

export interface GroupLayer<LayerType> extends ILayer {
  type: "Group";
  children: LayerType[];
}

export interface OtherLayer extends ILayer {
  type: "OtherLayer" | LayerSubType;
}

export type Layer = GroupLayer<Layer> | OtherLayer;

export interface WmsLayerDescription extends OtherLayer {
  type: "WMS";
  getMapUrl: string;
  getInfoUrl: string;
  scaleLevel: number;
}

export interface LayerStyle {
  name: string;
  id?: string;
}

export interface LayerStateExtra {
  isVisible?: boolean;
  isExpanded?: boolean;
  opacity?: number; //0..1
  style?: LayerStyle;
}

export type LayerDescription =
  | GroupLayer<LayerDescription>
  | WmsLayerDescription;

export type LayerState = ILayer & LayerStateExtra;

export type LayerDescriptionState = (
  | GroupLayer<LayerDescriptionState>
  | WmsLayerDescription
) &
  LayerStateExtra;

export const LayerLocalizer = createLocalizer("Layer");

export interface LayerDTO {
  id: IdType;
  name: string;
}
export interface LayerScaleLevelDTO {
  layerId: IdType;
  scaleLevel: number;
}
