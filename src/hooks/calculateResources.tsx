import { useEffect } from "react";
import { useGameStore } from "../store/store";

export const useCalculateResources = () => {
  const updateResourcesAndPoints = useGameStore(
    (state) => state.updateResourcesAndPoints,
  );

  useEffect(() => {
    const intervalId = setInterval(() => {
      updateResourcesAndPoints();
    }, 1000);

    return () => clearInterval(intervalId);
  }, [updateResourcesAndPoints]);
};
