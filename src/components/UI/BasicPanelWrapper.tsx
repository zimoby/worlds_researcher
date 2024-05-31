import { ModalName } from "../../store/gameStateSlice";
import { useGameStore } from "../../store/store";

export const BasicPanelWrapper = ({
  children,
  titleText = "",
  width = "w-48",
  height = "h-fit",
  styles = "",
  opacity = 1,
  augUi = "border br-clip --aug-border-bg",
  titleModalAction,
}: {
  children: React.ReactNode;
  titleText?: string;
  width?: string;
  height?: string;
  styles?: string;
  opacity?: number;
  augUi?: string;
  list?: boolean;
  titleModalAction?: ModalName;
}) => {
  const toggleModal = useGameStore((state) => state.toggleModal);

  const titleAction = () => {
    if (titleModalAction !== undefined) {
      toggleModal(titleModalAction);
    }
  };

  return (
    <div
      className={`${styles} ${height} ${width} aug-border-yellow-500 relative overflow-hidden bg-neutral-900/50 p-0 text-left text-xs`}
      style={{ opacity: opacity }}
      data-augmented-ui={`${augUi}`}
    >
      <button
        className={`orbitron flex h-fit w-full select-none items-center justify-start bg-uilines px-1 text-neutral-900 ${titleModalAction === undefined ? "cursor-default" : "cursor-pointer hover:bg-neutral-900 hover:text-uitext"}`}
        onClick={titleAction}
      >
        {titleText}
      </button>
      <div className="scrollbar size-full p-1 text-uitext">{children}</div>
    </div>
  );
};
