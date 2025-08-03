import React, { useState, useRef, useEffect } from "react";
import { DictionaryType } from "../../types";
import { useGetDictionary } from "../../hooks/useGetDictionary";
//@ts-ignore
import ArrowBottomIcon from "../../assets/icons/ArrowBottomIcon";
import EyeOpenedIcon from "../../assets/icons/EyeOpenedIcon";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useViewport } from "../../hooks/useViewport";
import { MOBILE_VIEW_ENDPOINT } from "../../constants";

const RowsPerPageSelect = ({ options, value, onChange, total }: any) => {
  console.log(total);
  
  const { Auth, inputs, courts, shared, coaches }: DictionaryType =
    useGetDictionary();
    const {sizeInfo,isMobile} = useViewport()
    const location = useLocation()
       const updateSizeInUrl = (page: number) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set("currentSize", page.toString());
    newSearchParams.set('currentPage','1')
    navigate(`${location.pathname}?${newSearchParams.toString()}`);
  };
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const [selectedOption,setSelectedOption]=useState(value)
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
useEffect(()=>{
  console.log(window.location.pathname);
    console.log(window);
     
        const getSize = searchParams.get('currentSize')
        if(getSize){
          onChange(parseInt(getSize))
          setSelectedOption(parseInt(getSize))
        }
},[window.location.search])

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleSelect = (option: number) => {
    console.log(option);
    
    updateSizeInUrl(option)
    onChange(option);
    setSelectedOption(option)
    setIsOpen(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <div
        className="flex flex-row justify-center gap-2 items-center bg-[#F3F3F3] dark:bg-primaryLight w-[200px] h-[40px] rounded-full border-primary border px-2 cursor-pointer mobile:w-[140px]"
        onClick={toggleDropdown}
      >
        <EyeOpenedIcon />
        <p className="text-primary dark:text-white">
          {!(sizeInfo.currentWidth <MOBILE_VIEW_ENDPOINT )?shared.showing:''} {value < total ? value : total}/{total}
        </p>
        <ArrowBottomIcon />
      </div>

      {isOpen && (
        <div className="absolute bottom-full left-0 mb-2 w-full bg-white border border-gray-300 rounded-lg shadow-md z-10">
          {options.map(
            (option: number) =>
              option < total && (
                <div
                  key={option}
                  className={`p-2 text-center hover:bg-gray-200 cursor-pointer text-primary dark:text-white ${
                    option === value ? "bg-gray-100 font-bold" : ""
                  }`}
                  onClick={() => handleSelect(option)}
                >
                  {option}
                </div>
              )
          )}
        </div>
      )}
    </div>
  );
};

export default RowsPerPageSelect;
