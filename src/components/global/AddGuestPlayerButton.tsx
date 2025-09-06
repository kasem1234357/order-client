import { CirclePlus } from "lucide-react";
import { default as ReactSelect, components } from "react-select";
import { toast } from "react-toastify";
import GuestIcon from "../../assets/icons/GuestIcon";
import { useNavigate } from "react-router-dom";
import { useGetDictionary } from "../../hooks/useGetDictionary";
import { DictionaryType } from "../../types";
import ImageIcon from "./ImageIcon";
const CustomMenuList = (props: any) => {
  const navigate = useNavigate();
  const { events }: DictionaryType = useGetDictionary();
  return (
    <components.MenuList {...props}>
      {/* Action Button */}
      <div
        className="flex flex-col  "
        style={{ borderBottom: "1px solid #ccc" }}
      >
        
        {props.hasAddPlayerBtn && (
          <button
            className="flex gap-2 py-2 px-2 text-primary text-sm  w-full hover:bg-[#1e185066] hover:text-white "
            onClick={() => {
               props.onClick && props.onClick()
            }}
          >
            <ImageIcon
              className=" transition-none"
              width={20}
              Icon={GuestIcon}
            />{" "}
            {props.addLabel?props.addLabel:"Add New Player"}
          </button>
        )}
      </div>
      {/* Default Options */}
      {props.children}
    </components.MenuList>
  );
};
export default CustomMenuList;
