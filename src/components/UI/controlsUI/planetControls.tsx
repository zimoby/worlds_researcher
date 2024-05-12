// import { useSpring, animated, easings } from "@react-spring/web";
// import { useState } from "react";
import { SliderWithInput, CheckBox } from "./uiLibrary";
// import useMeasure from "react-use-measure";
import { useGameStore } from "../../../store";
import { BasicPanelWrapper } from "../BasicPanelWrapper";

export const SystemControls = () => {
  // const [ref, bounds] = useMeasure();
  // const [show, setShow] = useState(true);

  const updateMapParam = useGameStore((state) => state.updateMapParam);
  const mapWidth = useGameStore((state) => state.mapParams.width);
  const mapDepth = useGameStore((state) => state.mapParams.depth);
  const mapResolution = useGameStore((state) => state.mapParams.resolution);
  const mapSpeed = useGameStore((state) => state.mapParams.speed);
	const disableAnimations = useGameStore((state) => state.disableAnimations);
  const updateDisableAnimationsInStorage = useGameStore((state) => state.updateDisableAnimationsInStorage);

  const opacity = useGameStore((state) => state.uiPanelsState.systemControlsPanel.opacity);

	// const updateStoreProperty = useGameStore((state) => state.updateStoreProperty);

  // const animation = useSpring({
  //   from: { height: 0 },
  //   to: { height: show ? bounds.height : 0 },
  //   config: {
  //     duration: 350,
  //     easing: easings.easeOutCubic,
  //   },
  // });

  return (
    <div className="absolute z-50 top-0 right-0 m-2 ">
      {/* <div
        className="absolute -top-3 -left-1 font-sans text-lg -m-2 select-none cursor-pointer text-red-600 hover:scale-150 hover:text-neutral-50"
        onClick={() => setShow(!show)}
      >
        +
      </div> */}
      {/* <animated.div style={{ overflow: "hidden", ...animation }}> */}
        {/* <div ref={ref} className=""> */}
          <BasicPanelWrapper titleText="System Controls" opacity={opacity}> 
            <div
              className="w-fit space-y-1 bg-black/20 py-1 px-2 divide-y divide-white/40 rounded-md"
            >
              <div className=" space-y-1 pt-1 pb-1">
                <SliderWithInput
                  label="Map Width"
                  value={mapWidth}
                  max={200}
                  onUpdate={(e) => updateMapParam("width", e)}
                />
                <SliderWithInput
                  label="Map Depth"
                  value={mapDepth}
                  max={200}
                  onUpdate={(e) => updateMapParam("depth", e)}
                />
                <SliderWithInput
                  label="Resolution"
                  value={mapResolution}
                  max={10}
                  onUpdate={(e) => updateMapParam("resolution", e)}
                />
                <SliderWithInput
                  label="Speed"
                  value={mapSpeed}
                  min={0}
                  max={0.5}
                  step={0.01}
                  onUpdate={(e) => updateMapParam("speed", e)}
                />
              </div>
              <div className="space-y-1 pt-2">
                {/* <div className="w-72 space-y-1 pt-1 flex flex-wrap justify-between"> */}
                <CheckBox
                  label="Disable Animations"
                  value={disableAnimations}
                  // onUpdate={() => updateStoreProperty("disableAnimations", !disableAnimations)}
                  onUpdate={() => updateDisableAnimationsInStorage(!disableAnimations)}

                />
              </div>
            </div>
          </BasicPanelWrapper>
        {/* </div> */}
      {/* </animated.div> */}
    </div>
  );
};