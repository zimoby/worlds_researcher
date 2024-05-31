import { useEffect, useState } from "react";

import "./styles.css";

const backgroundSliderCalc = (
  value: number,
  minVal: number,
  maxVal: number,
): string => {
  const percent =
    maxVal === minVal ? 100 : ((value - minVal) / (maxVal - minVal)) * 100;
  return `linear-gradient(to right, var(--color-uitext) 0%, var(--color-uitext) ${percent}%, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.1) 100%)`;
};

interface SliderWithInputProps {
  label: string;
  value: number;
  min?: number;
  max?: number;
  step?: number;
  onUpdate: (value: number) => void;
}

interface CheckBoxProps {
  label: string;
  value: boolean;
  onUpdate: (value: boolean) => void;
}

export const CheckBox = ({ label, value, onUpdate }: CheckBoxProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdate(e.target.checked);
  };

  return (
    <div className="relative flex flex-row items-center justify-start text-xs">
      <div className="relative w-32 select-none truncate">{label}</div>
      <input
        type="checkbox"
        checked={value}
        onChange={handleChange}
        className="size-4 cursor-pointer appearance-none rounded-sm"
        style={{
          background: value
            ? "rgba(128, 0, 128, 0.7)"
            : "rgba(255, 255, 255, 0.1)",
        }}
      />
    </div>
  );
};

export const SliderWithInput = ({
  label,
  value,
  min = 1,
  max = 100,
  step = 1,
  onUpdate,
}: SliderWithInputProps) => {
  const [localValue, setLocalValue] = useState<number>(value);
  const [currentStep, setCurrentStep] = useState<number>(step);

  const handleStepChange = (e: React.KeyboardEvent<HTMLInputElement>) => {
    setCurrentStep(e.shiftKey ? step * 10 : step);
  };

  const allChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalValue(Number(e.target.value));
    onUpdate(Number(e.target.value));
  };

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  return (
    <div className="relative flex flex-col items-start justify-center space-y-0 text-xs">
      <div className="relative w-32 select-none truncate">{label}</div>
      <div className="flex w-full flex-row items-center justify-between space-x-1">
        <input
          className="mr-2 h-2 cursor-pointer appearance-none rounded-sm"
          style={{
            background: backgroundSliderCalc(localValue, min, max),
          }}
          type="range"
          min={min}
          max={max}
          value={localValue}
          step={currentStep}
          onChange={allChange}
          onKeyDown={handleStepChange}
          onKeyUp={handleStepChange}
        />
        <input
          className="m-0 h-full w-12 rounded-sm border-transparent bg-black/20 p-0 text-left text-xs text-uitext"
          min={min.toString()}
          max={max.toString()}
          step={currentStep.toString()}
          type="number"
          value={step >= 1 ? localValue.toFixed(0) : localValue.toFixed(1)}
          onChange={allChange}
          onKeyDown={handleStepChange}
          onKeyUp={handleStepChange}
        />
      </div>
    </div>
  );
};
