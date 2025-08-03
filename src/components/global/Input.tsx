import React, { ReactNode, useState } from "react";
import { cn } from "../../utils/utils";
import { useSelector } from "react-redux";
import { UserSliceType } from "../../lib/redux/slices/userSlice";
import ImageIcon from "./ImageIcon";

type PropsType = {
  inputProps: React.HTMLProps<HTMLInputElement>;
  label?: string;
  labelStyle?: string;
  icon?: string | any;
  Tooltip?: any;
  toggleIcon?: string | any;
  iconWidth?: number;
  iconHeight?: number;
  title?: string;
  customClass?: string;
  isRequired?: boolean;
};

const Input = ({
  inputProps,
  label,
  icon,
  toggleIcon,
  title,
  customClass,
  iconHeight,
  iconWidth,
  Tooltip,
  labelStyle,
  isRequired = true,
}: PropsType) => {
  const [showPassword, setShowPassword] = useState(false);

  const lang = useSelector((state: any) => state.user.lang);

  const handleToggle = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className="w-full relative flex flex-col ">
      {label && (
        <label
          className={cn(
            `flex mb-2 text-sm  text-primary dark:text-white text-start gap-1`,
            labelStyle
          )}
        >
          {label}
          {isRequired && <span className="text-red-500 pr-2"> *</span>}
          {Tooltip && Tooltip()}
        </label>
      )}
      <div className="relative w-full h-full">
        <input
          {...inputProps}
          type={showPassword ? "text" : inputProps.type}
          className={cn(
            "bg-white dark:bg-primaryLight dark:text-white border h-full  text-sm   border-gray-300 text-[#747474] rounded-lg   block w-full p-3 placeholder-gray-400 ",
            customClass
          )}
        />

        <div
          className={`absolute top-2.5 ${
            lang == "ar" ? "left-2" : "right-2"
          }  text-primary dark:text-white text-xs cursor-pointer`}
          onClick={toggleIcon ? handleToggle : () => {}}
        >
          {icon && (
            <ImageIcon
              Icon={showPassword ? toggleIcon : icon}
              //alt="icon"
              width={iconWidth || 28}
              height={iconHeight || 28}
            />
          )}
          {title && <p className="text-sm mt-1">{title}</p>}
        </div>
      </div>
    </div>
  );
};

export default Input;
