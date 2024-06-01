import { StateCreator } from "zustand";
// import { immer } from "zustand/middleware/immer";
import {
  generateArtifacts,
  generateRandomColor,
  generateWorld,
} from "../../utils/generators";
import { GameStoreState } from "../store";
import {
  ARTIFACT_AMOUNT,
  INITIAL_BEACONS,
  INITIAL_RESOURCES,
  TERRAIN_COLORS,
} from "../worldConfig";
import { terrainTypes } from "../worldConfig";
import { WorldParamsType, ArtifactsCollectedT, TerrainTypesT } from "../types";
import { ArtifactType } from "../types";
import { BeaconType, ArtifactT } from "../types";

export interface WorldParamsSlice {
  worldParams: WorldParamsType;
  beacons: BeaconType[];
  beaconsLimit: number;

  artifacts: ArtifactT[];
  artifactsArray: ArtifactT[];
  artifactsCollectedByTypes: ArtifactsCollectedT;
  artifactSelected: string;
  terrainColors: TerrainTypesT;

  visitedWorlds: WorldParamsType[];
  addVisitedWorld: (params: WorldParamsType) => void;

  regenerateWorld: () => void;
  increaseBeconsLimit: () => void;
  addArtifactToCollection: (type: ArtifactType) => void;
  addToArtifactsArray: (artifact: ArtifactT) => void;
}

export const createWorldParamsSlice: StateCreator<
  GameStoreState,
  [],
  [],
  WorldParamsSlice
> = (set, get) => ({
  beacons: [],
  beaconsLimit: INITIAL_BEACONS,

  increaseBeconsLimit: () => {
    set((state) => {
      if (state.energy >= state.costs.extendBeaconLimits.value) {
        return {
          beaconsLimit: state.beaconsLimit + 1,
          energy: state.energy - state.costs.extendBeaconLimits.value,
          message: `Beacons limit increased to ${state.beaconsLimit + 1}`,
        };
      } else {
        return {
          message: `Not enough energy to increase beacons limit`,
        };
      }
    });
  },

  artifacts: generateArtifacts({ amount: ARTIFACT_AMOUNT }),
  artifactSelected: "",
  artifactsCollectedByTypes: {
    usual: 0,
    rare: 0,
    legendary: 0,
  },
  addArtifactToCollection: (type: ArtifactType) => {
    set((state) => {
      return {
        artifactsCollectedByTypes: {
          ...state.artifactsCollectedByTypes,
          [type]: state.artifactsCollectedByTypes[type] + 1,
        },
      };
    });
  },
  artifactsArray: [],

  addToArtifactsArray: (artifact: ArtifactT) => {
    set((state) => {
      return {
        artifactsArray: [...state.artifactsArray, artifact],
      };
    });
  },

  terrainColors: terrainTypes,

  visitedWorlds: [],

  worldParams: generateWorld(),
  regenerateWorld: () => {
    const newTerrainColors = {
      water: {
        color: generateRandomColor(),
        level: TERRAIN_COLORS.water.level,
      },
      grass: {
        color: generateRandomColor(),
        level: TERRAIN_COLORS.grass.level,
      },
      dirt: { color: generateRandomColor(), level: TERRAIN_COLORS.dirt.level },
      snow: { color: generateRandomColor(), level: TERRAIN_COLORS.snow.level },
      default: { ...TERRAIN_COLORS.default },
    };

    const newWorldParams = generateWorld();

    set({
      worldParams: newWorldParams,
      terrainColors: newTerrainColors,
      artifacts: generateArtifacts({
        amount: ARTIFACT_AMOUNT,
        worldId: newWorldParams.seed.value,
      }),
      beacons: [],
      currentOffset: { x: 0, y: 0 },
      currentLocation: { x: 0, y: 0 },
      locationsHistory: [{ x: 0, y: 0 }],

      collectedResources: { ...INITIAL_RESOURCES },
      message: "",
      weatherCondition: "Mild",
    });
    get().addVisitedWorld(newWorldParams);
  },
  addVisitedWorld: (params: WorldParamsType) => {
    const { visitedWorlds } = get();
    const isUnique = !visitedWorlds.some(
      (world) => JSON.stringify(world) === JSON.stringify(params),
    );

    if (isUnique) {
      set({ visitedWorlds: [...visitedWorlds, params] });
    }
  },
});
