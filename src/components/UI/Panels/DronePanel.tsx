import { useMemo } from "react";
import { useGameStore } from "../../../store/store";
import { convertChunkCoordinateToName } from "../../../utils/functions";
import { BasicPanelWrapper } from "../BasicPanelWrapper";

export const DronePanel = () => {
  const opacity = useGameStore(
    (state) => state.uiPanelsState.supportPanels.opacity,
  );
  const autoPilot = useGameStore((state) => state.autoPilot);
  const canPlaceBeacon = useGameStore((state) => state.canPlaceBeacon);

  const selectedChunk = useGameStore((state) => state.selectedChunk);
  const selectedResource = useGameStore((state) => state.selectedResource);
  // const currentLocation = useGameStore((state) => state.currentLocation);

  const chunkName = useMemo(() => {
    return convertChunkCoordinateToName(selectedChunk);
  }, [selectedChunk]);

  const memoData = useMemo(() => {
    return [
      {
        title: "Selected Chunk:",
        value: chunkName,
      },
      {
        title: "Selected Resource:",
        value: selectedResource,
      },
      // {
      //   title: "Current Location:",
      //   value:
      //     Math.round(currentLocation.x) + ":" + Math.round(currentLocation.y),
      // },
    ];
  }, [chunkName, selectedResource]);

  return (
    <BasicPanelWrapper titleText="Drone:" styles="" opacity={opacity}>
      <div className="flex w-full flex-col items-center">
        <button
          className={`orbitron mx-3 my-2 flex items-center justify-center border border-uilines px-2 py-1 text-sm uppercase hover:opacity-70 ${autoPilot ? "bg-uilines text-neutral-900" : "text-uitext"}`}
          onClick={() => useGameStore.setState({ autoPilot: !autoPilot })}
        >
          Autopilot
        </button>
      </div>
      <div>Scaner: {canPlaceBeacon ? "Active" : "Inactive"}</div>
      {canPlaceBeacon &&
        memoData.map((data, index) => (
          <div
            className="list-selecting"
            key={index}
            onClick={() =>
              useGameStore.setState({
                message: `Scaner: ${data.title} ${data.value}`,
              })
            }
          >
            <div>{data.title}</div>
            <div>{data.value}</div>
          </div>
        ))}
    </BasicPanelWrapper>
  );
};
