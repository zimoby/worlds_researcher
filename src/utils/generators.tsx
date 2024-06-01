import { Color } from "three";
import { WorldParamsType, ArtifactT, ArtifactType, WeatherCondition, WorldState } from "../store/worldParamsSlice";
import {
  ADJECTIVES,
  ADJECTIVES_EXTRA,
  ARTIFACT_AMOUNT,
  ARTIFACT_PROBABILITIES,
  DETAIL_RANGE,
  HUMIDITY_RANGE,
  POLLUTION_RANGE,
  RADIATION_RANGE,
  TEMPERATURE_RANGE,
  WEATHER_NAMES,
  WEATHER_PROBABILITIES,
  WIND_SPEED_RANGE,
  WORLD_STATE_THRESHOLDS,
} from "../store/worldConfig";

const getRandomValue = ([min, max]: number[]) => Math.floor(min + Math.random() * (max - min));

export const generateWeather = (): WeatherCondition => {
  const randomValue = Math.random();
  let cumulativeProbability = 0;

  for (let i = 0; i < WEATHER_NAMES.length; i++) {
    cumulativeProbability += WEATHER_PROBABILITIES[i];
    if (randomValue < cumulativeProbability) {
      return WEATHER_NAMES[i] as WeatherCondition;
    }
  }

  return WEATHER_NAMES[0] as WeatherCondition;
};

export const generateWorld = (): WorldParamsType => {
  const worldSeed = Math.random().toString(36).substring(7);
  const temperature = getRandomValue(TEMPERATURE_RANGE);
  const humidity = getRandomValue(HUMIDITY_RANGE);
  const windSpeed = getRandomValue(WIND_SPEED_RANGE);
  const pollution = getRandomValue(POLLUTION_RANGE);
  const radiation = getRandomValue(RADIATION_RANGE);
  const weatherCondition = generateWeather();

  const [largeDetailes, mediumDetailes, smallDetailes] = Array(3)
    .fill(null)
    .map(() => Math.random() * (DETAIL_RANGE[1] - DETAIL_RANGE[0]) + DETAIL_RANGE[0]);

  let worldState: WorldState = { value: "Safe", name: "World" };
  for (const [state, thresholds] of Object.entries(WORLD_STATE_THRESHOLDS)) {
    if (thresholds.pollution !== undefined && pollution > thresholds.pollution) {
      worldState = { value: state, name: "World" } as WorldState;
      break;
    }
    if (thresholds.radiation !== undefined && radiation > thresholds.radiation) {
      worldState = { value: state, name: "World" } as WorldState;
      break;
    }
    if (thresholds.windSpeed !== undefined && windSpeed > thresholds.windSpeed) {
      worldState = { value: state, name: "World" } as WorldState;
      break;
    }
    if (thresholds.temperature !== undefined && (temperature > thresholds.temperature[0] || temperature < thresholds.temperature[1])) {
      worldState = { value: state, name: "World" } as WorldState;
      break;
    }
  }

  return {
    seed: { value: worldSeed, name: "Seed" },
    worldState,
    name: { value: "", name: "Name" },
    temperature: { name: "Temperature", value: temperature, max: TEMPERATURE_RANGE[1], min: -TEMPERATURE_RANGE[0] },
    humidity: { name: "Humidity", value: humidity, max: HUMIDITY_RANGE[1], min: HUMIDITY_RANGE[0] },
    windSpeed: { name: "Wind Speed", value: windSpeed, max: WIND_SPEED_RANGE[1], min: HUMIDITY_RANGE[0] },
    pollution: { name: "Pollution", value: pollution, max: POLLUTION_RANGE[1], min: POLLUTION_RANGE[0] },
    radiation: { name: "Radiation", value: radiation, max: RADIATION_RANGE[1], min: RADIATION_RANGE[0] },
    weatherCondition,
    mapDetailes: [largeDetailes, mediumDetailes, smallDetailes],
  };
};

const getRandomArtifactType = (): ArtifactType => {
  const randomValue = Math.random();
  let cumulativeProbability = 0;

  for (const [type, probability] of Object.entries(ARTIFACT_PROBABILITIES)) {
    cumulativeProbability += probability;
    if (randomValue < cumulativeProbability) {
      return type as ArtifactType;
    }
  }

  return "usual" as ArtifactType; 
};

const generateUniqArtefactName = () => {
  const randomAdjective1 = ADJECTIVES_EXTRA[Math.floor(Math.random() * ADJECTIVES_EXTRA.length)];
  const randomAdjective2 = ADJECTIVES[Math.floor(Math.random() * ADJECTIVES.length)];
  const name = `${randomAdjective1} ${randomAdjective2}`;
  return name;
};

const generateUniqArtefactParams = () => {
  const generateRandomValue = (max: number) => Math.floor(Math.random() * max);

  return {
    weight: { name: "Weight", value: generateRandomValue(1000) },
    power: { name: "Power", value: generateRandomValue(1000) },
    width: { name: "Width", value: generateRandomValue(100) },
    height: { name: "Height", value: generateRandomValue(100) },
    density: { name: "Density", value: generateRandomValue(100) },
    atomicNumber: { name: "Atomic Number", value: generateRandomValue(100) },
    meltingPoint: { name: "Melting Point", value: generateRandomValue(100) },
    boilingPoint: { name: "Boiling Point", value: generateRandomValue(100) },
    radioactivity: { name: "Radioactivity", value: generateRandomValue(100) },
  };
};

export const generateArtifacts = ({
  amount = ARTIFACT_AMOUNT,
  worldId = "",
}: {
  amount?: number;
  worldId?: string;
}): ArtifactT[] => {
  const artifacts: ArtifactT[] = [
    // {
    //   x: 0,
    //   y: 0,
    //   z: 0,
    //   type: "legendary",
    //   chunkX: 0,
    //   chunkY: 0,
    //   visible: true,
    //   id: Math.random().toString(36).substr(2, 9),
    // },
  ];
  for (let i = 0; i < amount; i++) {
    artifacts.push({
      x: Math.floor(Math.random() * 100) - 50,
      y: -10,
      z: Math.floor(Math.random() * 100) - 50,
      type: getRandomArtifactType(),
      chunkX: Math.floor(Math.random() * 10) - 5,
      chunkY: Math.floor(Math.random() * 10) - 5,
      visible: true,
      id: Math.random().toString(36).substr(2, 9),
      name: generateUniqArtefactName(),
      params: generateUniqArtefactParams(),
      worldId,
    });
  }
  return artifacts;
};

export const generateRandomColor = () => {
  const hue = Math.random() * 360;
  const saturation = 70;
  const lightness = 70;
  return new Color(`hsl(${hue}, ${saturation}%, ${lightness}%)`);
};
