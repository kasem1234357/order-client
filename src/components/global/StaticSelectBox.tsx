import  { useEffect, useState } from "react";

import { useSelector } from "react-redux";
import { UserSliceType } from "../../lib/redux/slices/userSlice";
import { optionsType } from "../global/MultiSelect";
import { selectStyle, selectTheme } from "../../styles/selectStyles";

import Select from "react-select";
import { useDebounce } from "../../hooks/useDebounce";

import CustomMenuList from "./AddGuestPlayerButton";
type Props = {
  field: any;
  setValue: any;
  name: string;
  position?: "auto" | "bottom" | "top";
  valueKey?: string;
  onChange: any;
  index?: number;
  dependOn?: any[];
  isDisabled?: boolean;
  excludedValues?: number[];
  selectedObject?: {
    id: number;
    name: string;
    booking_id?: number;
    isGuest?: boolean;
    price?: number;
  };
  requestFn: any;
  HasMenu?: boolean;
  extraParams?: any;
  isAllowToAutoUpdate?: boolean;
  turnOff?: boolean;
  onLoading?: any;
  numberOfGuestPlayers?: number;
  getValues?: any;
  onError?: any;
  hasGuestAction?: boolean;
  isCustomOption?: boolean;
  setNumberOfGuestUsers?: any;
  menuActionProps?: any;
  optionValueKey:string;
  labelKey:string
  options:{
    [key : string]:string,
    
  }[]
};

function StaticSelectBox({
  field,
  position,
  optionValueKey,
  labelKey,
  turnOff = false,
  setValue,
  getValues,
  excludedValues,
  HasMenu = false,
  menuActionProps = {},
  onLoading,
  isCustomOption = false,
  onError,
  index,
  isDisabled,
  numberOfGuestPlayers = 0,
  hasGuestAction = false,
  onChange,
  isAllowToAutoUpdate,
  requestFn,
  valueKey = "id",
  selectedObject,
  options,
  dependOn = [],
  setNumberOfGuestUsers,
  extraParams,
}: Props) {

 
  return (
    <Select
      menuPlacement={position || "auto"}
      components={
           {
              IndicatorSeparator: () => null,
            }
      }
      styles={{
        ...selectStyle,
        menuList: (provided) => ({
          ...provided,
          padding: "0",

          maxHeight: "200px",
          overflowY: "auto", // Enables scrolling

          scrollbarWidth: "inherit", // For Firefox
          "&::-webkit-scrollbar": {
            width: "7px",
            height: "7px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#fff", // Scrollbar color
            borderRadius: "10px", // Scrollbar shape
            border: "2px",
            borderStyle: "solid",
            borderColor: "#d8d7d7",
            position: "absolute",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            //backgroundColor: "#555", // Hover color
          },
          "&::-webkit-scrollbar-track": {
            background: "#f3f3f3",
            borderRadius: "10px", // Track color
          },

          "&::-webkit-scrollbar-button": {
            display: "none",
          },
        }),
      }}
      classNamePrefix="react-select "
      theme={selectTheme}
      {...field}
      isDisabled={isDisabled}
      options={options}
      getOptionLabel={(option: any) => option?.[labelKey]}
      getOptionValue={(option: any) => option?.[optionValueKey]}
      onChange={onChange}
      
      
      value={
        options.find((option:any) => {
          //
          //

          return option?.[optionValueKey] === field.value;
        }) || null
      }
      hideSelectedOptions={false}
      isSearchable={true}

      // isClearable={true}
    />
  );
}

export default StaticSelectBox;
