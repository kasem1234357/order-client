import React from "react";
import { Link } from "react-router-dom";

type propsType = {
  type?: "submit" | "reset" | "button" | undefined;
  customeStyle: string;
  href?: string;
  text: string | any;
  width: string;
  Icon?: () => JSX.Element;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  buttonProps?: any;
};

const Button = ({
  type,
  customeStyle,
  href,
  text,
  width,
  onClick,
  Icon,
  buttonProps,
}: propsType) => {
  return (
    <div className={width}>
      <button
        type={type ? type : "button"}
        className={customeStyle}
        onClick={onClick}
        {...buttonProps}
      >
        {Icon && <Icon />}
        {href ? (
          <Link className="w-full block" to={href}>
            {text}
          </Link>
        ) : (
          text
        )}
      </button>
    </div>
  );
};

export default Button;
