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
} from "./slices";

export type GameStoreState = WorldParamsSlice &
  UiPanelsStateSlice &
  MapParamsSlice &
  GameStateSlice &
  UpgradeSlice;

export const useGameStore = create<GameStoreState>((...a) => ({
  ...createWorldParamsSlice(...a),
  ...createUiPanelsStateSlice(...a),
  ...createMapParamsSlice(...a),
  ...createGameStateSlice(...a),
  ...createUpgradeSlice(...a),
}));
