import React from "react";
import { cn } from "../../utils/utils";
import { Check } from "lucide-react";

type PropsType = {
  checkboxProps: React.HTMLProps<HTMLInputElement>;
  label?: string;
  customClassName?: string;
  isCustom?: boolean;
  customeCheckBoxClass?: string;
  isDisabled?:boolean;
  labelStyle?:string;
  name?: string;
  trigger?: (fieldName: string, value: any) => void;
};

const CheckBox = ({
  label,
  customeCheckBoxClass,
  checkboxProps,
  labelStyle = '',
  customClassName,
  isDisabled=false,
  isCustom = false,
  name,
  trigger,
}: PropsType) => {
  return (
    <div className="flex flex-row gap-1 relative items-center">
      <input
        {...checkboxProps}
        type="checkbox"
        className={cn(
          "accent-primary dark:accent-primaryYellow",
          customClassName,

          isCustom && "peer absolute top-0 left-0 opacity-0"
        )}
      />
      {isCustom && (
        <label
          htmlFor={checkboxProps.name}
          className={cn(
            "w-4 h-4  cursor-pointer mx-auto dark:peer-checked:bg-primaryYellow dark:border dark:border-primaryYellow  items-center justify-center border-[2px] border-primary  peer-checked:bg-primary-600 peer-checked:border-primary-600 hidden",
            isCustom &&
              "flex peer-checked:bg-primary peer-checked:border-primary",
            customeCheckBoxClass
          )}
          onClick={() => {
            if(isDisabled){
              return
            }
            console.log(checkboxProps.checked);
            
            //@ts-ignore
            trigger && trigger(checkboxProps.name, !checkboxProps.checked);
          }}
        >
          {/* Checkmark Icon */}
          <Check
            width={15}
            height={15}
            className="text-white dark:text-primary"
            color="currentColor"
          />
        </label>
      )}
      {label && <label className={labelStyle}>{label}</label>}
    </div>
  );
};

export default CheckBox;
