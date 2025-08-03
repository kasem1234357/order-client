import React, { ReactElement, useState } from "react";
import SideBar from "./SideBar";
import Modal from "./Modal";
import Button from "./Button";
import { useGetDictionary } from "../../hooks/useGetDictionary";
import { DictionaryType } from "../../types";
import logo from "../../assets/icons/mocionLogo.svg";
type propsType = {
  SideBarChildren: ReactElement;
  headerTitle: string;
  headerImage: any;
  buttonTitle?: string;
  buttonIcon?: string;
  buttonStyle?: string;
  containerStyle?:string
  sideBarMaxWidth: string;
  ButtonIcon?: () => JSX.Element;
  SidebarOpenHandler?: any;
};
const SideBarButton = ({
  SideBarChildren,
  headerTitle,
  containerStyle,
  headerImage,
  buttonTitle,
  buttonStyle,
  sideBarMaxWidth,
  ButtonIcon,
  SidebarOpenHandler,
}: propsType) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [discardChangesModal, setDiscardChangesModal] = useState(false);
  const [draft, setDraft] = useState("");
  const { shared, leagues_tournaments }: DictionaryType = useGetDictionary();
  const [formChanged, setFormChanged] = useState(false);

  const handelSideBar = () => {
    setSidebarOpen(true);
  };

  const CloseSideBar = () => {
    setSidebarOpen(false);
  };

  return (
    <div className={containerStyle}>
      <button onClick={handelSideBar} className={buttonStyle}>
        {ButtonIcon && <ButtonIcon />}
        {buttonTitle}
      </button>
      {sidebarOpen && (
        <SideBar
          setDiscardChangesModal={setDiscardChangesModal}
          setFormChanged={setFormChanged}
          formChanged={formChanged}
          setSidebarOpen={setSidebarOpen}
          sidebarOpen={sidebarOpen}
          headerImage={headerImage}
          headerTitle={headerTitle}
          sideBarMaxWidth={sideBarMaxWidth}
          setDraft={setDraft}
        >
          {SideBarChildren}
        </SideBar>
      )}

      <div className=" absolute z-50">
        <Modal
          modalMaxWidth="max-w-lg"
          isOpen={discardChangesModal && formChanged}
        >
          <div className="  flex flex-col gap-8 px-12 py-5 ">
            <div className="flex flex-col justify-center items-center gap-4 text-center ">
              <img loading="lazy" width={200} height={200} src={logo} alt="mocion-logo" />
              <div>
                <h2>{shared.attention}!!</h2>
                <p className="text-lg font-normal  text-[#1E1850] break-words leading-relaxed whitespace-pre-wrap  ">
                  {shared.discard_changes}
                </p>
              </div>
              <div className="mt-6 flex flex-col items-center justify-center gap-6  w-full">
                <Button
                  customeStyle=" bg-primary text-white  w-full rounded-full  text-lg py-4  "
                  text={shared.yes}
                  width="max-w-[400px] w-full"
                  onClick={() => {
                    draft && localStorage.removeItem(draft);
                    CloseSideBar();
                    setFormChanged(false);
                    setDiscardChangesModal(false);
                  }}
                />
                <Button
                  customeStyle="bg-white text-primary dark:text-white   w-full rounded-full text-lg py-4 "
                  text={shared.no}
                  width="max-w-[400px] w-full"
                  onClick={() => {
                    setDiscardChangesModal(false);
                  }}
                />
              </div>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default SideBarButton;
