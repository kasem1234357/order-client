import React, { useState } from "react";
import Input from "./Input";
import DropDownBox from "../custom/DropDownBox/DropDownBox";
import { generateMenu } from "../../utils/MenuGenerator";
import { DayPicker, getDefaultClassNames } from "react-day-picker";
import "react-day-picker/style.css";
import { ImgIcon } from "../../utils/utils";
import useOutsideClick from "../../hooks/useOutsideClick";
import CalendarIcon from "../../assets/icons/CalendarIcon";

type Props = {
  field: any;
  name: string;
  isDisabled?: boolean;
  label?: string;
  isRequired?: boolean;
  disabledBefore?: string;
  disabledAfter?: string;
};

function MultipleDate({
  field,
  name,
  isDisabled,
  label,
  isRequired = false,
  disabledBefore,
  disabledAfter,
}: Props) {
  const [selected, setSelected] = React.useState<Date[] | undefined>();
  const [openModel, setOpenModel] = useState<boolean>(false);
  const formatDate = (date: Date) => {
    const options = { day: "numeric", month: "short", year: "numeric" };
    //@ts-ignore
    return date.toLocaleDateString("en-GB", options); // e.g., "1 Jan 2025"
  };
  const handleDisabledState = () => {
    if (isDisabled) {
      return true;
    }
    if (disabledBefore && disabledAfter) {
      return {
        before: new Date(disabledBefore),
        after: new Date(disabledAfter),
      };
    }
    if (disabledBefore) {
      return { before: new Date(disabledBefore) };
    }
    if (disabledAfter) {
      return { after: new Date(disabledAfter) };
    }
  };
  const calenderMenu = [
    {
      name: "Date",
      type: "date",
      action: "setDate",
      icon: CalendarIcon,
      tag: "calender",
      color: "text-primary dark:text-white",
    },
  ];
  const menu = generateMenu(
    calenderMenu,
    {},
    {
      calender: {
        component: () => {
          return (
            <div>
              <DayPicker
                mode="multiple"
                captionLayout="dropdown"
                disabled={handleDisabledState()}
                selected={field?.value?.map((date: string) =>
                  formatDate(new Date(date))
                )}
                onSelect={(date) => {
                  //@ts-ignore
                  field.onChange(
                    //@ts-ignore
                    date.map((dateItem: string) =>
                      formatDate(new Date(dateItem))
                    )
                  );
                }}
              />
            </div>
          );
        },
      },
    }
  );
  const divRef = React.useRef<HTMLDivElement>(null);
  useOutsideClick(divRef, () => setOpenModel(false));
  return (
    <div className="relative" ref={divRef}>
      <Input
        inputProps={{
          ...field,
          type: "text",
          readOnly: true,
          value: field.value ? field.value.join(" | ") : "",
          onClick: () => {
            setOpenModel(true);
          },
          style: { cursor: "pointer", outline: "none" },
        }}
        customClass={`${isDisabled && "bg-[#f3f3f3] cursor-not-allowed"}`}
        label={label || "Date"}
        isRequired={isRequired}
      />
      {openModel && menu && (
        <DropDownBox
          dropDownConfig={menu}
          className="w-[330px] left-0  pr-4 top-[105%] dark:bg-primary font-bold text-primary dark:text-white"
          title=""
          closeDropDown={() => {}}
        />
      )}
    </div>
  );
}

export default MultipleDate;
