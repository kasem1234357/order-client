import React, { useState, useEffect } from "react";
import { cn } from "../../utils/utils";
import { log } from "util";
import useTime from "../../hooks/useTime";
import { useSelector } from "react-redux";
import ImageIcon from "./ImageIcon";
import CalendarIcon from "../../assets/icons/CalendarIcon";
type Props = {
  name: string;
  title?: string;
  placeHolder?: string;
  handleChangeEvent: (value: string, name: string) => void;
  value?: string | null;
  isDisabled?: boolean;
  customClass?: string;
  customLabelClass?:string
  min?: string;
  max?: string;
  isRequired?: boolean;
  inputType?: string;
  dateInputProps?: any;
};

function DateInputIphone({
  name,
  title,
  min,
  max,
  customClass,
  customLabelClass,
  placeHolder = "",
  handleChangeEvent,
  inputType = "date",
  value = null,
  isRequired = true,
  isDisabled = false,
  dateInputProps,
}: Props) {
  const lang = useSelector((state: any) => state?.user?.lang);
  const formatDate = (date: Date) => {
    let options = { day: "numeric", month: "short", year: "numeric" };
    
    if(inputType === 'datetime-local'){
      
      options = {
        ...options,
        //@ts-ignore
        hour:"numeric",
    minute:"numeric",
        
      }
    }
    //|"2-digit",
    //@ts-ignore
    return date.toLocaleDateString("en-GB", options).replace(',',''); // e.g., "1 Jan 2025"
  };
  const [date, setDate] = useState<string | null>(
    value ? formatDate(new Date(value)) : null
  );

  const displayData = (date: string) => {
    
    if(inputType === 'week'){
      return date
    }
    const enterdDate = new Date(date);
    let options = { day: "numeric", month: "short", year: "numeric" };
    if (inputType === "month") {
      //@ts-ignore
      delete options.day;
    }
     if(inputType === 'datetime-local'){
      
      options = {
        ...options,
        //@ts-ignore
        hour:"numeric",
    minute:"numeric",
        
      }
    }

    return enterdDate.toLocaleDateString(
      lang == "ar" ? "ar-EG-u-nu-latn" : "en-GB",
      //@ts-ignore
      options
    ).replace(',',''); // e.g., "1 Jan 2025"
  };

  const dateRef = React.useRef<HTMLInputElement>(null);
  const { getDateinLang } = useTime();
  // Keep `date` state in sync with the `value` prop
  useEffect(() => {
    
    if (dateInputProps.value) {
      if(inputType === 'week'){
        setDate(dateInputProps.value)
        return
      }
      setDate(formatDate(new Date(dateInputProps.value)));
      return;
    }
    if (value) {
       if(inputType === 'week'){
        setDate(value)
        return
      }
      setDate(formatDate(new Date(value)));
    } else {
      setDate(null);
    }
  }, [value, dateInputProps.value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (inputType === 'week') {
    setDate(e.target.value);
    handleChangeEvent(e.target.value, name);
    return;
  }
  if (inputType === 'month') {
    const rawValue = e.target.value; // YYYY-MM format
    const d = new Date(`${rawValue}-01`); // Create valid date
    const formatted = d.toLocaleDateString("en-GB", {
      month: "short",
      year: "numeric"
    }).replace(',', '');
    setDate(formatted);
    handleChangeEvent(formatted, name);
    return;
  }
    console.log(e.target.value);
    
    const selectedDate = new Date(e.target.value);
    const formattedDate = formatDate(selectedDate);

    setDate(formattedDate.replace(',',''));
    handleChangeEvent(formattedDate.replace("Sept", "Sep"), name);
  };

  return (
    <div
      className={cn(
        "col-span-1 flex flex-col h-fit gap-2 relative",
        customClass
      )}
    >
      {title && (
        <p className="flex text-sm  text-primary dark:text-white dark:bg-primary">
          {title} {isRequired && <pre className="text-red-500">*</pre>}
        </p>
      )}
      <label
        className={cn(
          "p-3  h-full w-full border border-gray-300 dark:bg-primaryLight outline-none rounded-md relative text-sm",customLabelClass,
          isDisabled && "cursor-not-allowed bg-[#f3f3f3] dark:bg-primaryLight",
        )}
        htmlFor={name}
        onClick={() => {
          if (dateRef.current && !isDisabled) {
            if (typeof dateRef.current.showPicker === "function") {
              dateRef.current.showPicker();
            } else {
              dateRef.current.focus();
            }
          }
        }}
      >
        <p
          className={cn(
            date ? "text-primary dark:text-white" : "text-secondary"
          )}
        >
          {date ? displayData(date) : placeHolder}
        </p>
        {/* <img loading="lazy"
          className={`absolute ${
            lang == "ar" ? "left-1" : "right-1"
          }  top-2 w-7`}
          src={calenderIcon}
          alt=""
        /> */}
        <ImageIcon
          Icon={CalendarIcon}
          className={`absolute ${
            lang == "ar" ? "left-1" : "right-1"
          }  top-2 w-7`}
        />
      </label>
      <input
        {...dateInputProps}
        ref={dateRef}
        type={inputType}
        readOnly={isDisabled}
        disabled={isDisabled}
        min={min || ""}
        max={max || ""}
        className={`w-0 h-0 absolute top-0`}
        name={name}
        id={name}
        value={
  inputType === 'week'
    ? date || dateInputProps.value
    : inputType === 'month'
    ? value
      ? `${new Date(value).getFullYear()}-${(new Date(value).getMonth() + 1)
          .toString()
          .padStart(2, '0')}`
      : dateInputProps.value
    : date
    ? new Date(date).toLocaleDateString("sv-SE")
    : dateInputProps.value
}
        onChange={handleChange}
      />
    </div>
  );
}

export default DateInputIphone;
