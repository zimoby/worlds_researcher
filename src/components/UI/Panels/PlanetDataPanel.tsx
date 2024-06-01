import { useMemo } from "react";
import { useGameStore } from "../../../store/store";
import { resourceTypes } from "../../../store/constants/worldConfig";
import {
  WorldNumberParamT,
  WorldParamsType,
  WorldStringParamT,
} from "../../../store/types";
import { BasicPanelWrapper } from "../BasicPanelWrapper";
import { parseColors } from "../../../utils/functions";

interface ParamProps {
  name: string;
  value: string | number;
  min?: number;
  max?: number;
}

const ParamComponent: React.FC<ParamProps> = ({ name, value, min, max }) => {
  const isNumber = typeof value === "number";
  const isDanger =
    isNumber &&
    min !== undefined &&
    max !== undefined &&
    (value >= max || value <= min);

  return (
    <div
      className="list-selecting flex w-full justify-between"
      onClick={() =>
        useGameStore.setState({ message: `Planet: ${name}: ${value}` })
      }
    >
      <div>
        {name}: {value}
      </div>
      {isDanger && (
        <div className="border border-uilines px-1 text-2xs uppercase">
          danger
        </div>
      )}
    </div>
  );
};

interface Color {
  color: [number, number, number];
}

interface ColorsArrayProps {
  colors: Color[];
}

const ColorsArray: React.FC<ColorsArrayProps> = ({ colors }) => {
  return (
    <div className=" ml-2 flex flex-row items-center justify-center space-x-1">
      {colors.map((color, index) => {
        return (
          <div
            key={index}
            className="size-3 rounded-full "
            style={{
              backgroundColor: `rgb(${color.color[0] * 255}, ${color.color[1] * 255}, ${
                color.color[2] * 255
              })`,
            }}
          />
        );
      })}
    </div>
  );
};

const paramNames: (keyof WorldParamsType)[] = [
  "seed",
  "worldState",
  "temperature",
  "humidity",
  "windSpeed",
  "pollution",
  "radiation",
];

export const PlanetDataPanel = () => {
  const opacity = useGameStore(
    (state) => state.uiPanelsState.planetPanel.opacity,
  );
  const worldParams = useGameStore((state) => state.worldParams);
  const weatherCondition = useGameStore((state) => state.weatherCondition);
  const terrainColors = useGameStore((state) => state.terrainColors);

  const parsedTerrainColors = useMemo(
    () => parseColors(terrainColors),
    [terrainColors],
  );
  const parsedResourcesColors = useMemo(() => parseColors(resourceTypes), []);

  return (
    <BasicPanelWrapper
      augUi=""
      styles="border border-uilines"
      titleText="Planet:"
      opacity={opacity}
    >
      <div className="w-full">
        {paramNames.map((paramName) => {
          const param = worldParams[paramName] as
            | WorldNumberParamT
            | WorldStringParamT;
          return (
            <ParamComponent
              key={paramName}
              name={param.name}
              value={param.value}
              min={(param as WorldNumberParamT).min}
              max={(param as WorldNumberParamT).max}
            />
          );
        })}
        <p className="list-selecting">Weather: {weatherCondition}</p>
        <div className="list-selecting flex flex-row justify-start">
          <p className="">Ground:</p>
          <ColorsArray colors={parsedTerrainColors as Color[]} />
        </div>
        <div className="list-selecting flex flex-row justify-start">
          <p className="">Resources:</p>
          <ColorsArray colors={parsedResourcesColors as Color[]} />
        </div>
      </div>
    </BasicPanelWrapper>
  );
};
