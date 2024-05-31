import { FlickeringHtmlEffect } from "../../../effects/AppearingUiEffectWrapper";
import { useGameStore } from "../../../store/store";

export const SimpleWarningLines = ({
  classes,
  size = "",
}: {
  classes?: string;
  size?: string;
}) => {
  const opacity = useGameStore(
    (state) => state.uiPanelsState.emptyPanel.opacity,
  );
  return (
    <div
      className={`warning-sign3 ${classes} flex ${
        size === "" ? "grow" : size
      } aug-border-yellow-500`}
      data-augmented-ui={`border br-clip-x --aug-border-bg`}
      style={{ opacity }}
    />
  );
};

export const WarningBlock = () => {
  const weather = useGameStore((state) => state.weatherCondition);
  const opacity = useGameStore(
    (state) => state.uiPanelsState.supportPanels.opacity,
  );

  return (
    <>
      {weather.toLowerCase() === "severe" && (
        <FlickeringHtmlEffect>
          <div
            className="aug-border-yellow-500 fixed top-0 z-20 flex h-14 w-fit animate-pulse flex-row"
            style={{
              top: "calc(-50vh + 90px)",
              left: "-150px",
              opacity,
            }}
            data-augmented-ui="border bl-clip-x br-clip-x --aug-border-bg"
          >
            <div className="relative flex h-full w-fit flex-row">
              <div className="absolute z-30 flex size-full items-center justify-center ">
                <div
                  className="orbitron aug-border-yellow-500 bg-neutral-900  px-6 py-1 text-center text-sm uppercase text-white"
                  data-augmented-ui="border bl-clip br-clip --aug-border-bg"
                >
                  danger weather
                </div>
              </div>
              <WarningLines direction="xy" />
              <WarningLines direction="y" />
            </div>
          </div>
        </FlickeringHtmlEffect>
      )}
    </>
  );
};

const WarningLines = ({ direction }: { direction: string; width?: number }) => {
  let scaleInvert = "";
  if (direction === "xy") {
    scaleInvert = "-scale-x-100 -scale-y-100";
  } else if (direction === "y") {
    scaleInvert = "-scale-y-100";
  } else if (direction === "x") {
    scaleInvert = "-scale-x-100";
  }

  return (
    <div
      className={`h-full w-[150px] overflow-hidden bg-uilines ${scaleInvert}`}
    >
      <div
        className={`flex h-full w-[300px] animate-linear flex-col items-center justify-center bg-repeat-x`}
        style={{
          background:
            "repeating-linear-gradient(-45deg, transparent, transparent 20px, black 20px, black 40px)",
        }}
      />
    </div>
  );
};
