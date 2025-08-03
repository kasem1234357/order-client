import React from "react";
import { cn } from "../../utils/utils";

type RadioInputProps = {
  value: string;
  label: string;
  checked: boolean;
  onChange: (value: string) => void;
  customeStyle?: string;
  labelStyle?: string;
  isDisabled?: boolean;
  name?:string
};

const RadioInput = ({
  value,
  label,
  checked,
  isDisabled,
  onChange,
  customeStyle,
  name,
  labelStyle,
}: RadioInputProps) => {
  return (
    <div className="flex flex-row gap-2 justify-center items-center">
      <input
        className={`${customeStyle} accent-primary w-4 h-4`}
        name={name||''}
        type="radio"
        value={value}
        disabled={isDisabled}
        checked={checked}
        onChange={() => onChange(value)}
      />
      <label
        className={cn(
          "text-sm text-[#66666659] text-primary dark:text-white",
          labelStyle
        )}
      >
        {label}
      </label>
    </div>
  );
};

export default RadioInput;
