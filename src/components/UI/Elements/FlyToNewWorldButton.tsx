import { useGameStore } from "../../../store/store";
import { BigButtons } from "./BigButtons";
import { useCallback } from "react";
import "./../linearAnimation.css";

export const FlyToNewWorld = () => {
  const animationFirstStage = useGameStore(
    (state) => state.animationFirstStage,
  );
  const decreasePlayerPoints = useGameStore(
    (state) => state.decreasePlayerPoints,
  );
  const energy = useGameStore((state) => state.energy);
  const costs = useGameStore((state) => state.costs);
  const opacity = useGameStore(
    (state) => state.uiPanelsState.newWorldButton.opacity,
  );

  const moveToTheNewWorld = useCallback(() => {
    if (energy >= costs.flyToNewWorld.value) {
      decreasePlayerPoints(costs.flyToNewWorld.value);
      useGameStore.getState().setMapAnimationState("shrinking");
    } else {
      useGameStore.setState({
        message: `Not enough energy to move to the new world. Need ${costs.flyToNewWorld.value} energy`,
      });
    }
  }, [costs, decreasePlayerPoints, energy]);

  if (!animationFirstStage) return null;

  return (
    <div style={{ opacity }}>
      <BigButtons text="New World" onClick={moveToTheNewWorld} />
    </div>
  );
};
