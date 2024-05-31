import { corpLogoSvg } from "../../../assets/CorpLogo";
import { useGameStore } from "../../../store/store";

export const CorpLogoPanel = () => {
  const opacity = useGameStore(
    (state) => state.uiPanelsState.supportPanels.opacity,
  );
  return (
    <div
      className="h-24 w-full border border-uilines text-xs  text-uitext"
      style={{ opacity }}
    >
      <div className="flex size-full items-center justify-center fill-uilines">
        {corpLogoSvg}
      </div>
    </div>
  );
};
