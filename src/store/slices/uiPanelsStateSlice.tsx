import { StateCreator } from "zustand";
import { GameStoreState } from "../store";
import { colors, setColors } from "../../assets/colors";
import { ModalName, UiPanelsStateType } from "../types";
import { PanelNamesT } from "../types";

export interface UiPanelsStateSlice {
  showSettingsModal: boolean;
  showAboutModal: boolean;
  showArtifactsModal: boolean;
  showMapModal: boolean;
  showChangeLogModal: boolean;

  uiPanelsState: {
    titlePanel: UiPanelsStateType;
    planetPanel: UiPanelsStateType;
    collectedResourcesPanel: UiPanelsStateType;
    scanerPanel: UiPanelsStateType;
    progressPanel: UiPanelsStateType;
    systemMessagePanel: UiPanelsStateType;
    systemControlsPanel: UiPanelsStateType;
    logsPanel: UiPanelsStateType;
    beaconPanel: UiPanelsStateType;
    eventsPanel: UiPanelsStateType;
    collectedArtifactsPanel: UiPanelsStateType;
    costsPanel: UiPanelsStateType;
    emptyPanel: UiPanelsStateType;
    supportPanels: UiPanelsStateType;
    settingsButton: UiPanelsStateType;
    newWorldButton: UiPanelsStateType;
  };
  colors: typeof colors;
  setColors: (newColors: typeof colors) => void;
  updatePanelOpacity: (panelName: PanelNamesT, value: number) => void;
  soloPanelOpacity: (panelName?: PanelNamesT) => void;
  resetPanelsOpacity: () => void;
  toggleModal: (modalName: ModalName) => void;
}

export const createUiPanelsStateSlice: StateCreator<
  GameStoreState,
  [],
  [],
  UiPanelsStateSlice
> = (set) => ({
  showSettingsModal: false,
  showAboutModal: false,
  showArtifactsModal: false,
  showMapModal: false,
  showChangeLogModal: false,

  uiPanelsState: {
    titlePanel: { opacity: 1 },
    planetPanel: { opacity: 1 },
    collectedResourcesPanel: { opacity: 1 },
    scanerPanel: { opacity: 1 },
    progressPanel: { opacity: 1 },
    systemMessagePanel: { opacity: 1 },
    systemControlsPanel: { opacity: 1 },
    logsPanel: { opacity: 1 },
    beaconPanel: { opacity: 1 },
    eventsPanel: { opacity: 1 },
    collectedArtifactsPanel: { opacity: 1 },
    costsPanel: { opacity: 1 },
    emptyPanel: { opacity: 1 },
    supportPanels: { opacity: 1 },
    settingsButton: { opacity: 1 },
    newWorldButton: { opacity: 1 },
  },

  colors: colors,

  setColors: (newColors) => {
    set({ colors: newColors });
    setColors(newColors);
  },

  updatePanelOpacity: (panelName: PanelNamesT, value: number) => {
    set((state) => ({
      uiPanelsState: {
        ...state.uiPanelsState,
        [panelName]: { opacity: value },
      },
    }));
  },
  soloPanelOpacity: (panelName?: PanelNamesT) => {
    set((state) => {
      const newPanelsState = Object.keys(state.uiPanelsState).reduce(
        (acc, key) => {
          acc[key as keyof typeof state.uiPanelsState] = { opacity: 0.1 };
          return acc;
        },
        {} as typeof state.uiPanelsState,
      );
      if (panelName) {
        newPanelsState[panelName] = { opacity: 1 };
      }
      return {
        uiPanelsState: newPanelsState,
      };
    });
  },
  resetPanelsOpacity: () => {
    set((state) => {
      const newPanelsState = Object.keys(state.uiPanelsState).reduce(
        (acc, key) => {
          acc[key as keyof typeof state.uiPanelsState] = { opacity: 1 };
          return acc;
        },
        {} as typeof state.uiPanelsState,
      );
      return {
        uiPanelsState: newPanelsState,
      };
    });
  },
  toggleModal: (modalName: ModalName) => {
    set((state) => {
      return { [modalName]: !state[modalName] };
    });
  },
});
