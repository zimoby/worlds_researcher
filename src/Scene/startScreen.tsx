import { useEffect, useState } from "react";
import { corpLogoSvg } from "../assets/CorpLogo";
import {
  SETTING_DISABLE_ANIMATIONS,
  SETTING_DISABLE_SOUNDS,
  SETTING_START_SCREEN,
  useGameStore,
} from "../store/store";
import { ToggleButton } from "../components/UI/Elements/ToggleButton";
import { useSoundSystem } from "../hooks/soundSystem";
import { useCheckVariableRender } from "../utils/functions";

const authorName = "Denys Bondartsov";

const StartScreen = () => {
  const setStartScreen = useGameStore((state) => state.updateStoreProperty);
  const updateVariableInLocalStorage = useGameStore(
    (state) => state.updateVariableInLocalStorage,
  );
  const disableAnimations = useGameStore((state) => state.disableAnimations);
  const disableSounds = useGameStore((state) => state.disableSounds);
  const startScreen = useGameStore((state) => state.startScreen);
  const loadingProgress = useGameStore((state) => state.loadingProgress);
  const startToLoadFiles = useGameStore((state) => state.startToLoadFiles);
  const [skipStartScene, setSkipStartScene] = useState(false);

  useCheckVariableRender(loadingProgress, "loadingProgress");

  const { sounds } = useSoundSystem();

  useEffect(() => {
    if (loadingProgress >= 100) {
      if (!disableSounds && sounds.click) {
        sounds.click.play();
      }
      setTimeout(() => {
        setStartScreen(SETTING_START_SCREEN, false);
        if (startScreen === skipStartScene) {
          updateVariableInLocalStorage(SETTING_START_SCREEN, !skipStartScene);
        }
      }, 1000);
    }
  }, [
    loadingProgress,
    disableSounds,
    sounds.click,
    skipStartScene,
    startScreen,
    setStartScreen,
    updateVariableInLocalStorage,
  ]);

  return (
    <div className="size-full bg-black">
      <div
        className={`flex size-full flex-col items-center justify-center bg-neutral-900 ${
          loadingProgress >= 100 ? "animate-fadeOut" : ""
        }`}
      >
        <div className="-mb-1 h-auto w-20">
          <div className="flex size-full items-center justify-center fill-white">
            {corpLogoSvg}
          </div>
        </div>
        <div
          className="orbitron text-center text-7xl uppercase text-yellow-400"
          style={{ transform: "perspective(40px) rotateX(5deg)" }}
        >
          Worlds researcher
        </div>
        <h1 className="orbitron mt-3 -skew-x-12 text-xs uppercase">
          Project for the Threejs.journey course
        </h1>
        <p className="orbitron mt-3 w-3/5 -skew-x-12 scale-x-75 scale-y-150 text-center text-2xs uppercase leading-3">
          {`Course by Bruno Simon ·
          Design by ${authorName} ·
          Story by ${authorName} ·
          Animation by ${authorName} ·
          Development by ${authorName} ·
          Testing by Liia Kukava ❤︎
          Time Travel Logistics by ${authorName} ·
          Unicorn Training by ${authorName} ·
          Cat Whispering by ${authorName}`}
        </p>

        {!startToLoadFiles && (
          <div className="mt-16 flex size-fit cursor-pointer flex-row items-center justify-center overflow-hidden border border-neutral-100 bg-neutral-100 hover:border-yellow-400 hover:bg-yellow-400">
            <div className="h-full w-36 overflow-hidden">
              <div
                className="flex h-full w-72 animate-linear flex-col items-center justify-center bg-repeat-x"
                style={{
                  background:
                    "repeating-linear-gradient(-45deg, transparent, transparent 10px, black 10px, black 20px)",
                }}
              />
            </div>
            <button
              className="orbitron m-2 w-36 text-center uppercase text-neutral-900"
              onClick={() => useGameStore.setState({ startToLoadFiles: true })}
            >
              Start Game
            </button>
            <div className="h-full w-36 overflow-hidden">
              <div
                className="flex h-full w-72 animate-linear flex-col items-center justify-center bg-repeat-x"
                style={{
                  background:
                    "repeating-linear-gradient(-45deg, transparent, transparent 10px, black 10px, black 20px)",
                }}
              />
            </div>
          </div>
        )}

        {startToLoadFiles && (
          <div className="mt-16 h-10 w-[300px] border bg-neutral-800">
            <div
              className="h-full overflow-hidden bg-neutral-200"
              style={{ width: `${loadingProgress * 3}px` }}
            >
              <div
                className="flex h-full animate-linear flex-col items-center justify-center bg-repeat-x"
                style={{
                  width: `${loadingProgress * 6}px`,
                  background:
                    "repeating-linear-gradient(-45deg, transparent, transparent 10px, black 10px, black 20px)",
                }}
              />
            </div>
          </div>
        )}

        <div className="mt-16 flex h-fit flex-col items-center justify-center">
          <p>Settings</p>
          <p className="w-3/5 text-center text-xs leading-3">
            The game includes glitch effects that may cause discomfort or
            seizures for people with photosensitive epilepsy. If you find these
            effects uncomfortable you can disable them.
          </p>
          <div className="mt-2 flex flex-row gap-3">
            <ToggleButton
              text={"Animations"}
              onClick={() =>
                updateVariableInLocalStorage(
                  SETTING_DISABLE_ANIMATIONS,
                  !disableAnimations,
                )
              }
              state={disableAnimations}
            />
            <ToggleButton
              text={"Sound"}
              onClick={() => {
                updateVariableInLocalStorage(
                  SETTING_DISABLE_SOUNDS,
                  !disableSounds,
                );
              }}
              state={disableSounds}
            />
            <ToggleButton
              text={"Show start screen"}
              onClick={() => setSkipStartScene(!skipStartScene)}
              state={skipStartScene}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartScreen;
