// worldConfig.js

import { Color } from "three";
import {
  CostsT,
  ResourceName,
  UpgradeCosts,
  WorldStateThresholds,
} from "../types";
import { TerrainTypesT } from "../types";
import { DEV_MODE } from "./appConstants";

// GAME TIMING

export const START_DELAY = 1000;
export const RESOURCE_UPDATE_INTERVAL = 1000;
export const WEATHER_UPDATE_INTERVAL = 5000;

// WORLD

export const CHUNK_SIZE = 100;
export const WORLD_SEED_LENGTH = 7;

export const TEMPERATURE_RANGE = [-50, 100];
export const HUMIDITY_RANGE = [0, 100];
export const WIND_SPEED_RANGE = [0, 200];
export const POLLUTION_RANGE = [0, 500];
export const RADIATION_RANGE = [0, 1000];

export const WEATHER_NAMES = ["Mild", "Moderate", "Severe"];
export const WEATHER_PROBABILITIES = [0.7, 0.2, 0.1];

export const DETAIL_RANGE = [0.1, 0.9];

export const WORLD_STATE_THRESHOLDS: WorldStateThresholds = {
  Safe: {
    pollution: 300,
    radiation: 300,
    windSpeed: 100,
    temperature: [50, -20],
  },
  Hazardous: { pollution: 300, radiation: 300 },
  Stormy: { windSpeed: 100 },
  "Extreme temperature": { temperature: [50, -20] },
  Danger: { radiation: 100, pollution: 100 },
};

// ARTIFACAFTS

export const ARTIFACT_PROBABILITIES: Record<string, number> = {
  usual: 0.6,
  rare: 0.3,
  legendary: 0.1,
};

export const ARTIFACT_AMOUNT = 10;
export const ARTIFACT_CHUNK_RANGE = 10;
export const GET_ARTIFACT_RADIUS = 20;

// TERRAIN

export const GROUND_MIN_LEVEL = -10;
export const GROUND_MAX_LEVEL = 20;
export const GROUND_HEIGHT_MULTIPLIER = 20;
export const GROUND_BASELINE_OFFSET = -5;

export const TERRAIN_COLORS = {
  water: { level: GROUND_MIN_LEVEL + 1 },
  grass: { level: 0 },
  dirt: { level: 5 },
  snow: { level: 10 },
  default: { level: 0, color: new Color(0xffffff) },
};

export const INITIAL_RESOURCES = {
  Water: DEV_MODE ? 900 : 0,
  Metals: DEV_MODE ? 900 : 0,
  "Rare Elements": DEV_MODE ? 900 : 0,
  Hydrocarbons: DEV_MODE ? 900 : 0,
};

export const classicTerrainPalette = {
  water: new Color(255), // blue
  grass: new Color(65280), // green
  dirt: new Color(16711680), // red
  snow: new Color(16777215), // white
};

export const terrainTypes: TerrainTypesT = {
  water: {
    color: classicTerrainPalette.water,
    level: GROUND_MIN_LEVEL + 1,
  },
  grass: {
    color: classicTerrainPalette.grass,
    level: 0,
  },
  dirt: {
    color: classicTerrainPalette.dirt,
    level: 5,
  },
  snow: {
    color: classicTerrainPalette.snow,
    level: 10,
  },
  default: {
    color: new Color(16777215),
    level: 0,
  },
};

// BEACONS

export const INITIAL_BEACONS = 10;
export const BEACONS_RANGE = 20;

// RESOURCES

export const INITIAL_ENERGY = 1000;
export const INITIAL_ENERGY_DEVMODE = 1000000;

export const resourceNames = [
  "Water",
  "Metals",
  "Rare Elements",
  "Hydrocarbons",
];

export const resourceTypes: Record<
  ResourceName,
  { color: Color; threshold: number; score: number }
> = {
  [resourceNames[0]]: {
    color: new Color(16777215), // white
    threshold: 0.1,
    score: 10,
  },
  [resourceNames[1]]: {
    color: new Color(16753920), // orange
    threshold: 0.2,
    score: 7,
  },
  [resourceNames[2]]: {
    color: new Color(8388736), // purple
    threshold: 0.4,
    score: 5,
  },
  [resourceNames[3]]: {
    color: new Color(16728192), // pink
    threshold: 1,
    score: 1,
  },
};

// MAP

export const movementDirections = [
  { x: -1, y: 0, label: "a" },
  { x: 0, y: -1, label: "w" },
  { x: 0, y: 1, label: "s" },
  { x: 1, y: 0, label: "d" },
];

// UPGRADES

export const beaconsArmorNames = ["None", "Light", "Medium", "Heavy"];
export const beaconsArmorColors = ["#ffffff", "#ff0000", "#00ff00", "#00ffff"];
export const armorDestructionModifiers = [1, 0.75, 0.5, 0.25];

export const resourceCollectionNames = ["None", "Basic", "Advanced", "Elite"]; // Surface Mining - Deep Drilling - Laser Extraction
export const resourceCollectionMultipliers = [1, 2, 5, 10];

export const droneScanNames = [
  "Basic",
  "Advanced",
  "Mega",
  "Elite",
  "Ultimate",
];
export const droneScanAreaValues = [20, 30, 40, 50, 60];
export const upgradeCosts = {
  resourceCollection: [
    { Water: 100, Metals: 50, "Rare Elements": 20, Energy: 80 } as UpgradeCosts,
    {
      Water: 200,
      Metals: 100,
      "Rare Elements": 40,
      Energy: 800,
    } as UpgradeCosts,
    {
      Water: 400,
      Metals: 200,
      "Rare Elements": 80,
      Energy: 8000,
    } as UpgradeCosts,
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

export const COSTS: CostsT = {
  scanning: { name: "Scanning per sec", value: 50, valueAlt: "en" },
  flyToNewWorld: { name: "Fly to new world", value: 10000, valueAlt: "en" },
  placeBeacon: { name: "Place beacon", value: 100, valueAlt: "en" },
  extendBeaconLimits: {
    name: "Extend beacons limits",
    value: 1000,
    valueAlt: "en",
  },
  increaseSpeed: { name: "Extra speed", value: 5, valueAlt: "x en" },
  increaseMapSize: { name: "Extra map size", value: 2, valueAlt: "x en" },
};
