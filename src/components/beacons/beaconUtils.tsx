import { useCallback } from "react";
import { useGameStore } from "../../store/store";
import { BEACONS_RANGE, COSTS } from "../../store/constants/worldConfig";
import { BeaconType } from "../../store/types";
import { ResourceType } from "../../store/types";
import { armorDestructionModifiers } from "../../store/constants/worldConfig";
import { WEATHER_PROBABILITIES } from "../../store/constants/worldConfig";
import { useCheckVariableRender } from "../../utils/functions";

// const createBeaconsArray = (beacons: BeaconType[], currentChunk: { x: number; y: number }) => {
//   return beacons.filter(
//     (beacon: { chunkX: number; chunkY: number }) =>
//       beacon.chunkX === currentChunk.x && beacon.chunkY === currentChunk.y,
//   );
// }

export const addEmptyBeacons = (amount = 50): BeaconType[] => {
  const generateUniqueBeacon = () => {
    return {
      x: 0,
      y: 0,
      z: 0,
      resource: "empty" as ResourceType,
      chunkX: 0,
      chunkY: 0,
      visible: false,
      id: Math.random().toString(36).substr(2, 9),
      armor: 0,
      collectionLevel: 0,
    };
  };

  const beacons: BeaconType[] = Array.from({ length: amount }, () =>
    generateUniqueBeacon(),
  );

  return beacons;
};

export const useProcessBeacons = () => {
  const addLog = useGameStore((state) => state.addLog);
  const beacons = useGameStore((state) => state.beacons);
  const weatherCondition = useGameStore((state) => state.weatherCondition);
  const decreaseEnergy = useGameStore((state) => state.decreaseEnergy);
  const energy = useGameStore((state) => state.energy);
  const beaconsLimit = useGameStore((state) => state.beaconsLimit);
  const updateEmptyBeacon = useGameStore((state) => state.updateEmptyBeacon);
  const cleanBeacon = useGameStore((state) => state.cleanBeacon);

  const resourceCollectionLevel = useGameStore(
    (state) => state.resourceCollectionLevel,
  );
  const beaconsArmorLevel = useGameStore((state) => state.beaconsArmorLevel);

  // useCheckVariableRender(beacons, "beacons");

  const updateNewBeacon = useCallback(
    ({
      position,
      resource,
      currentChunk,
    }: {
      position: { x: number; y: number; z: number };
      resource: ResourceType;
      currentChunk: { x: number; y: number };
    }) => {

      
      
      const freeBeacon = beacons.find((beacon) => beacon.resource === "empty");
      const filterEmptyBeacons = beacons.filter(
        (beacon) => beacon.resource !== "empty",
      );

      const chunkBeacons = filterEmptyBeacons.filter(
        (beacon: { chunkX: number; chunkY: number }) =>
          beacon.chunkX === currentChunk.x && beacon.chunkY === currentChunk.y,
      );

      const isWithinRadius = chunkBeacons.some(
        (beacon: { x: number; z: number }) => {
          const dx = position.x - beacon.x;
          const dz = position.z - beacon.z;
          const distance = Math.sqrt(dx * dx + dz * dz);
          return distance < BEACONS_RANGE;
        },
      );

      if (isWithinRadius) {
        useGameStore.setState({
          message: "Cannot place beacon too close to another beacon.",
        });
        return;
      }

      if (chunkBeacons.length >= 2) {
        useGameStore.setState({
          message: "Maximum beacons placed in this chunk.",
        });
        return;
      }

      if (filterEmptyBeacons.length >= beaconsLimit) {
        useGameStore.setState({
          message:
            "Maximum beacons limit reached. You can increase it in the Beacons panel",
        });
        return;
      }

      if (energy >= COSTS.placeBeacon.value) {
        decreaseEnergy(COSTS.placeBeacon.value);
        addLog(`Beacon placed at ${currentChunk.x}, ${currentChunk.y}`);
      } else {
        useGameStore.setState({
          message: "Not enough energy to place a beacon.",
        });
        return;
      }

      // take free bacon from the pool that have empty resource

      // console.log("beaconData", { freeBeacon, beacons });

      if (!freeBeacon) {
        return;
      }

      const beaconData: BeaconType = {
        x: Number(position.x.toFixed(3)),
        y: Number(position.y.toFixed(3)),
        z: Number(position.z.toFixed(3)),
        resource,
        chunkX: currentChunk.x,
        chunkY: currentChunk.y,
        visible: true,
        id: freeBeacon.id,
        armor: beaconsArmorLevel,
        collectionLevel: resourceCollectionLevel,
      };

      updateEmptyBeacon(beaconData);
    },
    [
      beacons,
      beaconsLimit,
      energy,
      beaconsArmorLevel,
      resourceCollectionLevel,
      updateEmptyBeacon,
      decreaseEnergy,
      addLog,
    ],
  );

  const addBeacon = useCallback(
    ({
      position,
      resource,
      currentChunk,
    }: {
      position: { x: number; y: number; z: number };
      resource: ResourceType;
      currentChunk: { x: number; y: number };
    }) => {
      const chunkBeacons = beacons.filter(
        (beacon: { chunkX: number; chunkY: number }) =>
          beacon.chunkX === currentChunk.x && beacon.chunkY === currentChunk.y,
      );

      const isWithinRadius = chunkBeacons.some(
        (beacon: { x: number; z: number }) => {
          const dx = position.x - beacon.x;
          const dz = position.z - beacon.z;
          const distance = Math.sqrt(dx * dx + dz * dz);
          return distance < BEACONS_RANGE;
        },
      );

      if (isWithinRadius) {
        useGameStore.setState({
          message: "Cannot place beacon too close to another beacon.",
        });
        return;
      }

      if (chunkBeacons.length >= 2) {
        useGameStore.setState({
          message: "Maximum beacons placed in this chunk.",
        });
        return;
      }

      if (beacons.length >= beaconsLimit) {
        useGameStore.setState({
          message:
            "Maximum beacons limit reached. You can increase it in the Beacons panel",
        });
        return;
      }

      if (energy >= COSTS.placeBeacon.value) {
        decreaseEnergy(COSTS.placeBeacon.value);
        addLog(`Beacon placed at ${currentChunk.x}, ${currentChunk.y}`);
      } else {
        useGameStore.setState({
          message: "Not enough energy to place a beacon.",
        });
        return;
      }

      useGameStore.setState((state: { beacons: BeaconType[] }) => {
        const newBeacons = [
          ...state.beacons,
          {
            x: Number(position.x.toFixed(3)),
            y: Number(position.y.toFixed(3)),
            z: Number(position.z.toFixed(3)),
            resource,
            chunkX: currentChunk.x,
            chunkY: currentChunk.y,
            visible: true,
            id: Math.random().toString(36).substr(2, 9),
            armor: beaconsArmorLevel,
            collectionLevel: resourceCollectionLevel,
          },
        ];
        return { beacons: newBeacons };
      });
    },
    [
      addLog,
      beacons,
      beaconsLimit,
      decreaseEnergy,
      energy,
      resourceCollectionLevel,
      beaconsArmorLevel,
    ],
  );

  const destroyBeacons = useCallback(() => {
    if (weatherCondition.toLowerCase() === "severe") {
      const destroyedBeacons: BeaconType[] = [];

      const nonEmptyBeacons = beacons.filter(
        (beacon) => beacon.resource !== "empty",
      );

      nonEmptyBeacons.forEach((beacon) => {
        const armorLevel = beacon.armor;
        const destructionProbability =
          WEATHER_PROBABILITIES[2] * armorDestructionModifiers[armorLevel];
        if (Math.random() < destructionProbability) {
          destroyedBeacons.push(beacon);
        }
      });

      if (destroyedBeacons.length > 0) {
        destroyedBeacons.forEach((beacon) => {
          cleanBeacon(beacon.id);
        });
        // useGameStore.setState((state) => {
        //   const newBeacons = state.beacons.filter((beacon) => !destroyedBeacons.includes(beacon));
        //   return { beacons: newBeacons };
        // });

        useGameStore.setState({
          message: `Destroyed ${destroyedBeacons.length} beacons due to severe weather.`,
        });
        addLog(
          `Destroyed ${destroyedBeacons.length} beacons due to severe weather.`,
        );
      }
    }
  }, [addLog, beacons, cleanBeacon, weatherCondition]);

  return { addBeacon, destroyBeacons, updateNewBeacon };
};
