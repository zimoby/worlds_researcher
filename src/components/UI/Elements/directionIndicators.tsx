import { useGameStore } from "../../../store/store";
import { movementDirections } from "../../../store/constants/worldConfig";

export const DirectionIndicators = () => {
  const moveDirection = useGameStore((state) => state.moveDirection);
  const opacity = useGameStore(
    (state) => state.uiPanelsState.supportPanels.opacity,
  );

  const handleDirectionClick = (direction: number) => {
    useGameStore.setState({ moveDirection: movementDirections[direction] });
  };

  return (
    <div className="mx-6 my-4" style={{ opacity }}>
      <div className="grid size-12 -rotate-45 grid-cols-2">
        {movementDirections.map((direction, index) => (
          <div
            key={index}
            className={`flex size-5 cursor-pointer items-center justify-center border border-uilines bg-neutral-900 text-2xs uppercase hover:bg-uilines hover:text-neutral-900 ${
              moveDirection.x === direction.x && moveDirection.y === direction.y
                ? "bg-uilines text-neutral-900"
                : "text-uitext"
            }`}
            onClick={() => handleDirectionClick(index)}
          >
            <p className="rotate-45">{direction.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
