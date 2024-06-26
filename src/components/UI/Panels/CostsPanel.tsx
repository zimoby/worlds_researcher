import { useGameStore } from "../../../store/store";
import { BasicPanelWrapper } from "../BasicPanelWrapper";

export const CostsPanel = () => {
  const opacity = useGameStore(
    (state) => state.uiPanelsState.costsPanel.opacity,
  );
  const costs = useGameStore((state) => state.costs);
  const playerPoints = useGameStore((state) => state.playerPoints);
  const increaseBeconsLimit = useGameStore(
    (state) => state.increaseBeconsLimit,
  );

  return (
    <BasicPanelWrapper titleText="Costs:" styles="" opacity={opacity}>
      {Object.keys(costs).map((cost, index) => (
        <div
          key={index}
          className={` ${playerPoints < costs[cost].value ? "cursor-pointer text-uitext opacity-50" : "list-selecting"}  flex w-full flex-row justify-between pr-4`}
          onClick={() => {
            if (cost === "extendBeaconLimits") {
              increaseBeconsLimit();
            }
            useGameStore.setState({ message: `Cost: ${costs[cost].name}` });
          }}
        >
          <div className="w-2/3">{costs[cost].name}:</div>
          <div className=" ml-2 w-1/4">
            {costs[cost].value + (costs[cost].valueAlt ?? "")}
          </div>
        </div>
      ))}
    </BasicPanelWrapper>
  );
};
