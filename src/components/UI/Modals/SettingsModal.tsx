import {
  SETTING_DISABLE_ANIMATIONS,
  SETTING_DISABLE_MUSIC,
  SETTING_DISABLE_SOUNDS,
  SETTING_EDUCATION_MODE,
  SETTING_INVERT_DIRECTION,
  SETTING_START_SCREEN,
  useGameStore,
} from "../../../store/store";
import { ModalWrapper } from "./templateComponents";

const ToggleButton = ({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <div className="w-3/4 h-fit py-1 flex justify-between items-center text-uitext text-lg hover:bg-uilines hover:text-neutral-900">
      <label htmlFor={label} className="pl-5 tracking-tight leading-4 mr-2">
        {label}
      </label>
      <input
        type="checkbox"
        className="mr-5"
        id={label}
        name={label}
        checked={checked}
        onChange={onChange}
      />
    </div>
  );
};

export const SettingsModal = () => {
  const disableAnimations = useGameStore((state) => state.disableAnimations);
  const disableSounds = useGameStore((state) => state.disableSounds);
  const disableMusic = useGameStore((state) => state.disableMusic);
  const startScreen = useGameStore((state) => state.startScreen);
  const invertDirection = useGameStore((state) => state.invertDirection);
  const educationMode = useGameStore((state) => state.educationMode);

  const updateVariableInLocalStorage = useGameStore(
    (state) => state.updateVariableInLocalStorage,
  );

  return (
    <ModalWrapper title="Settings" modalName="showSettingsModal">
      <div className=" w-full mb-8 mt-6 flex flex-col justify-center items-center text-uitext text-2xl">
        <div className="w-full mb-3 flex flex-col justify-center items-center">
          <ToggleButton
            label="Show start screen"
            checked={startScreen}
            onChange={() =>
              updateVariableInLocalStorage(SETTING_START_SCREEN, !startScreen)
            }
          />
          <ToggleButton
            label="Show education"
            checked={educationMode}
            onChange={() =>
              updateVariableInLocalStorage(
                SETTING_EDUCATION_MODE,
                !educationMode,
              )
            }
          />
        </div>
        <div className="w-full mb-3 flex flex-col justify-center items-center">
          <ToggleButton
            label="Invert keys direction"
            checked={invertDirection}
            onChange={() =>
              updateVariableInLocalStorage(
                SETTING_INVERT_DIRECTION,
                !invertDirection,
              )
            }
          />
        </div>
        <div className="w-full mb-3 flex flex-col justify-center items-center">
          <ToggleButton
            label="Disable Animations"
            checked={disableAnimations}
            onChange={() =>
              updateVariableInLocalStorage(
                SETTING_DISABLE_ANIMATIONS,
                !disableAnimations,
              )
            }
          />
          <ToggleButton
            label="Disable Sound"
            checked={disableSounds}
            onChange={() =>
              updateVariableInLocalStorage(
                SETTING_DISABLE_SOUNDS,
                !disableSounds,
              )
            }
          />
          <ToggleButton
            label="Disable Music"
            checked={disableMusic}
            onChange={() =>
              updateVariableInLocalStorage(SETTING_DISABLE_MUSIC, !disableMusic)
            }
          />
        </div>
      </div>
    </ModalWrapper>
  );
};
