import React from "react";
type propsType = {
  Icon: any;
  width?: number;
  height?: number;
  className?: string;
  onClick?: any;
};
const ImageIcon = ({
  Icon,
  width = 42,
  height,
  className,
  onClick,
}: propsType) => {
  return (
    <div onClick={onClick} className={` transition duration-300 ${className}`}>
      <Icon width={`${width}px`} height={`${height}px`} className="w-full h-auto" />
    </div>
  );
};

export default ImageIcon;
