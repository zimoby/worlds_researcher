import { useEffect, useRef } from "react";
import { useGameStore } from "../store/store";
import { useProcessBeacons } from "../components/beacons/beaconUtils";

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
    }, 5000);

    return () => clearInterval(intervalId);
  }, [addEventLog, destroyBeacons, updateWeather]);
};
