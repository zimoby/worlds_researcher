import { MouseEventHandler } from "react";

export const ToggleButton = ({
  onClick,
  state,
  text,
}: {
  onClick: MouseEventHandler<HTMLButtonElement>;
  state: boolean;
  text: string;
}) => {
  return (
    <button
      className={`size-fit border px-2 text-sm ${
        state ? "bg-red-700" : ""
      }  cursor-pointer  uppercase hover:border-yellow-400 hover:bg-yellow-400  hover:text-neutral-900`}
      onClick={onClick}
    >
      {text}: {state ? "off" : "on"}
    </button>
  );
};
