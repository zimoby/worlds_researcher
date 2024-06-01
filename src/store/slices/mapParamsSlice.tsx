import { StateCreator } from "zustand";
import { GameStoreState } from "../store";
import {
  ChunkType,
  GridConfig,
  MapParams,
  Offset,
  ResourceType,
} from "../types";

export interface MapParamsSlice {
  gridConfig: GridConfig;
  mapParams: MapParams;
  showResources: boolean;
  mapAnimationState: "idle" | "shrinking" | "enlarging";

  currentOffset: Offset;
  selectedResource: ResourceType;
  selectedChunk: ChunkType;
  currentLocation: ChunkType;
  moveDirection: Offset;
  droneVectorMovement: Offset;
  droneMoveAngle: number;
  dynamicSpeed: number;
  canPlaceBeacon: boolean;

  locationsHistory: ChunkType[];
  addLocationToHistory: (location: ChunkType) => void;

  activePosition: { x: number; y: number; z: number };

  setMapAnimationState: (state: "idle" | "shrinking" | "enlarging") => void;
  updateMapSize: (value: number) => void;
  updateMapParam: (paramName: string, value: unknown) => void;
  toggleShowResources: () => void;
}

export const createMapParamsSlice: StateCreator<
  GameStoreState,
  [],
  [],
  MapParamsSlice
> = (set) => ({
  gridConfig: {
    chunkSize: 1,
    subGrids: 5,
    lineWidth: 0.2,
    gridColor: "#ff0000",
    subGridColor: "#ffffff",
  },
  mapParams: {
    width: 200,
    depth: 200,
    resolution: 3,
    scale: 50,
    offsetX: 0,
    offsetY: 0,
    speed: 1,
  },
  showResources: false,
  mapAnimationState: "idle",

  currentOffset: { x: 0, y: 0 },
  selectedResource: "Water",
  selectedChunk: { x: 0, y: 0 },
  currentLocation: { x: 0, y: 0 },
  moveDirection: { x: 0, y: -1 },
  droneVectorMovement: { x: 0, y: 0 },
  droneMoveAngle: 0,
  dynamicSpeed: 1,
  canPlaceBeacon: false,

  activePosition: { x: 0, y: 0, z: 0 },

  locationsHistory: [
    {
      x: 0,
      y: 0,
    },
  ],
  addLocationToHistory: (location: ChunkType) => {
    set((state) => {
      if (
        !state.locationsHistory.some(
          (loc) => loc.x === location.x && loc.y === location.y,
        )
      ) {
        return { locationsHistory: [...state.locationsHistory, location] };
      }
      return state;
    });
  },

  setMapAnimationState: (state) => set({ mapAnimationState: state }),
  updateMapSize: (value) => {
    set((state) => ({
      mapParams: { ...state.mapParams, width: value, depth: value },
    }));
  },
  updateMapParam: (paramName, value) => {
    set((state) => ({
      mapParams: { ...state.mapParams, [paramName]: value },
    }));
  },
  toggleShowResources: () =>
    set((state) => ({ showResources: !state.showResources })),
});
