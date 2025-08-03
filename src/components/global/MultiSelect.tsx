import React, { useEffect } from "react";
import { cn } from "../../utils/utils";
import useOutsideClick from "../../hooks/useOutsideClick";
import CheckBox from "./CheckBox";

export type optionsType = {
  [key: string]: string | number;
};

type Props = {
  modelBoolean: boolean;
  options: optionsType[];
  name?: string;
  title: string;
  selectedValue: optionsType[];
  setSelectedValue: React.Dispatch<React.SetStateAction<optionsType[]>>;
  setModelBoolean: React.Dispatch<React.SetStateAction<boolean>>;
  customClass?: string;
  labelKey?: string;
  valueKey?: string;
  direction?: "up" | "down";
  closeEvent?: (value: any[], name: string) => void;
};

function MultiSelect({
  modelBoolean,
  options,
  title,
  selectedValue,
  setSelectedValue,
  setModelBoolean,
  customClass,
  labelKey = "title",
  valueKey = "value",
  direction = "down",
  closeEvent,
  name = "",
}: Props) {
  const divRef = React.useRef<HTMLDivElement>(null);

  useOutsideClick(divRef, () => {
    setModelBoolean(false);
  });

  useEffect(() => {
    if (closeEvent) {
      closeEvent(selectedValue, name);
    }
  }, [modelBoolean]);

  const toggleSelection = (item: optionsType) => {
    const isSelected = selectedValue.some(
      (selected) => selected[valueKey] === item[valueKey]
    );

    if (isSelected) {
      setSelectedValue((prev) =>
        prev.filter((selected) => selected[valueKey] !== item[valueKey])
      );
    } else {
      setSelectedValue((prev) => [...prev, item]);
    }
  };

  return (
    <div
      ref={divRef}
      className={cn(
        `w-full border h-fit text-sm border-gray-300 text-[#747474] visible p-3 outline-none relative bg-white rounded-t-md
        transition duration-500 ease-in-out inline-block
        cursor-pointer border-b-0 z-50`,
        !modelBoolean && "border-b rounded-b-md",
        customClass,
        direction === "up" ? "border-b rounded-b-md" : ""
      )}
    >
      <p
        className="h-fit min-h-[15px]  text-primary dark:text-white"
        onClick={() => setModelBoolean((prev) => !prev)}
      >
        {selectedValue.length > 0
          ? selectedValue.map((item) => item[labelKey]).join(", ")
          : title}
      </p>

      <div
        className={cn(
          `absolute z-50 -left-[1px] select-items-box customScroll p-2`,
          modelBoolean ? "active-select border text-sm border-gray-300" : "",
          modelBoolean && direction === "up"
            ? "bottom-[35px] border border-t border-t-gray-300"
            : "border-t-0 top-[35px]"
        )}
        style={{
          borderTop:
            modelBoolean && direction === "up" ? "1px solid #d1d5db " : "",
          borderTopRightRadius: modelBoolean && direction === "up" ? "8px" : "",
          borderTopLeftRadius: modelBoolean && direction === "up" ? "8px" : "",
        }}
      >
        {modelBoolean &&
          options.map((item) => {
            const value = item[valueKey];
            const label = item[labelKey];
            const isSelected = selectedValue.some(
              (selected) => selected[valueKey] === value
            );

            return (
              <div key={value} onClick={() => toggleSelection(item)}>
                <p
                  className={cn(
                    "p-2 border-b flex gap-2 border-b-[#f3f3f3]",
                    isSelected && "bg-[#f3f3f3] border-b-[#fff]"
                  )}
                >
                  <CheckBox checkboxProps={{ checked: isSelected }} /> {label}
                </p>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default MultiSelect;
