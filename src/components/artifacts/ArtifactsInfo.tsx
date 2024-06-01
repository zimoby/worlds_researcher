import { useGameStore } from "../../store/store";
import { convertChunkCoordinateToName } from "../../utils/functions";
import { BasicPanelWrapper } from "../UI/BasicPanelWrapper";
import { ARTIFACT_AMOUNT } from "../../store/constants/worldConfig";

export const ArtifactsInfo = () => {
  const artifacts = useGameStore((state) => state.artifacts);
  const opacity = useGameStore(
    (state) => state.uiPanelsState.collectedArtifactsPanel.opacity,
  );

  return (
    <BasicPanelWrapper
      height="h-32"
      width="w-fit"
      titleText={`Artifacts: ${artifacts.length} / ${ARTIFACT_AMOUNT}`}
      opacity={opacity}
    >
      <div className="size-full">
        {artifacts.length === 0 && "No artifacts"}
        {artifacts.slice(0, 100).map((artifact, index) => (
          <div
            key={index}
            className="list-selecting pr-4"
            onClick={() =>
              useGameStore.setState({ message: `Artifact: ${artifact.id}` })
            }
          >
            {index +
              1 +
              "." +
              convertChunkCoordinateToName({
                x: artifact.chunkX,
                y: artifact.chunkY,
              }) +
              ": " +
              artifact.chunkX +
              ":" +
              artifact.chunkY}
          </div>
        ))}
        <div className="h-5"></div>
      </div>
    </BasicPanelWrapper>
  );
};
