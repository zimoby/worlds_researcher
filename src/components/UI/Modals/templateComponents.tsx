import { useEffect } from "react";
import { useGameStore } from "../../../store/store";
import { ModalName } from "../../../store/gameStateSlice";

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
      className="fixed w-full h-full flex justify-center items-center z-50 bg-black/50"
      style={{ display: showModal ? "flex" : "none" }}
    >
      <div
        className="relative bg-black/80 w-96 h-fit flex flex-col border border-uilines aug-border-yellow-500"
        style={{
          maxHeight: "calc(100% - 10rem)",
        }}
        data-augmented-ui="border tl-2-clip-x br-2-clip-x --aug-border-bg"
      >
        <div className="flex justify-end items-center">
          <div
            className="flex justify-center items-center size-8 text-uitext cursor-pointer hover:bg-uilines hover:text-neutral-900"
            onClick={() => updateStoreProperty(modalName, false)}
          >
            <div className="text-4xl rotate-45 text-center">+</div>
          </div>
        </div>
        <div className="orbitron w-full h-8 flex justify-center bg-uilines items-center text-neutral-900 text-2xl">
          {title}
        </div>
        {children}
      </div>
    </div>
  );
};
