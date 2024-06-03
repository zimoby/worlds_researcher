import { useCallback, useEffect, useRef } from "react";
import { useGameStore } from "../store/store";
import { movementDirections } from "../store/constants/worldConfig";

export const useAutoPilot = () => {
  const currentLocation = useGameStore((state) => state.currentLocation);
  const autoPilot = useGameStore((state) => state.autoPilot);
  const autoPilotRange = useGameStore((state) => state.autoPilotRange);
  const prevLocation = useRef(currentLocation);

  const randomMoveDirection = useCallback(() => {
    let validDirections = movementDirections.filter(direction => {
      const newX = currentLocation.x + direction.x;
      const newY = currentLocation.y + direction.y;
      return (
        newX <= autoPilotRange &&
        newX >= -autoPilotRange &&
        newY <= autoPilotRange &&
        newY >= -autoPilotRange
      );
    });

    if (validDirections.length === 0) {
      validDirections = movementDirections;
    }

    const randomDirection =
      validDirections[Math.floor(Math.random() * validDirections.length)];
    useGameStore.setState({ moveDirection: randomDirection });

  }, [currentLocation, autoPilotRange]);

  useEffect(() => {
    if (!autoPilot) return;

    if (
      currentLocation.x !== prevLocation.current.x ||
      currentLocation.y !== prevLocation.current.y
    ) {
      randomMoveDirection();
      prevLocation.current = currentLocation;
    }
  }, [autoPilot, currentLocation, autoPilotRange]);
};
