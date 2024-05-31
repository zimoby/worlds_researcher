import { BasicPanelWrapper } from "../BasicPanelWrapper";

export const BigButtons = ({
  text,
  onClick,
}: {
  text: string;
  onClick: () => void;
}) => {
  return (
    <BasicPanelWrapper
      styles="hover:bg-uilines h-12"
      augUi={`border tl-clip br-clip --aug-border-bg`}
    >
      <button
        className=" orbitron size-full cursor-pointer text-center text-base text-uitext hover:text-neutral-900"
        onClick={onClick}
      >
        {text}
      </button>
    </BasicPanelWrapper>
  );
};
