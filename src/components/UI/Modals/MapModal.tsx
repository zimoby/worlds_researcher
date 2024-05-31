import { MiniMap } from "../Elements/planetChunks";
import { ModalWrapper } from "./templateComponents";

export const MapModal = () => {
  return (
    <ModalWrapper title="Map" modalName="showMapModal">
      <div className="flex size-full items-center justify-center">
        <MiniMap size={21} hideControls={true} />
      </div>
    </ModalWrapper>
  );
};
