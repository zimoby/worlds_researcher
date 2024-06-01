import { useGameStore } from "../../../store/store";
import { BasicPanelWrapper } from "../BasicPanelWrapper";

export const CostsPanel = () => {
  const opacity = useGameStore(
    (state) => state.uiPanelsState.costsPanel.opacity,
  );
  const costs = useGameStore((state) => state.costs);
  const energy = useGameStore((state) => state.energy);
  const increaseBeconsLimit = useGameStore(
    (state) => state.increaseBeconsLimit,
  );
  const upgrade = useGameStore((state) => state.upgrade);
  const resourceCollectionLevel = useGameStore(
    (state) => state.resourceCollectionLevel,
  );
  const beaconsArmorLevel = useGameStore((state) => state.beaconsArmorLevel);
  const droneScanLevel = useGameStore((state) => state.droneScanLevel);

  return (
    <BasicPanelWrapper titleText="Costs:" styles="" opacity={opacity}>
      {Object.keys(costs).map((cost, index) => (
        <div
          key={index}
          className={` ${energy < costs[cost].value ? "cursor-pointer text-uitext opacity-50" : "list-selecting"}  flex w-full flex-row justify-between pr-4`}
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
      <div
        className="list-selecting flex w-full flex-row justify-between pr-4"
        onClick={() => upgrade("droneScan")}
      >
        <div className="w-2/3">Drone Scan Level:</div>
        <div className=" ml-2 w-1/4">{droneScanLevel}</div>
      </div>
      <div
        className="list-selecting flex w-full flex-row justify-between pr-4"
        onClick={() => upgrade("beaconsArmor")}
      >
        <div className="w-2/3">Beacons Armor Level:</div>
        <div className=" ml-2 w-1/4">{beaconsArmorLevel}</div>
      </div>
      <div
        className="list-selecting flex w-full flex-row justify-between pr-4"
        onClick={() => upgrade("resourceCollection")}
      >
        <div className="w-2/3">Beacons Collecting Level:</div>
        <div className=" ml-2 w-1/4">{resourceCollectionLevel}</div>
      </div>
    </BasicPanelWrapper>
  );
};
