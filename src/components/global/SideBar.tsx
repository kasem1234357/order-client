import { ReactElement, useState, useEffect } from "react";
import close from "../../assets/icons/DELETE __ DARK.svg";
import React from "react";
import { useSelector } from "react-redux";

type propsType = {
  children: ReactElement;
  sidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  headerTitle: string;
  headerImage: any;
  sideBarMaxWidth: string;
  formChanged?: boolean;
  setDiscardChangesModal?: (e: boolean) => void;
  setDraft?: (e: string) => void;
  setFormChanged?: (e: boolean) => void;
};

const SideBar = ({
  sidebarOpen,
  setSidebarOpen,
  children,
  headerImage,
  headerTitle,
  sideBarMaxWidth,
  setDiscardChangesModal,
  setDraft,
  setFormChanged,
  formChanged,
}: propsType) => {
  const [animationHandler, setAnimationHandler] = useState(false);
  const lang = useSelector((state: any) => state?.user?.lang);
  useEffect(() => {
    if (sidebarOpen) {
      setAnimationHandler(true); // Trigger open animation
    }
  }, [sidebarOpen]);

  const removeAnimation = () => {
    setAnimationHandler(false); // Trigger close animation
    setTimeout(() => {
      setSidebarOpen(false); // Fully hide sidebar after animation
    }, 200); // Match this duration to your CSS transition time
  };

  const DiscardChangesModalHandler = () => {
    if (formChanged) setDiscardChangesModal && setDiscardChangesModal(true);
    else removeAnimation();
  };

  return (
    <>
      <div
        className={`fixed inset-0 z-[60] flex items-center justify-center bg-black bg-opacity-20 transition-opacity backdrop-blur ${
          sidebarOpen
            ? "opacity-100 visible backdrop-blur-sm"
            : "opacity-0 invisible"
        }`}
        onClick={() => {
          DiscardChangesModalHandler();
          //removeAnimation();
        }}
      />
      <aside
        className={`fixed shadow-lg top-0 ${
          lang == "ar" ? "left-0" : "right-0"
        }  z-[60] h-dvh ${
          sideBarMaxWidth ? sideBarMaxWidth : "max-w-[500px]"
        } w-full bg-white duration-300 transition-transform transform ${
          animationHandler
            ? lang == "ar"
              ? "-translate-x-0"
              : "translate-x-0"
            : lang == "ar"
            ? "-translate-x-full"
            : "translate-x-full"
        }`}
        aria-label="Sidebar"
      >
        <div  className="h-dvh overflow-y-auto customScroll ">
          <div className="bg-primary dark:bg-primaryLight h-[51px] px-3 flex justify-between items-center">
            <div className="text-white flex flex-row gap-1 items-center justify-center print:hidden">
              <img loading="lazy" className="w-10" src={headerImage} alt="Header" />
              <h2 className="text-white pt-4 text-lg">{headerTitle}</h2>
            </div>
            <button
              onClick={DiscardChangesModalHandler}
              className="text-xl text-white transition duration-300 print:hidden"
            >
              <img loading="lazy" src={close} alt="Close" />
            </button>
          </div>
          {/* Pass removeAnimation to children */}
          {React.cloneElement(children, {
            removeAnimation,
            DiscardChangesModalHandler,
            setDraft,
            setFormChanged,
          })}
        </div>
      </aside>
    </>
  );
};

export default SideBar;
