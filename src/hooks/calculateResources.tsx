import { useEffect } from "react";
import { useGameStore } from "../store/store";
import { RESOURCE_UPDATE_INTERVAL } from "../store/constants/worldConfig";

export const useCalculateResources = () => {
  const updateResourcesAndEnergy = useGameStore(
    (state) => state.updateResourcesAndEnergy,
  );

  useEffect(() => {
    const intervalId = setInterval(() => {
      updateResourcesAndEnergy();
    }, RESOURCE_UPDATE_INTERVAL);

    return () => clearInterval(intervalId);
  }, [updateResourcesAndEnergy]);
};
