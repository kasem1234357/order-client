import React from "react";
import ImageIcon from "./ImageIcon";
import PrintIcon from "../../assets/icons/PrintIcon";
const PrintButton = () => {
  return (
    <button
      className="flex gap-2 items-center bg-[#F3F3F3] dark:bg-primaryLight p-2 rounded-md border border-main-1"
      onClick={() => {
        window.print();
      }}
    >
      <ImageIcon
        className="min-w-[32px]"
        Icon={PrintIcon}
        width={32}
        height={32}
      />
    </button>
  );
};

export default PrintButton;
