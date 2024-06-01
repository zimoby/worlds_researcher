import { useEffect } from "react";
import { useGameStore } from "../store/store";

export const useEnergyActions = () => {
  const energy = useGameStore((state) => state.energy);
  const { width, depth } = useGameStore((state) => state.mapParams);
  const updateMapSize = useGameStore((state) => state.updateMapSize);

  useEffect(() => {
    if ((width > 100 || depth > 100) && energy <= 0) {
      updateMapSize(100);
    }
  }, [width, depth, energy, updateMapSize]);
};
