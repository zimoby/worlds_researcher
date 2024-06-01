import { useEffect } from "react";
import { useGameStore } from "../store/store";
import { RESOURCE_UPDATE_INTERVAL } from "../store/worldConfig";

export const useCalculateResources = () => {
  const updateResourcesAndPoints = useGameStore(
    (state) => state.updateResourcesAndPoints,
  );

  useEffect(() => {
    const intervalId = setInterval(() => {
      updateResourcesAndPoints();
    }, RESOURCE_UPDATE_INTERVAL);

    return () => clearInterval(intervalId);
  }, [updateResourcesAndPoints]);
};
