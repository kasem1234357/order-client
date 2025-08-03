import React, { useState } from "react";
import { cn } from "../../utils/utils";
import { Check } from "lucide-react";

type PropsType = {
  checkboxProps: React.HTMLProps<HTMLInputElement>;
  label?: string;
  customClassName?: string;
  isCustom?: boolean;
  name?: string;
  trigger?: (fieldName: string, value: any) => void;
  callBack?: (e: any, fun: any) => void;
};

const CheckBoxTable = ({
  label,
  checkboxProps,
  customClassName,
  isCustom = false,
  name,
  callBack,
  trigger,
}: PropsType) => {
  const [checked, setChecked] = useState(false);
  return (
    <div className="flex flex-row gap-1 relative">
      <input
        {...checkboxProps}
        type="checkbox"
        className={cn(
          "accent-primary  w-5",
          customClassName,
          isCustom && "peer absolute top-0 left-0 opacity-0"
        )}
        checked={checked}
      />
      {isCustom && (
        <label
          htmlFor={checkboxProps.name}
          className={cn(
            "w-5 h-5 cursor-pointer mx-auto  items-center justify-center border-[2px] border-primary dark:peer-checked:bg-primaryYellow dark:border  dark:border-primaryYellow  peer-checked:bg-primary-600 peer-checked:border-primary-600 hidden",
            isCustom &&
              "flex peer-checked:bg-primary peer-checked:border-primary"
          )}
          onClick={(e) => {
            setChecked(!checked);
            callBack && callBack(checked, setChecked);
            //@ts-ignore
            trigger && trigger(checkboxProps.name, !checkboxProps.checked);
          }}
        >
          {/* Checkmark Icon */}
          <Check
            width={15}
            height={15}
            className="text-white dark:text-primary "
            color="currentColor"
          />
        </label>
      )}
      {label && <label>{label}</label>}
    </div>
  );
};

export default CheckBoxTable;
