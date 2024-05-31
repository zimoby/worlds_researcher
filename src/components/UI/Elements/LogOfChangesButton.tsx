import { useGameStore } from "../../../store/store";
import { BigButtons } from "./BigButtons";

export const LogOfChanges = () => {
  const updateStoreProperty = useGameStore(
    (state) => state.updateStoreProperty,
  );
  const opacity = useGameStore(
    (state) => state.uiPanelsState.supportPanels.opacity,
  );

  return (
    <div style={{ opacity }}>
      <BigButtons
        text="Log of Changes"
        onClick={() => updateStoreProperty("showChangeLogModal", true)}
      />
    </div>
  );
};
