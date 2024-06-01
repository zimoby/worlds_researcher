import { StateCreator } from "zustand";
import { GameStoreState } from "../store";
import { ResourceName } from "../types";
import { UpgradeType } from "../types";
import { COSTS, INITIAL_BEACONS, upgradeCosts } from "../constants/worldConfig";

export interface UpgradeSlice {
  resourceCollectionLevel: number;
  beaconsArmorLevel: number;
  droneScanLevel: number;
  beaconsLimit: number;
  upgrade: (type: UpgradeType) => void;
  increaseBeconsLimit: () => void;
}

export const createUpgradeSlice: StateCreator<
  GameStoreState,
  [],
  [],
  UpgradeSlice
> = (set) => ({
  resourceCollectionLevel: 0,
  beaconsArmorLevel: 0,
  droneScanLevel: 0,
  beaconsLimit: INITIAL_BEACONS,
  upgrade: (type: UpgradeType) => {
    set((state) => {
      const levelKey = `${type}Level` as
        | "resourceCollectionLevel"
        | "beaconsArmorLevel"
        | "droneScanLevel";
      const currentLevel = state[levelKey];
      const maxLevel = upgradeCosts[type].length;

      if (currentLevel >= maxLevel) {
        return {
          message: `Maximum ${type} level reached.`,
        };
      }

      const nextLevel = currentLevel + 1;
      const cost = upgradeCosts[type][currentLevel];

      if (
        cost &&
        Object.keys(cost).every((resource) => {
          if (resource === "Energy") {
            return state.energy >= (cost[resource] ?? 0);
          } else {
            return (
              state.collectedResources[resource as ResourceName] >=
              (cost[resource as ResourceName] ?? 0)
            );
          }
        })
      ) {
        const updatedResources = { ...state.collectedResources };
        let updatedEnergy = state.energy;

        Object.keys(cost).forEach((resource) => {
          if (resource === "Energy") {
            updatedEnergy -= cost[resource]!;
          } else {
            updatedResources[resource as ResourceName] -=
              cost[resource as ResourceName]!;
          }
        });

        return {
          [levelKey]: nextLevel,
          collectedResources: updatedResources,
          energy: updatedEnergy,
          message: `${type} level increased to ${nextLevel}`,
        };
      } else {
        return {
          message: `Not enough resources to upgrade ${type}`,
        };
      }
    });
  },
  increaseBeconsLimit: () => {
    set((state) => {
      if (state.energy >= COSTS.extendBeaconLimits.value) {
        return {
          beaconsLimit: state.beaconsLimit + 1,
          energy: state.energy - COSTS.extendBeaconLimits.value,
          message: `Beacons limit increased to ${state.beaconsLimit + 1}`,
        };
      } else {
        return {
          message: `Not enough energy to increase beacons limit`,
        };
      }
    });
  },
});
