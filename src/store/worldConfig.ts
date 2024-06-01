// worldConfig.js

import { Color } from "three";
import { WorldStateThresholds } from "./types";

// WORLD

export const TEMPERATURE_RANGE = [-50, 100];
export const HUMIDITY_RANGE = [0, 100];
export const WIND_SPEED_RANGE = [0, 200];
export const POLLUTION_RANGE = [0, 500];
export const RADIATION_RANGE = [0, 1000];

export const WEATHER_NAMES = ["Mild", "Moderate", "Severe"];
export const WEATHER_PROBABILITIES = [0.7, 0.2, 0.1];

export const DETAIL_RANGE = [0.1, 0.9];

export const WORLD_STATE_THRESHOLDS: WorldStateThresholds = {
  Safe: { pollution: 300, radiation: 300, windSpeed: 100, temperature: [50, -20] },
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

export const ADJECTIVES = [
  "Ancient", "Forgotten", "Mysterious", "Magical", "Enchanted", "Cursed", 
  "Blessed", "Divine", "Sacred", "Holy", "Unholy", "Dark", "Light", 
  "Eternal", "Infinite", "Infernal", "Celestial", "Abyssal", "Eldritch", 
  "Arcane", "Mystic", "Mythical", "Legendary"
];

export const ADJECTIVES_EXTRA = [
  "Golden", "Silver", "Bronze", "Crystal", "Sapphire", "Ruby", "Emerald", 
  "Diamond", "Amethyst", "Topaz", "Opal", "Pearl", "Obsidian", "Onyx", 
  "Jade", "Ivory", "Platinum", "Titanium", "Copper", "Iron", "Steel", 
  "Adamantium", "Mithril", "Orichalcum", "Plutonium", "Uranium", "Neptunium", 
  "Mercury", "Lead", "Tin", "Aluminium", "Cobalt", "Nickel", "Zinc", 
  "Oxygen", "Nitrogen", "Hydrogen", "Helium", "Lithium", "Beryllium", 
  "Boron", "Sodium", "Potassium", "Calcium", "Scandium", "Titanium", 
  "Vanadium", "Chromium", "Manganese", "Iron", "Cobalt", "Nickel", 
  "Copper", "Zinc", "Tin", "Antimony", "Tellurium", "Iodine", "Xenon", 
  "Caesium", "Barium", "Lanthanum", "Cerium", "Praseodymium", "Neodymium", 
  "Promethium", "Samarium", "Europium", "Gadolinium", "Terbium"
];

// TERRAIN

export const GROUND_MIN_LEVEL = -10;
export const GROUND_MAX_LEVEL = 20;

export const TERRAIN_COLORS = {
  water: { level: GROUND_MIN_LEVEL + 1 },
  grass: { level: 0 },
  dirt: { level: 5 },
  snow: { level: 10 },
  default: { level: 0, color: new Color(0xffffff) },
};

export const INITIAL_RESOURCES = {
  Water: 900,
  Metals: 900,
  "Rare Elements": 900,
  Hydrocarbons: 900,
};

// BEACONS

export const INITIAL_BEACONS = 10;