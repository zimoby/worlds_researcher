import { StateCreator } from "zustand";
import { GameStoreState } from "../store";
import { DEV_MODE } from "../constants/appConstants";
import {
  SETTING_DISABLE_ANIMATIONS,
  SETTING_DISABLE_MUSIC,
  SETTING_DISABLE_SOUNDS,
  SETTING_EDUCATION_MODE,
  SETTING_INVERT_DIRECTION,
  SETTING_START_SCREEN,
} from "../constants/appConstants";
import { resourceNames } from "../worldConfig";
import { resourceTypes } from "../worldConfig";
import { ResourceName } from "../types";
import { ResourceType } from "../types";
import { WeatherCondition } from "../types";
import { generateUUID } from "three/src/math/MathUtils.js";
import { resourceCollectionMultipliers } from "../slices/upgradeStateSlice";
import { generateWeather } from "../../utils/generators";
import { ModalName } from "../types";

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

export interface GameStateSlice {
  disableAnimations: boolean;
  disableSounds: boolean;
  disableMusic: boolean;
  educationMode: boolean;
  toggleEducationMode: () => void;

  invertDirection: boolean;

  showSettingsModal: boolean;
  showAboutModal: boolean;
  showArtifactsModal: boolean;
  showMapModal: boolean;
  showChangeLogModal: boolean;
  toggleModal: (modalName: ModalName) => void;

  startToLoadFiles: boolean;
  loadingProgress: number;

  educationalStepIndex: number;
  increaseEducationalStepIndex: () => void;

  startScreen: boolean;
  firstStart: boolean;
  terrainLoading: boolean;
  terrainAppearing: boolean;
  animationFirstStage: boolean;
  startStageFinished: boolean;

  resetValues: boolean;

  autoPilot: boolean;

  currentOffset: Offset;
  selectedResource: ResourceType;
  selectedChunk: ChunkType;
  currentLocation: ChunkType;
  moveDirection: Offset;
  droneVectorMovement: Offset;
  droneMoveAngle: number;
  dynamicSpeed: number;
  energy: number;
  decreasePlayerPoints: (points: number) => void;

  locationsHistory: ChunkType[];
  addLocationToHistory: (location: ChunkType) => void;

  updateResourcesAndPoints: () => void;
  collectedResources: CollectedResources;
  message: string;
  addNewMessage: (message: string) => void;
  logs: LogWithIdT[];
  eventsLog: LogWithIdT[];
  canPlaceBeacon: boolean;
  activePosition: { x: number; y: number; z: number };
  weatherCondition: WeatherCondition;
  costs: CostsT;
  updateWeather: () => WeatherCondition | null;
  updateStoreProperty: (paramName: string, value: unknown) => void;
  updateVariableInLocalStorage: (variableName: string, value: boolean) => void;
  addLog: (log: string) => void;
  addEventLog: (eventName: string) => void;
}

export const createGameStateSlice: StateCreator<
  GameStoreState,
  [],
  [],
  GameStateSlice
> = (set, get) => ({
  disableAnimations:
    localStorage.getItem(SETTING_DISABLE_ANIMATIONS) === "true",
  disableSounds: localStorage.getItem(SETTING_DISABLE_SOUNDS) === "true",
  disableMusic: localStorage.getItem(SETTING_DISABLE_MUSIC) === "true",

  educationMode: localStorage.getItem(SETTING_EDUCATION_MODE) === "true",
  toggleEducationMode: () => {
    const newValue = !get().educationMode;
    set({ educationMode: newValue });
    localStorage.setItem(SETTING_EDUCATION_MODE, newValue.toString());
    if (!newValue) {
      set({ educationalStepIndex: 0 });
    }
  },

  invertDirection: localStorage.getItem(SETTING_INVERT_DIRECTION) === "true",
  startScreen: localStorage.getItem(SETTING_START_SCREEN) === "true",

  showSettingsModal: false,
  showAboutModal: false,
  showArtifactsModal: false,
  showMapModal: false,
  showChangeLogModal: false,

  toggleModal: (modalName: ModalName) => {
    set((state) => {
      return { [modalName]: !state[modalName] };
    });
  },

  educationalStepIndex: 0,
  increaseEducationalStepIndex: () => {
    set((state) => {
      return { educationalStepIndex: state.educationalStepIndex + 1 };
    });
  },

  startToLoadFiles: false,
  loadingProgress: 0,

  firstStart: false,
  terrainLoading: true,
  terrainAppearing: false,
  animationFirstStage: false,
  startStageFinished: false,

  resetValues: false,

  autoPilot: false,

  currentOffset: { x: 0, y: 0 },
  selectedResource: "Water",
  selectedChunk: { x: 0, y: 0 },
  currentLocation: { x: 0, y: 0 },
  moveDirection: { x: 0, y: -1 },
  droneVectorMovement: { x: 0, y: 0 },
  droneMoveAngle: 0,
  dynamicSpeed: 1,

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

  energy: DEV_MODE ? 20000 : 1000,

  decreasePlayerPoints: (points: number) => {
    set((state) => {
      return { energy: state.energy - points };
    });
  },

  collectedResources: {
    [resourceNames[0]]: 0,
    [resourceNames[1]]: 0,
    [resourceNames[2]]: 0,
    [resourceNames[3]]: 0,
  },

  updateResourcesAndPoints: () => {
    const {
      beacons,
      collectedResources,
      energy,
      canPlaceBeacon,
      costs,
      addEventLog,
      dynamicSpeed,
      animationFirstStage,
      mapAnimationState,
    } = get();

    const { mapParams } = get();

    const newCollectedResources = beacons.reduce(
      (resources, beacon) => {
        resources[beacon.resource] =
          (resources[beacon.resource] || 0) +
          1 * resourceCollectionMultipliers[beacon.collectionLevel];
        return resources;
      },
      { ...collectedResources },
    );

    const pointsEarned = beacons.reduce(
      (total, beacon) =>
        total +
        resourceTypes[beacon.resource].score *
          resourceCollectionMultipliers[beacon.collectionLevel],
      0,
    );
    let newPlayerPoints = energy + pointsEarned;

    const combinedSpeed = dynamicSpeed * mapParams.speed;

    if (combinedSpeed > 1) {
      newPlayerPoints -=
        dynamicSpeed * mapParams.speed * costs.increaseSpeed.value;
      addEventLog(
        `High Speed. -${dynamicSpeed * mapParams.speed * costs.increaseSpeed.value} energy`,
      );
    }

    if (
      (mapParams.width > 100 || mapParams.depth > 100) &&
      animationFirstStage &&
      mapAnimationState === "idle"
    ) {
      const extraMapSize = mapParams.width - 100 + (mapParams.depth - 100);
      const extraCosts = Math.round(extraMapSize * costs.increaseMapSize.value);
      newPlayerPoints -= extraCosts;
      addEventLog(`Extra Map Scan. -${extraCosts} energy`);
    }

    if (canPlaceBeacon) {
      if (newPlayerPoints >= costs.scanning.value) {
        newPlayerPoints -= costs.scanning.value;
        addEventLog(`Scanning. -${costs.scanning.value} energy`);
      }
    }

    set({
      collectedResources: newCollectedResources,
      energy: Math.max(newPlayerPoints, 0),
      mapParams: {
        ...mapParams,
        speed: energy > 0 ? mapParams.speed : 1,
      },
    });
  },

  message: "",

  addNewMessage: (message: string) => {
    if (get().message === message) {
      return;
    }
    set({ message });
  },

  logs: [],
  eventsLog: [],
  canPlaceBeacon: false,
  activePosition: { x: 0, y: 0, z: 0 },
  weatherCondition: "Mild",

  costs: {
    scanning: { name: "Scanning per sec", value: 50, valueAlt: "en" },
    flyToNewWorld: { name: "Fly to new world", value: 10000, valueAlt: "en" },
    placeBeacon: { name: "Place beacon", value: 100, valueAlt: "en" },
    extendBeaconLimits: {
      name: "Extend beacons limits",
      value: 1000,
      valueAlt: "en",
    },
    increaseSpeed: { name: "Extra speed", value: 5, valueAlt: "x en" },
    increaseMapSize: { name: "Extra map size", value: 2, valueAlt: "x en" },
  },
  updateWeather: (): WeatherCondition | null => {
    const newWeather = generateWeather();
    if (newWeather === get().weatherCondition) {
      return null;
    } else {
      set({ weatherCondition: newWeather });
      return newWeather;
    }
  },
  updateStoreProperty: (paramName, value) => {
    set(() => ({ [paramName]: value }));
  },
  updateVariableInLocalStorage: (variableName: string, value: boolean) => {
    set({ [variableName]: value });
    localStorage.setItem(variableName, value.toString());
  },
  addLog: (log) => {
    const uniqueLog: LogWithIdT = {
      id: generateUUID(),
      text: log,
    };
    set((state) => {
      const updatedLogs = [uniqueLog, ...state.logs];
      if (updatedLogs.length > 10) {
        updatedLogs.pop();
      }
      return { logs: updatedLogs };
    });
  },
  addEventLog: (eventName) => {
    const uniqueLog: LogWithIdT = {
      id: generateUUID(),
      text: eventName,
    };
    set((state) => {
      const updatedEvents = [uniqueLog, ...state.eventsLog];
      if (updatedEvents.length > 5) {
        updatedEvents.pop();
      }
      return { eventsLog: updatedEvents };
    });
  },
});