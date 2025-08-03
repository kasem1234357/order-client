import React, { ReactNode, useState } from "react";
import Modal from "./Modal";

type propsType = {
  modalContent: any;
  buttonStyle?: string;
  buttonContent?: any;
  modalMaxWidth?: string;
  portal?: boolean;
  closeDropDown?:any
};

const ModalButton = ({
  modalContent,
  buttonStyle,
  buttonContent,
  closeDropDown,
  modalMaxWidth,
  portal = false,
}: propsType) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
      console.log(isOpen);
      
      if(isOpen){
        closeDropDown && closeDropDown()
      }
    
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <button className={buttonStyle} type="button" onClick={toggleModal}>
        {buttonContent}
      </button>

      <Modal
        modalMaxWidth={modalMaxWidth}
        isOpen={isOpen}
        onClose={toggleModal}
        portal={portal}
      >
        {React.cloneElement(modalContent, { toggleModal })}
      </Modal>
    </div>
  );
};

export default ModalButton;
