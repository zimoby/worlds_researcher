import { useEffect } from "react";
import { useGameStore } from "../store/store";
import { useProcessBeacons } from "../components/beacons/beaconUtils";
import { WEATHER_UPDATE_INTERVAL } from "../store/constants/worldConfig";

export const useGameLoop = () => {
  const { destroyBeacons } = useProcessBeacons();
  const updateWeather = useGameStore.getState().updateWeather;
  const addEventLog = useGameStore.getState().addEventLog;

  useEffect(() => {
    const intervalId = setInterval(() => {
      const receiveNewWeather = updateWeather();

      if (!receiveNewWeather) {
        return;
      }

      addEventLog(receiveNewWeather);
      destroyBeacons();
    }, WEATHER_UPDATE_INTERVAL);

    return () => clearInterval(intervalId);
  }, [addEventLog, destroyBeacons, updateWeather]);
};
