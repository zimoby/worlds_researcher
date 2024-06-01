import { StateCreator } from "zustand";
import { GameStoreState } from "../store";
import { DEV_MODE } from "../constants/appConstants";
import {
  resourceTypes,
  INITIAL_RESOURCES,
  COSTS,
  INITIAL_ENERGY,
  INITIAL_ENERGY_DEVMODE,
  CHUNK_SIZE,
} from "../constants/worldConfig";
import { resourceCollectionMultipliers } from "../constants/worldConfig";
import { CollectedResources } from "../types";

export interface ResourcesSlice {
  energy: number;
  collectedResources: CollectedResources;
  decreaseEnergy: (points: number) => void;
  updateResourcesAndEnergy: () => void;
}

export const createResourcesSlice: StateCreator<
  GameStoreState,
  [],
  [],
  ResourcesSlice
> = (set, get) => ({
  energy: DEV_MODE ? INITIAL_ENERGY_DEVMODE : INITIAL_ENERGY,

  decreaseEnergy: (points: number) => {
    set((state) => {
      return { energy: state.energy - points };
    });
  },

  collectedResources: { ...INITIAL_RESOURCES },

  updateResourcesAndEnergy: () => {
    const {
      beacons,
      collectedResources,
      energy,
      canPlaceBeacon,
      addEventLog,
      dynamicSpeed,
      animationFirstStage,
      mapAnimationState,
    } = get();

    const { mapParams } = get();

    const newCollectedResources = beacons.reduce(
      (resources, beacon) => {
        resources[beacon.resource] =
          (resources[beacon.resource] || 0) +
          1 * resourceCollectionMultipliers[beacon.collectionLevel];
        return resources;
      },
      { ...collectedResources },
    );

    const pointsEarned = beacons.reduce(
      (total, beacon) =>
        total +
        resourceTypes[beacon.resource].score *
          resourceCollectionMultipliers[beacon.collectionLevel],
      0,
    );
    let newPlayerPoints = energy + pointsEarned;

    const combinedSpeed = dynamicSpeed * mapParams.speed;

    if (combinedSpeed > 1) {
      newPlayerPoints -=
        dynamicSpeed * mapParams.speed * COSTS.increaseSpeed.value;
      addEventLog(
        `High Speed. -${dynamicSpeed * mapParams.speed * COSTS.increaseSpeed.value} energy`,
      );
    }

    if (
      (mapParams.width > CHUNK_SIZE || mapParams.depth > CHUNK_SIZE) &&
      animationFirstStage &&
      mapAnimationState === "idle"
    ) {
      const extraMapSize =
        mapParams.width - CHUNK_SIZE + (mapParams.depth - CHUNK_SIZE);
      const extraCosts = Math.round(extraMapSize * COSTS.increaseMapSize.value);
      newPlayerPoints -= extraCosts;
      addEventLog(`Extra Map Scan. -${extraCosts} energy`);
    }

    if (canPlaceBeacon) {
      if (newPlayerPoints >= COSTS.scanning.value) {
        newPlayerPoints -= COSTS.scanning.value;
        addEventLog(`Scanning. -${COSTS.scanning.value} energy`);
      }
    }

    set({
      collectedResources: newCollectedResources,
      energy: Math.max(newPlayerPoints, 0),
      mapParams: {
        ...mapParams,
        speed: energy > 0 ? mapParams.speed : 1,
      },
    });
  },
});
