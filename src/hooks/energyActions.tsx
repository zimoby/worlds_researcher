import { useEffect } from "react";
import { useGameStore } from "../store/store";
import { CHUNK_SIZE } from "../store/constants/worldConfig";

export const useEnergyActions = () => {
  const energy = useGameStore((state) => state.energy);
  const { width, depth } = useGameStore((state) => state.mapParams);
  const updateMapSize = useGameStore((state) => state.updateMapSize);

  useEffect(() => {
    if ((width > CHUNK_SIZE || depth > CHUNK_SIZE) && energy <= 0) {
      updateMapSize(CHUNK_SIZE);
    }
  }, [width, depth, energy, updateMapSize]);
};
