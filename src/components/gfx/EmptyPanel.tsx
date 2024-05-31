import { useGameStore } from "../../store/store";

export const EmptyGrowPanel: React.FC = () => {
  const opacity = useGameStore(
    (state) => state.uiPanelsState.emptyPanel.opacity,
  );
  return (
    <div
      className=" aug-border-yellow-500 flex grow"
      data-augmented-ui={`border bl-clip tl-clip tr-clip --aug-border-bg`}
      style={{ opacity }}
    />
  );
};
