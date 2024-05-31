import { useGameStore } from "../../store/store";

export const DroneMoveAngleUI = () => {
  const droneMoveAngle = useGameStore((state) => state.droneMoveAngle);
  const opacity = useGameStore(
    (state) => state.uiPanelsState.supportPanels.opacity,
  );

  return (
    <div
      className="relative mx-1 my-5 size-16 rounded-full border border-uilines bg-neutral-900"
      style={{ opacity }}
    >
      <div className="absolute left-1/2 top-1/2 w-full origin-left -translate-x-1/2 border border-uilines bg-uilines opacity-20" />
      <div className="absolute left-1/2 top-1/2 w-full origin-top -translate-x-1/2 rotate-90 border border-uilines bg-uilines opacity-20" />
      <div
        className="absolute left-1/2 top-1/2 w-full origin-left border border-uilines bg-uilines"
        style={{
          transform: `rotate(${-droneMoveAngle}deg) translateX(-50%) scaleX(1)`,
        }}
      >
        <div className="absolute left-1/2 top-1/2 w-full origin-top -translate-x-1/2 translate-y-2 scale-75 border border-uilines bg-uilines opacity-50" />
        <div className="absolute left-1/2 top-1/2 w-full origin-top -translate-x-1/2 -translate-y-2 scale-75 border border-uilines bg-uilines opacity-50" />
      </div>
      <div className=" size-full scale-125 rounded-full border border-uilines opacity-20" />
      <p className=" mt-2 size-full text-center font-mono text-xs text-uitext">
        {-droneMoveAngle}°
      </p>
    </div>
  );
};
