import { PlanetChunks } from "../Elements/planetChunks";
import { ModalWrapper } from "./templateComponents";

export const MapModal = () => {
  return (
    <ModalWrapper title="Map" modalName="showMapModal">
      <div className="w-full h-full flex justify-center items-center">
        <PlanetChunks size={21} hideControls={true} />
      </div>
    </ModalWrapper>
  );
};
