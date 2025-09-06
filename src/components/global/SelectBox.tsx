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
};

function SelectBox({
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
  dependOn = [],
  setNumberOfGuestUsers,
  extraParams,
}: Props) {
  const selectedClub = useSelector(
    (state: UserSliceType) => state.user.selectedClub
  );
  // console.log(selectedObject);
  // console.log(excludedValues);

  const [query, setQuery] = useState<string>("");
  const debouncedQuery = useDebounce(query);
  const [isHaveGuestPlayer, setIsHaveGuestPlayer] = useState(false);
  const [isEmptyOption, setIsEmptyOption] = useState(false);
  //@ts-ignore
  const [options, setOptions] = useState<optionsType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const {
    data,
    isSuccess,
    isError,
    refetch,
    isLoading,
    isUninitialized,
    isFetching,
    error,
  } = requestFn(
    { name: debouncedQuery, club_id: selectedClub, ...extraParams },
    { skip: !loading }
  );

  useEffect(() => {
    //   setOptions(selectedServices)
    if (!turnOff) {
      setLoading(true);
    }
  }, [selectedClub, turnOff, ...dependOn]);
  //  useEffect(() => {
  //   setLoading(true);
  //   // console.log(!isUninitialized );
  //   // console.log(dependOn);

  //   // if(!isUninitialized && isSuccess){
  //   //   console.log('test');
  //   //   if(((isSuccess && data)) && !isLoading && !isError ) {
  //   //     console.log('test');

  //   //     setLoading(true);
  //   //     refetch();
  //   //   }
  //   // }else{
  //   //   if(isError && !turnOff){
  //   //     setLoading(true)
  //   //   }
  //   // }

  //  },[...dependOn])

  useEffect(() => {
    if (isSuccess && data && !isLoading && !isFetching && !isError) {
      console.log(data);
      
      const fetchedValues = data.data.map((item: optionsType) => item);
      //@ts-ignore
      if (data.data.length === 0) {
        setIsEmptyOption(true);
      }
     setOptions(fetchedValues)

      //setLoading(false);
      console.log(isSuccess, data, isLoading, isError, isUninitialized);
    }
  }, [isSuccess, data, isLoading, isFetching, isError]);
  useEffect(() => {
    if (isFetching || isLoading) {
      setOptions([]);
    }

    // console.log(field);
    // console.log(onLoading);
  }, [isLoading, isFetching]);
  useEffect(() => {
    console.log(isError);

    if (isError && !isLoading && !isFetching) {
      //setLoading(false);
      console.log("test");
    
      if(selectedObject){
          //@ts-ignore
         setOptions([selectedObject]);
      }
     
      onError && onError(error);
    }
  }, [isError, isLoading, isFetching]);

  useEffect(() => {
    if (query || !isUninitialized) {
      !turnOff && onLoading && onLoading();
      !turnOff && setLoading(true);
    }
  }, [query]);
  return (
    <Select
      menuPlacement={position || "auto"}
      components={
        isCustomOption
          ? HasMenu
            ? {
                IndicatorSeparator: () => null,
                
                MenuList: (props) => (
                  <CustomMenuList
                    {...props}
                    {...menuActionProps}
                    isEmptyOption={isEmptyOption}
                    query={query}
                    hasGuestPlayer={hasGuestAction}
                  />
                ),

                ClearIndicator: () => null,
              }
            : {
                IndicatorSeparator: () => null,
               
              }
          : {
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
      onInputChange={(inputValue, { action }) => {
        if (action === "input-change") {
          console.log(inputValue);

          setQuery(inputValue);
        }
      }}
      isLoading={isLoading || isFetching}
      value={
        options.find((option) => {
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

export default SelectBox;
