import { useGameStore } from "../../../store/store";
import {
  GROUND_MAX_LEVEL,
  GROUND_MIN_LEVEL,
} from "../../../store/constants/worldConfig";

export const LevelsIndicators = () => {
  const activePosition = useGameStore((state) => state.activePosition);
  const { width, depth } = useGameStore((state) => state.mapParams);
  const opacity = useGameStore(
    (state) => state.uiPanelsState.supportPanels.opacity,
  );

  const posHeightRange = Math.max(
    0,
    Math.min(
      100,
      (activePosition.y - 1 - GROUND_MIN_LEVEL) *
        (100 / (GROUND_MAX_LEVEL - GROUND_MIN_LEVEL)),
    ),
  );

  const posWidthRange = activePosition.x * (100 / width) + 50;
  const posDepthRange = activePosition.z * (100 / depth) + 50;

  return (
    <div className=" mr-1" style={{ opacity }}>
      <div className="flex flex-row gap-2">
        <div className="flex w-3 flex-col items-center justify-center space-y-1">
          <p className="text-xs text-uitext">X</p>
          <div
            className=" h-28 w-3 border border-uilines"
            style={{
              background: `linear-gradient( to top, var(--color-uilines) 0%, var(--color-uilines) ${posWidthRange}%, rgba(255, 255, 255, 0) ${posWidthRange}%)`,
            }}
          />
          <div className=" text-center font-mono text-2xs text-uitext">
            {Math.round(activePosition.x)}
          </div>
        </div>
        <div className="flex w-3 flex-col items-center justify-center space-y-1">
          <p className="text-xs text-uitext">Y</p>
          <div
            className=" h-28 w-3 border border-uilines"
            style={{
              background: `linear-gradient( to top, var(--color-uilines) 0%, var(--color-uilines) ${posDepthRange}%, rgba(255, 255, 255, 0) ${posDepthRange}%)`,
            }}
          />
          <div className=" text-center font-mono text-2xs text-uitext">
            {Math.round(activePosition.y)}
          </div>
        </div>
        <div className="flex w-3 flex-col items-center justify-center space-y-1">
          <p className="text-xs text-uitext">Z</p>
          <div
            className=" h-28 w-3 border border-uilines"
            style={{
              background: `linear-gradient( to top, var(--color-uilines) 0%, var(--color-uilines) ${posHeightRange}%, rgba(255, 255, 255, 0) ${posHeightRange}%)`,
            }}
          />
          <div className=" text-center font-mono text-2xs text-uitext">
            {Math.round(activePosition.z)}
          </div>
        </div>
      </div>
    </div>
  );
};
