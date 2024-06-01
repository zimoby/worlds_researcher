import { Color } from "three";
import { resourceNames } from "./constants/worldConfig";

interface Thresholds {
  pollution?: number;
  radiation?: number;
  windSpeed?: number;
  temperature?: [number, number];
}
export interface WorldStateThresholds {
  Safe: Thresholds;
  Hazardous: Thresholds;
  Stormy: Thresholds;
  "Extreme temperature": Thresholds;
  Danger: Thresholds;
}
export type TerrainType = "water" | "grass" | "dirt" | "snow" | "default";

export type WeatherCondition = "Mild" | "Moderate" | "Severe";
export interface WorldState {
  value:
    | "Extreme"
    | "Danger"
    | "Normal"
    | "Safe"
    | "Hazardous"
    | "Stormy"
    | "Extreme temperature";
  name: string;
}

export interface Terrain {
  color: Color;
  level: number;
}

export interface Resource {
  color: Color;
  threshold: number;
  score: number;
}

export type MapDetailesType = [
  largeDetailes: number,
  mediumDetailes: number,
  smallDetailes: number,
];

export interface WorldNumberParamT {
  name: string;
  value: number;
  max: number;
  min: number;
}

export interface WorldStringParamT {
  name: string;
  value: string;
}

export interface WorldParamsType {
  seed: WorldStringParamT;
  worldState: WorldState;
  name: WorldStringParamT;
  temperature: WorldNumberParamT;
  humidity: WorldNumberParamT;
  windSpeed: WorldNumberParamT;
  pollution: WorldNumberParamT;
  radiation: WorldNumberParamT;
  weatherCondition: WeatherCondition;
  mapDetailes: MapDetailesType;
}

export type TerrainTypesT = Record<string, Terrain>;

export type ArtifactsCollectedT = Record<string, number>;

export type ResourceType =
  | "Water"
  | "Metals"
  | "Rare Elements"
  | "Hydrocarbons"
  | "empty";

export type ResourceName = (typeof resourceNames)[number];
export type ArtifactType = "usual" | "rare" | "legendary";

export interface BeaconType {
  x: number;
  y: number;
  z: number;
  resource: ResourceType;
  chunkX: number;
  chunkY: number;
  visible: boolean;
  id: string;
  armor: number;
  collectionLevel: number;
}

export interface ArtifactT {
  x: number;
  y: number;
  z: number;
  type: ArtifactType;
  chunkX: number;
  chunkY: number;
  visible: boolean;
  id: string;
  name: string;
  params: Record<string, { name: string; value: number; unit?: string }>;
  worldId: string;
}

export type ModalName =
  | "showSettingsModal"
  | "showAboutModal"
  | "showArtifactsModal"
  | "showMapModal"
  | "showChangeLogModal";
type ResoucesAndEnergyNamesType = ResourceName | "Energy";
export type UpgradeCosts = {
  [key in ResoucesAndEnergyNamesType]?: number;
};
export type UpgradeType = "resourceCollection" | "beaconsArmor" | "droneScan";
export interface UiPanelsStateType {
  opacity: number;
}
export type PanelNamesT =
  | "titlePanel"
  | "planetPanel"
  | "collectedResourcesPanel"
  | "scanerPanel"
  | "progressPanel"
  | "systemMessagePanel"
  | "systemControlsPanel"
  | "logsPanel"
  | "beaconPanel"
  | "eventsPanel"
  | "collectedArtifactsPanel"
  | "costsPanel"
  | "emptyPanel"
  | "supportPanels"
  | "settingsButton"
  | "newWorldButton";
export interface GridConfig {
  chunkSize: number;
  subGrids: number;
  lineWidth: number;
  gridColor: string;
  subGridColor: string;
}

export interface MapParams {
  width: number;
  depth: number;
  resolution: number;
  scale: number;
  offsetX: number;
  offsetY: number;
  speed: number;
}
export interface Offset {
  x: number;
  y: number;
}

export interface ChunkType {
  x: number;
  y: number;
}

export type CollectedResources = Record<ResourceName, number>;

export type CostsT = Record<
  string,
  { name: string; value: number; valueAlt?: string }
>;

export interface LogWithIdT {
  id: string;
  text: string;
}
