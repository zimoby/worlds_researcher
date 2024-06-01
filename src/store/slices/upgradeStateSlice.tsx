import { StateCreator } from "zustand";
import { GameStoreState } from "../store";
import { ResourceName } from "../types";

export interface UpgradeSlice {
  resourceCollectionLevel: number;
  beaconsArmorLevel: number;
  droneScanLevel: number;
  upgrade: (type: UpgradeType) => void;
}

type ResoucesAndEnergyNamesType = ResourceName | "Energy";

type UpgradeCosts = {
  [key in ResoucesAndEnergyNamesType]?: number;
};

type UpgradeType = "resourceCollection" | "beaconsArmor" | "droneScan";

export const beaconsArmorNames = ["None", "Light", "Medium", "Heavy"];
export const beaconsArmorColors = ["#ffffff", "#ff0000", "#00ff00", "#00ffff"];
export const armorDestructionModifiers = [1, 0.75, 0.5, 0.25];

export const resourceCollectionNames = ["None", "Basic", "Advanced", "Elite"];
export const resourceCollectionMultipliers = [1, 2, 5, 10];

export const droneScanNames = [
  "Basic",
  "Advanced",
  "Mega",
  "Elite",
  "Ultimate",
];
export const droneScanAreaValues = [20, 30, 40, 50, 60];

const upgradeCosts = {
  resourceCollection: [
    { Water: 100, Metals: 50, "Rare Elements": 20, Energy: 80 } as UpgradeCosts,
    { Water: 2, Metals: 2, "Rare Elements": 2, Energy: 800 } as UpgradeCosts,
    { Water: 2, Metals: 2, "Rare Elements": 2, Energy: 8000 } as UpgradeCosts,
  ],
  beaconsArmor: [
    {
      Metals: 150,
      "Rare Elements": 50,
      Hydrocarbons: 100,
      Energy: 120,
    } as UpgradeCosts,
    {
      Metals: 1500,
      "Rare Elements": 500,
      Hydrocarbons: 1000,
      Energy: 1200,
    } as UpgradeCosts,
    {
      Metals: 15000,
      "Rare Elements": 5000,
      Hydrocarbons: 10000,
      Energy: 12000,
    } as UpgradeCosts,
  ],
  droneScan: [
    { Water: 50, Metals: 20, Hydrocarbons: 30, Energy: 40 } as UpgradeCosts,
    { Water: 500, Metals: 200, Hydrocarbons: 300, Energy: 400 } as UpgradeCosts,
    {
      Water: 5000,
      Metals: 2000,
      Hydrocarbons: 3000,
      Energy: 4000,
    } as UpgradeCosts,
    {
      Water: 50000,
      Metals: 20000,
      Hydrocarbons: 30000,
      Energy: 40000,
    } as UpgradeCosts,
  ],
};

export const createUpgradeSlice: StateCreator<
  GameStoreState,
  [],
  [],
  UpgradeSlice
> = (set) => ({
  resourceCollectionLevel: 0,
  beaconsArmorLevel: 0,
  droneScanLevel: 0,
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
});
