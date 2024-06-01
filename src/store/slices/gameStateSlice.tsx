import { StateCreator } from "zustand";
import { GameStoreState } from "../store";
import {
  SETTING_DISABLE_ANIMATIONS,
  SETTING_DISABLE_MUSIC,
  SETTING_DISABLE_SOUNDS,
  SETTING_EDUCATION_MODE,
  SETTING_INVERT_DIRECTION,
  SETTING_START_SCREEN,
} from "../constants/appConstants";
import { generateUUID } from "three/src/math/MathUtils.js";
import { LogWithIdT } from "../types";

export interface GameStateSlice {
  disableAnimations: boolean;
  disableSounds: boolean;
  disableMusic: boolean;
  educationMode: boolean;
  toggleEducationMode: () => void;

  invertDirection: boolean;

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

  message: string;
  addNewMessage: (message: string) => void;
  logs: LogWithIdT[];
  eventsLog: LogWithIdT[];

  updateStoreProperty: (paramName: string, value: unknown) => void;
  updateVariableInLocalStorage: (variableName: string, value: boolean) => void;
  
  addLog: (log: string) => void;
  addEventLog: (eventName: string) => void;
}

export const createGameStateSlice: StateCreator<GameStoreState, [], [], GameStateSlice> = (
  set,
  get
) => ({
  disableAnimations: localStorage.getItem(SETTING_DISABLE_ANIMATIONS) === "true",
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
  message: "",

  addNewMessage: (message: string) => {
    if (get().message === message) {
      return;
    }
    set({ message });
  },

  logs: [],
  eventsLog: [],
  

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
