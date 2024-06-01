import { useGameStore } from "../../../store/store";
import { BasicPanelWrapper } from "../BasicPanelWrapper";

export const ResourceDistributionPanel = () => {
  const collectedResources = useGameStore((state) => state.collectedResources);

  const totalResources = Object.values(collectedResources).reduce(
    (sum, count) => sum + count,
    0,
  );

  const resourcePercentages = Object.entries(collectedResources).map(
    ([resource, count]) => {
      const percentage =
        totalResources > 0 ? (count / totalResources) * 100 : 0;
      return { resource, percentage };
    },
  );

  return (
    <BasicPanelWrapper titleText="Resource Distribution">
      {resourcePercentages.map(({ resource, percentage }) => (
        <div key={resource} className="flex justify-between">
          <span>{resource}</span>
          <span>{percentage.toFixed(2)}%</span>
        </div>
      ))}
    </BasicPanelWrapper>
  );
};

export const BeaconManagementPanel = () => {
  const beacons = useGameStore((state) => state.beacons);

  const handleRemoveBeacon = (beaconId: string) => {
    useGameStore.setState((state) => ({
      beacons: state.beacons.filter((beacon) => beacon.id !== beaconId),
    }));
  };

  return (
    <BasicPanelWrapper titleText="Beacon Management">
      {beacons.map((beacon) => (
        <div key={beacon.id} className="flex items-center justify-between">
          <span>Beacon {beacon.id}</span>
          <div>
            <button onClick={() => handleRemoveBeacon(beacon.id)}>
              Remove
            </button>
          </div>
        </div>
      ))}
    </BasicPanelWrapper>
  );
};
