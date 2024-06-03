import { useGameStore } from "../../../store/store"
import React, { useState, useEffect } from 'react';
import { formatTime, getElapsedTime } from "../../../utils/functions";

export const GameTime = () => {
  const gameStartTime = useGameStore((state) => state.gameStartTime);
  const [currentTime, setCurrentTime] = useState(Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-row gap-5">
      <p className=" leading-4">Game started at: {formatTime(gameStartTime)}</p>
      <p className=" leading-4">Current time: {formatTime(currentTime)}</p>
      <p className=" leading-4">Elapsed time: {getElapsedTime(gameStartTime)}</p>
    </div>
  );
}