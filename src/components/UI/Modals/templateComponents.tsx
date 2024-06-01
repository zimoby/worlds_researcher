import { useEffect } from "react";
import { useGameStore } from "../../../store/store";
import { ModalName } from "../../../store/types";

interface ModalWrapperProps {
  children: React.ReactNode;
  title: string;
  modalName: ModalName;
}

export const ModalWrapper = ({
  children,
  title,
  modalName,
}: ModalWrapperProps) => {
  const showModal = useGameStore((state) => state[modalName]);
  const updateStoreProperty = useGameStore(
    (state) => state.updateStoreProperty,
  );

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        updateStoreProperty(modalName, false);
      }
    };
    if (showModal) {
      window.addEventListener("keydown", handleKeyPress);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [modalName, showModal, updateStoreProperty]);

  return (
    <div
      className="fixed z-50 flex size-full items-center justify-center bg-black/50"
      style={{ display: showModal ? "flex" : "none" }}
    >
      <div
        className="aug-border-yellow-500 relative flex h-fit w-96 flex-col border border-uilines bg-black/80"
        style={{
          maxHeight: "calc(100% - 10rem)",
        }}
        data-augmented-ui="border tl-2-clip-x br-2-clip-x --aug-border-bg"
      >
        <div className="flex items-center justify-end">
          <div
            className="flex size-8 cursor-pointer items-center justify-center text-uitext hover:bg-uilines hover:text-neutral-900"
            onClick={() => updateStoreProperty(modalName, false)}
          >
            <div className="rotate-45 text-center text-4xl">+</div>
          </div>
        </div>
        <div className="orbitron flex h-8 w-full items-center justify-center bg-uilines text-2xl text-neutral-900">
          {title}
        </div>
        {children}
      </div>
    </div>
  );
};
