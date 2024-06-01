import { useEffect } from "react";
import { useGameStore } from "../store/store";

export const useInitializeGame = () => {
  const setColors = useGameStore((state) => state.setColors);
  const colors = useGameStore((state) => state.colors);
  const firstStart = useGameStore((state) => state.firstStart);
  const regenerateWorld = useGameStore((state) => state.regenerateWorld);

  useEffect(() => {
    setColors(colors);
  }, [colors, setColors]);

  useEffect(() => {
    if (firstStart) {
      regenerateWorld();
    }
  }, [firstStart, regenerateWorld]);
};
