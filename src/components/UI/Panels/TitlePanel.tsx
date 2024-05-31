import { useGameStore } from "../../../store/store";

export const TitlePanel = () => {
  const uiPanelsState = useGameStore((state) => state.uiPanelsState);
  const worldParams = useGameStore((state) => state.worldParams);

  return (
    <div
      className="flex h-16 w-80 flex-wrap items-end justify-end border border-uilines bg-neutral-900 px-1 text-xs text-uitext"
      style={{ opacity: uiPanelsState.titlePanel.opacity }}
    >
      <div className="orbitron h-fit w-full content-end px-1 text-end text-2xl uppercase leading-6 text-uitext">
        {`Planet-${worldParams.seed.value}`}
      </div>
    </div>
  );
};
