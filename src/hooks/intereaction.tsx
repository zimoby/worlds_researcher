import { RefObject, useCallback, useEffect, useRef, useState } from "react";
import { Camera, Mesh, Raycaster } from "three";
import { useGameStore } from "../store/store";
import { ResourceType } from "../store/types";
import { debounce, throttle } from "lodash";
import { useProcessBeacons } from "../components/beacons/beaconUtils";
import { getChunkCoordinates } from "../utils/functions";
import { useProcessArtifacts } from "../components/artifacts/artifactUtils";
import { keyToVector, getIntersection } from "../utils/mapUtils";
import { COSTS } from "../store/constants/worldConfig";

export const useKeyboardControls = ({
  meshRef,
  camera,
  raycaster,
}: {
  camera: Camera;
  raycaster: Raycaster;
  meshRef: RefObject<Mesh>;
}): void => {
  const canPlaceBeacon = useGameStore((state) => state.canPlaceBeacon);
  const mouseEventRef = useRef<MouseEvent | null>(null);
  const [activeKeys, setActiveKeys] = useState<Record<string, boolean>>({});
  const moveDirection = useGameStore((state) => state.moveDirection);
  const energy = useGameStore((state) => state.energy);
  const updateMapParam = useGameStore((state) => state.updateMapParam);
  const autoPilot = useGameStore((state) => state.autoPilot);

  const handleMousePosition = useCallback((event: MouseEvent) => {
    mouseEventRef.current = event;
  }, []);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (keyToVector[event.code]) {
        setActiveKeys((prev) => ({ ...prev, [event.code]: true }));
        if (autoPilot) {
          useGameStore.setState({ autoPilot: false });
        }
      }

      if (event.code === "Space") {
        const intersects = getIntersection(
          mouseEventRef.current ?? { clientX: 0, clientY: 0 },
          raycaster,
          meshRef.current,
          camera,
        );

        if (intersects.length > 0 && !canPlaceBeacon) {
          const { point, face } = intersects[0];
          if (face) {
            useGameStore.setState({
              canPlaceBeacon: true,
              activePosition: point,
            });
          }
        }
      }

      switch (event.code) {
        case "ShiftLeft":
        case "ShiftRight":
          useGameStore.setState({ dynamicSpeed: energy > 0 ? 3 : 1 });
          break;
        case "AltLeft":
        case "AltRight":
          updateMapParam("speed", 0);
          break;
      }
    },
    [
      autoPilot,
      camera,
      canPlaceBeacon,
      meshRef,
      energy,
      raycaster,
      updateMapParam,
    ],
  );

  const handleKeyUp = useCallback((event: KeyboardEvent) => {
    setActiveKeys((prev) => {
      const newKeys: Record<string, boolean> = { ...prev };
      delete newKeys[event.code];
      return newKeys;
    });

    switch (event.code) {
      case "ShiftLeft":
      case "ShiftRight":
        useGameStore.setState({ dynamicSpeed: 1 });
        break;
      case "Space":
        useGameStore.setState({ canPlaceBeacon: false });
        break;
    }
  }, []);

  useEffect(() => {
    const newMoveDirection = Object.entries(activeKeys).reduce(
      (acc, [key, active]) => {
        if (active && keyToVector[key]) {
          acc.x += keyToVector[key].x;
          acc.y += keyToVector[key].y;
        }
        return acc;
      },
      { x: 0, y: 0 },
    );

    if (
      (newMoveDirection.x !== 0 || newMoveDirection.y !== 0) &&
      (newMoveDirection.x !== moveDirection.x ||
        newMoveDirection.y !== moveDirection.y)
    ) {
      useGameStore.setState({ moveDirection: newMoveDirection });
    }
  }, [activeKeys, moveDirection]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    window.addEventListener("mousemove", handleMousePosition);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      window.removeEventListener("mousemove", handleMousePosition);
    };
  }, [handleKeyDown, handleKeyUp, handleMousePosition]);
};

export const useCanvasHover = ({
  camera,
  raycaster,
  meshRef,
  resources,
}: {
  camera: Camera;
  raycaster: Raycaster;
  meshRef: RefObject<Mesh>;
  resources: { current: ResourceType[] };
}) => {
  const canPlaceBeacon = useGameStore((state) => state.canPlaceBeacon);
  const { width, depth, offsetX, offsetY } = useGameStore(
    (state) => state.mapParams,
  );
  const { addBeacon } = useProcessBeacons();
  const { takeArtifact, checkArtifactInRadius } = useProcessArtifacts();
  const addNewMessage = useGameStore((state) => state.addNewMessage);
  const energy = useGameStore((state) => state.energy);

  const throttledSetState = useRef(
    throttle((state) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      useGameStore.setState(state);
    }, 100),
  ).current;

  const handleCanvasHover = useCallback(
    (event: { clientX: number; clientY: number; type: string }) => {
      if (!canPlaceBeacon || !meshRef.current) {
        if (energy < COSTS.scanning.value) {
          addNewMessage("Not enough energy to scan");
        }
        return;
      }

      const intersects = getIntersection(
        { clientX: event.clientX, clientY: event.clientY },
        raycaster,
        meshRef.current,
        camera,
      );

      if (intersects.length === 0) {
        return;
      }

      const { point, face } = intersects[0];
      if (!face) return;

      const vertexIndex = face.a;
      const resource = resources.current[vertexIndex];

      debounce(() => {
        useGameStore.setState({
          activePosition: point,
        });
      }, 100)();

      const { currentOffset } = useGameStore.getState();

      const currentPosition = {
        x: point.x + width / 2 + currentOffset.x,
        y: point.z + depth / 2 + currentOffset.y,
      };

      throttledSetState({
        selectedResource: resource,
        selectedChunk: getChunkCoordinates(
          currentPosition.x,
          currentPosition.y,
          width,
        ),
      });

      const isWithinRadius = checkArtifactInRadius({ point });

      if (event.type === "click") {
        if (isWithinRadius) {
          takeArtifact({ artifactId: isWithinRadius.id });
          return;
        }

        addBeacon({
          position: {
            x: point.x - offsetX,
            y: point.y,
            z: point.z - offsetY,
          },
          resource,
          currentChunk: getChunkCoordinates(
            currentPosition.x,
            currentPosition.y,
            width,
          ),
        });
      }
    },
    [
      canPlaceBeacon,
      meshRef,
      raycaster,
      camera,
      resources,
      width,
      depth,
      throttledSetState,
      checkArtifactInRadius,
      energy,
      addNewMessage,
      addBeacon,
      offsetX,
      offsetY,
      takeArtifact,
    ],
  );

  useEffect(() => {
    window.addEventListener("click", handleCanvasHover);
    window.addEventListener("mousemove", handleCanvasHover);

    return () => {
      window.removeEventListener("click", handleCanvasHover);
      window.removeEventListener("mousemove", handleCanvasHover);
      throttledSetState.cancel();
    };
  }, [handleCanvasHover, throttledSetState]);
};
