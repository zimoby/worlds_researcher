import { useGameStore } from "../../../store/store";
import { PanelNamesT } from "../../../store/types";
import { BigButtons } from "./BigButtons";

export const OpenModalButton = ({
  modalName,
  name,
  opacityName = "supportPanels",
}: {
  modalName: string;
  name: string;
  opacityName?: PanelNamesT;
}) => {
  const updateStoreProperty = useGameStore(
    (state) => state.updateStoreProperty,
  );
  const opacity = useGameStore(
    (state) => state.uiPanelsState[opacityName].opacity,
  );

  return (
    <div style={{ opacity }}>
      <BigButtons
        text={name}
        onClick={() => updateStoreProperty(modalName, true)}
      />
    </div>
  );
};
