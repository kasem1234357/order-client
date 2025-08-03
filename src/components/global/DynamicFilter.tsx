import React, { useEffect, useState } from "react";
import Input from "../global/Input";
import Select from "react-select";
import RadioInput from "../global/RadioInput";
import { selectStyle, selectTheme } from "../../styles/selectStyles";
import SelectOption from "../global/SelectOption";
import { components } from "react-select";
import { DictionaryType } from "../../types";
import { useGetDictionary } from "../../hooks/useGetDictionary";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
type FilterField = {
  type: "text" | "date" | "select" | "radio" | "multiSelect" | "number";
  name: string;
  label: string;
  options?: { label: string; value: any }[]; // For `select` and `radio` types
  selectValue?: any;
  placeholder?: string; // Optional placeholder for `text` and `select`
};

export type FilterConfig = FilterField[];

const DynamicFilter = ({
  config,
  onChange,
}: {
  config: FilterConfig;
  onChange: (filters: any) => void;
}) => {
  const [filters, setFilters] = useState<any>({});
  const { placeHolders }: DictionaryType = useGetDictionary();
  const location = useLocation()
  const updatePageInUrl = () => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set("currentPage", '1');
    newSearchParams.set('currentSize','10')
    navigate(`${location.pathname}?${newSearchParams.toString()}`);
  };
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const handleChange = (name: string, value: any) => {
    setFilters((prev: any) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    if(Object.keys(filters).length >0){
      const page = searchParams.get('currentPage')
      const size = searchParams.get('currentSize')
      if(page !== '1' && size !== '10'){
            updatePageInUrl()
      }
      
    }
 
    
    onChange(filters);
  }, [filters]);

  console.log(new Date().toLocaleDateString());
  return (
    <div className="flex flex-col gap-4 max-w-md">
      {config.map((field) => {
        switch (field.type) {
          case "text":
            return (
              <Input
                key={field.name}
                isRequired={false}
                inputProps={{
                  type: "text",
                  placeholder: field.placeholder,
                  onChange: (e: any) =>
                    handleChange(field.name, e.target.value),
                }}
                label={field.label}
              />
            );
          case "number":
            return (
              <Input
                key={field.name}
                isRequired={false}
                inputProps={{
                  type: "number",
                  onWheel: (e) => {
                    e.preventDefault();
                    //@ts-ignore
                    e.target.blur();
                  },
                  step: 0,
                  placeholder: field.placeholder,
                  onChange: (e: any) =>
                    handleChange(field.name, e.target.value),
                }}
                label={field.label}
              />
            );
          case "date":
            return (
              <Input
                key={field.name}
                isRequired={false}
                inputProps={{
                  type: "date",
                  min:
                    field.name == "date_added_to"
                      ? filters.date_added_from
                      : "",
                  max:
                    field.name == "date_added_to"
                      ? new Date().toISOString().split("T")[0]
                      : field.name == "date_added_from"
                      ? filters.date_added_to
                      : "",
                  onChange: (e: any) =>
                    handleChange(field.name, e.target.value),
                }}
                label={field.label}
              />
            );
          case "select":
            return (
              <div key={field.name}>
                <label className="block mb-2 text-sm text-primary dark:text-white text-start">
                  {field.label}
                </label>
                <Select
                  components={{
                    IndicatorSeparator: () => null,
                  }}
                  styles={selectStyle}
                  classNamePrefix="react-select"
                  theme={selectTheme}
                  options={field.options}
                  placeholder={field.placeholder || placeHolders.select}
                  onChange={(selected) =>
                    handleChange(
                      field.name,
                      selected
                        ? field.selectValue
                          ? //@ts-ignore
                            selected[field.selectValue]
                          : //@ts-ignore
                            selected.value
                        : null
                    )
                  }
                />
              </div>
            );
          case "multiSelect":
            return (
              <div key={field.name}>
                <label className="block mb-2 text-sm text-primary dark:text-white text-start">
                  {field.label}
                </label>
                <Select
                  components={{
                    IndicatorSeparator: () => null,
                    ClearIndicator: () => null,
                    Option: (props) => <SelectOption {...props} />,
                  }}
                  closeMenuOnSelect={false}
                  hideSelectedOptions={false}
                  isMulti={true}
                  styles={selectStyle}
                  classNamePrefix="react-select"
                  theme={selectTheme}
                  options={field.options}
                  placeholder={field.placeholder || placeHolders.select}
                  onChange={(selected) => {
                    handleChange(
                      field.name,
                      selected.map((option: any) => option.value)
                    );
                  }}
                />
              </div>
            );
          case "radio":
            return (
              <div key={field.name}>
                <label className="block mb-2 text-sm text-primary dark:text-white text-start">
                  {field.label}
                </label>
                <div className="flex gap-2">
                  {field.options?.map((option) => (
                    <RadioInput
                      key={option.value}
                      value={option.value}
                      label={option.label}
                      checked={filters[field.name] === option.value}
                      onChange={() => handleChange(field.name, option.value)}
                    />
                  ))}
                </div>
              </div>
            );
          default:
            return null;
        }
      })}
    </div>
  );
};

export default DynamicFilter;
