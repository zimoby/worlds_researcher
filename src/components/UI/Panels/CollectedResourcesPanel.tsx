import { useMemo, useState } from "react";
import { useGameStore } from "../../../store/store";
import { numberSimplified, parseColors } from "../../../utils/functions";
import { BasicPanelWrapper } from "../BasicPanelWrapper";
import { resourceTypes } from "../../../store/constants/worldConfig";

export const CollectedResourcesPanel = () => {
  const opacity = useGameStore(
    (state) => state.uiPanelsState.collectedResourcesPanel.opacity,
  );
  const collectedResources = useGameStore((state) => state.collectedResources);
  const [hoveredResource, setHoveredResource] = useState<string | null>(null);

  const parsedResourcesColors = useMemo(() => parseColors(resourceTypes), []);

  return (
    <BasicPanelWrapper titleText="Collected Resources:" opacity={opacity}>
      <div className="m-0 flex w-full flex-wrap items-center justify-center p-1">
        {Object.entries(collectedResources).map(([resource, count], index) => (
          <div
            key={resource}
            className="flex w-1/2 flex-col items-center justify-start text-center"
            onMouseEnter={() => setHoveredResource(resource)}
            onMouseLeave={() => setHoveredResource(null)}
            style={{
              backgroundColor:
                hoveredResource && hoveredResource === resource
                  ? `rgba(${parsedResourcesColors[index].color[0] * 255} ${parsedResourcesColors[index].color[1] * 255} ${
                      parsedResourcesColors[index].color[2] * 255
                    })`
                  : "transparent",
            }}
            onClick={() =>
              useGameStore.setState({
                message: `Collected Resources: ${resource}: ${count}`,
              })
            }
          >
            <div className="orbitron text-xl">{numberSimplified(count)}</div>
            <div className=" text-xs leading-3">{resource}</div>
          </div>
        ))}
      </div>
    </BasicPanelWrapper>
  );
};
