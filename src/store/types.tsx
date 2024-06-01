interface Thresholds {
  pollution?: number;
  radiation?: number;
  windSpeed?: number;
  temperature?: [number, number];
}
export interface WorldStateThresholds {
  Safe: Thresholds;
  Hazardous: Thresholds;
  Stormy: Thresholds;
  "Extreme temperature": Thresholds;
  Danger: Thresholds;
}
