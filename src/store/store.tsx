import { create } from "zustand";
import {
  WorldParamsSlice,
  UiPanelsStateSlice,
  MapParamsSlice,
  GameStateSlice,
  UpgradeSlice,
  createWorldParamsSlice,
  createUiPanelsStateSlice,
  createMapParamsSlice,
  createGameStateSlice,
  createUpgradeSlice,
  ResourcesSlice,
  createResourcesSlice,
} from "./slices";

export type GameStoreState = WorldParamsSlice &
  UiPanelsStateSlice &
  MapParamsSlice &
  GameStateSlice &
  UpgradeSlice &
  ResourcesSlice;

export const useGameStore = create<GameStoreState>((...a) => ({
  ...createWorldParamsSlice(...a),
  ...createUiPanelsStateSlice(...a),
  ...createMapParamsSlice(...a),
  ...createGameStateSlice(...a),
  ...createUpgradeSlice(...a),
  ...createResourcesSlice(...a),
}));
