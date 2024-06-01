import { useEffect } from "react";
import { useGameStore } from "../store/store";
import {
  SETTING_DISABLE_MUSIC,
  SETTING_DISABLE_SOUNDS,
  SETTING_EDUCATION_MODE,
  SETTING_INVERT_DIRECTION,
  SETTING_START_SCREEN,
} from "../store/constants/appConstants";

const initializeLocalStorage = (
  key: string,
  defaultValue: boolean,
  updateFunc: (variableName: string, value: boolean) => void,
) => {
  if (localStorage.getItem(key) === null) {
    updateFunc(key, defaultValue);
  }
};

export const useInitInfo = () => {
  const firstStart = useGameStore((state) => state.firstStart);
  const terrainLoading = useGameStore((state) => state.terrainLoading);
  const updateMapSize = useGameStore((state) => state.updateMapSize);
  const updateVariableInLocalStorage = useGameStore(
    (state) => state.updateVariableInLocalStorage,
  );

  useEffect(() => {
    initializeLocalStorage(
      SETTING_EDUCATION_MODE,
      true,
      updateVariableInLocalStorage,
    );
    initializeLocalStorage(
      SETTING_DISABLE_SOUNDS,
      true,
      updateVariableInLocalStorage,
    );
    initializeLocalStorage(
      SETTING_DISABLE_MUSIC,
      false,
      updateVariableInLocalStorage,
    );
    initializeLocalStorage(
      SETTING_INVERT_DIRECTION,
      false,
      updateVariableInLocalStorage,
    );
    initializeLocalStorage(
      SETTING_START_SCREEN,
      true,
      updateVariableInLocalStorage,
    );
  }, [updateVariableInLocalStorage]);

  useEffect(() => {
    if (!terrainLoading && !firstStart) {
      useGameStore.setState({ firstStart: true });
    }
    if (!terrainLoading && firstStart) {
      updateMapSize(1);
    }
  }, [terrainLoading, firstStart, updateMapSize]);
};
