import React, { ReactNode, useRef } from "react";
import ReactDOM from "react-dom";
import useOutsideClick from "../../hooks/useOutsideClick";

type propsType = {
  isOpen: boolean;
  onClose?: any;
  children: ReactNode;
  modalMaxWidth?: string;
  portal?: boolean;
  isSideBarModel?: boolean;
};

const Modal = ({
  children,
  isOpen,
  onClose,
  isSideBarModel = false,
  modalMaxWidth,
  portal = false,
}: propsType) => {
  const divRef = useRef(null);
  useOutsideClick(divRef, () => {
    onClose && onClose();
  });
  if (!isOpen) return null;
  if (portal)
    return ReactDOM.createPortal(
      <div
        id="modal-root"
        // onClick={() => {
        //   onClose && onClose();
        // }}
        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-20 transition-opacity backdrop-blur  cursor-auto z-[100]"
      >
        <div
          ref={divRef}
          className={`bg-white dark:bg-primary rounded-xl shadow-lg w-full relative overflow-x-auto overflow-y-auto customScroll dark:customScroll-sidebar z-50  ${
            modalMaxWidth ? modalMaxWidth : "max-w-2xl"
          }`}
          onClick={(e) => {
            // console.log("test");

            // e.stopPropagation();
            // e.preventDefault();
          }} // Stop click event propagation
        >
          {React.cloneElement(children as React.ReactElement, { onClose })}
        </div>
      </div>,
      document.body // Append the modal to the body element, outside any restricted areas
    );
  else
    return (
      <div
        onClick={() => {
          onClose && onClose();
        }}
        className="fixed inset-0 w-full h-full flex items-center justify-center bg-black bg-opacity-20 transition-opacity backdrop-blur  cursor-auto z-[100]"
      >
        <div
          ref={divRef}
          className={`bg-white dark:bg-primary rounded-xl shadow-lg w-full relative overflow-x-auto overflow-y-auto customScroll dark:customScroll-sidebar z-50  ${
            modalMaxWidth ? modalMaxWidth : "max-w-2xl"
          }`}
          onClick={(e) => e.stopPropagation()} // Stop click event propagation
        >
          {React.cloneElement(children as React.ReactElement, { onClose })}
        </div>
      </div>
    );
};

export default Modal;
