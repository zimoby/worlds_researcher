import TypingText from "../../../effects/TextEffectsWrapper";
import { useGameStore } from "../../../store/store";

export const SystemMessagePanelAlt = () => {
  const message = useGameStore((state) => state.message);

  return (
    <div className=" m-3 size-fit max-w-72 border-l-4 border-uilines bg-black/50 pl-2 text-sm leading-4">
      <TypingText text={message} speed={50} />
    </div>
  );
};
