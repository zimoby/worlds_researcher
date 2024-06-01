import { useGameStore } from "../../../store/store";
import { BigButtons } from "./BigButtons";
import { useCallback } from "react";
import "./../linearAnimation.css";
import { COSTS } from "../../../store/constants/worldConfig";

export const FlyToNewWorld = () => {
  const animationFirstStage = useGameStore(
    (state) => state.animationFirstStage,
  );
  const decreaseEnergy = useGameStore(
    (state) => state.decreaseEnergy,
  );
  const energy = useGameStore((state) => state.energy);
  const opacity = useGameStore(
    (state) => state.uiPanelsState.newWorldButton.opacity,
  );

  const moveToTheNewWorld = useCallback(() => {
    if (energy >= COSTS.flyToNewWorld.value) {
      decreaseEnergy(COSTS.flyToNewWorld.value);
      useGameStore.getState().setMapAnimationState("shrinking");
    } else {
      useGameStore.setState({
        message: `Not enough energy to move to the new world. Need ${COSTS.flyToNewWorld.value} energy`,
      });
    }
  }, [decreaseEnergy, energy]);

  if (!animationFirstStage) return null;

  return (
    <div style={{ opacity }}>
      <BigButtons text="New World" onClick={moveToTheNewWorld} />
    </div>
  );
};
