import { ChevronDown, ChevronUp, LucideMenu } from "lucide-react";
import logo from "../assets/icons/logo.png";
import { MenuItems } from "../config/menuConfig";
import { Dispatch, SetStateAction, useEffect, useLayoutEffect, useRef, useState } from "react";
import { checkPath, cn, toastMessage, toBoolean } from "../utils/utils";
import { DictionaryType, enumSectionType, MenuItem } from "../types";
import { Link, useLocation, useNavigate } from "react-router-dom";
import usePreNavigation from "../hooks/usePreNavigation";
import modelLogo from "../assets/icons/logo.png";
import { FORM_ROUTES, MOBILE_VIEW_ENDPOINT } from "../constants";

import { useDispatch, useSelector } from "react-redux";
import { Tooltip } from "react-tooltip";
import Modal from "../components/global/Modal";
import close from "../assets/icons/DELETE __ DARK.svg";
import { useGetDictionary } from "../hooks/useGetDictionary";
import Button from "../components/global/Button";

import { toast } from "react-toastify";

import micon from "../assets/icons/MIcon.svg";
import { useViewport } from "../hooks/useViewport";
import { closeSideBar, openSideBar } from "../lib/redux/slices/controlSlice";
import useOutsideClick from "../hooks/useOutsideClick";

type Props = {

};
const SubMenu = ({
  item,
  openSections,
  currentPage,
  setCurrentPage,
  setOpenModel,
  CustomNavigate,
  onSuccess,
  onCancel,
  smallSidebar,
}: {
  item: MenuItem;
  openSections: string[];
  currentPage: string;
  setCurrentPage: any;
  setOpenModel: any;
  CustomNavigate: any;
  onSuccess: any;
  onCancel: any;
  smallSidebar: boolean;
}) => {
  const divRef = useRef<HTMLDivElement>(null);

  // function to confirm navigation depending on the current path and the list of forms paths
  // you must add this fuction to any link or button that navigates to another page
  // with preventDefault() to avoid the default behavior of the browser
  const { sidebar }: DictionaryType = useGetDictionary();
  const [divHeight, setDivHeight] = useState(0);
  const [subMenu, setSubMenu] = useState<any>();
  const lang = useSelector((state: any) => state?.user?.lang);
  const user_stage = useSelector((state: any) => state?.user?.stage);

  useEffect(() => {
    if (divRef.current) {
      setDivHeight(divRef.current.clientHeight);
    }
  }, [divRef.current]);

  useLayoutEffect(() => {
    // const handleSubMenu = () => {
    //   const subMenu = item?.subMenu ?? [];

    //   switch (user_stage) {
    //     case "organization":
    //       return subMenu.slice(0, 1); // Get the first item
    //     case "clubs":
    //       return subMenu.slice(0, 2); // Get the first two items
    //     case "courts":
    //       return subMenu.slice(0, 3); // Get the first three items
    //     case "pricing":
    //       return subMenu.slice(0, 4); // Get the first four items
    //     case "subscription":
    //       return subMenu.slice(0, 4); // Get the first four items
    //     default:
    //       return subMenu; // Return the entire array
    //   }
    // };
    setSubMenu(subMenu);
  }, [user_stage]);



 
  const formIsDirty = useSelector((state: any) => state.form.isDirty);

  return (
    <div
      ref={divRef}
      className={cn(
        "sub-menu  flex flex-col gap-2  custom-transition overflow-hidden",
        openSections.includes(item.title)
          ? `h-[${divHeight}px] flex py-3 opacity-100`
          : "h-0 opacity-0"
      )}
    >

      {subMenu?.map((subItem: any, index: number) => {
        return (
          user_stage && (
            <Link
              key={index}
              to={subItem.href}
              onClick={(e) => {
                e.stopPropagation();
                setCurrentPage(subItem.href.split("/")[2]);
                e.preventDefault();
                CustomNavigate(subItem.href);
                if (checkPath(window.location.pathname) && formIsDirty) {
                  setOpenModel(true);
                } else {
                  onSuccess(subItem.href);
                }
              }}
            >
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentPage(subItem.href.split("/")[2].split("?")[0]);
                }}
                className={
                  !smallSidebar
                    ? `sub-item hover:bg-[#332F4B] hover:text-primaryYellow ${
                        lang == "ar" ? "hover:border-r-4" : "hover:border-l-4"
                      } ${
                        window.location.pathname == subItem.href?.split("?")[0]
                          ? `border-[#CBDB2A] text-primaryYellow ${
                              lang == "ar" ? "border-r-4" : "border-l-4"
                            } bg-[#332F4B]`
                          : ""
                      } hover:border-[#CBDB2A]  cursor-pointer`
                    : "cursor-default"
                }
              >
                <div
                  //  to={subItem.href}
                  className={`sub-item-link px-4 py-2  ${
                    smallSidebar ? "justify-center" : ""
                  }  flex gap-1 items-center `}
                  onClick={(e) => {
                    e.preventDefault();

                    CustomNavigate(subItem.href);
                    if (checkPath(window.location.pathname) && formIsDirty) {
                      setOpenModel(true);
                    } else {
                      onSuccess(subItem.href);
                    }
                  }}
                >
                  <div
                    className={
                      smallSidebar
                        ? `hover:bg-primaryYellow cursor-pointer  px-3 py-3 transition duration-300 hover:text-primary rounded-lg ${
                            window.location.pathname ==
                            subItem.href?.split("?")[0]
                              ? `bg-primaryYellow text-primary    dark:text-white `
                              : ""
                          } `
                        : ""
                    }
                  >
                    {subItem.Icon && <subItem.Icon />}
                  </div>

                  <p
                  >
                    {/* @ts-ignore */}
                    {!smallSidebar && (sidebar[subItem.title] || subItem.title)}
                  </p>
                </div>
              </div>
            </Link>
          )
        );
      })}
    </div>
  );
};

// Next we make an 'instance' of it

// instance.defaults.timeout = 10000;
// Where you would set stuff like your 'Authorization' header, etc ...

// Also add/ configure interceptors && all the other cool stuff


function Sidebar({}: Props) {
  const { shared, sidebar }: DictionaryType = useGetDictionary();
    const isSideBarVisible = useSelector(
    (state: any) => state?.control?.isOpenSidebar
  );
  const [smallSidebar, setSmallSideBar] = useState(
    toBoolean(sessionStorage.getItem("smallSidebar")) || false
  );
  const [isSmallView,setIsSmallView]=useState(false)

  // const {data,isLoading,isSuccess} = useLoginDBQuery('',{
  //   skip:!loadingDbUrl
  // });
  const [openModel, setOpenModel] = useState(false);
 const {isMobile,isDesktop,isTablet,sizeInfo,isLandscapeOrientation} = useViewport()
  const lang = useSelector((state: any) => state?.user?.lang);
  const formIsDirty = useSelector((state: any) => state.form.isDirty);
  const dispatch = useDispatch();
  //@ts-ignore


  useEffect(()=>{
        if(sizeInfo.currentWidth <MOBILE_VIEW_ENDPOINT){
            dispatch(closeSideBar())
            setIsSmallView(true)
            setSmallSideBar(false)
        }else{
          setIsSmallView(false)
          dispatch(openSideBar())
        }
  },[sizeInfo.currentWidth])


  const { onCancel, onSuccess, CustomNavigate } = usePreNavigation(null, {
    isCustom: true,
    onSuccess: () => {
      // reset redux
    },
  });
  const user_stage = useSelector((state: any) => state?.user?.stage);
  //const user_status = useSelector((state: any) => state?.user?.status);
  const { pathname, search } = useLocation();

  const [currentPage, setCurrentPage] = useState(
    pathname.split("/").length >= 3
      ? pathname.split("/")[2]
      : pathname.split("/")[1]
  );
  console.log(pathname);
  console.log(currentPage);

  const [openSections, setOpenSections] = useState<string[]>(
    smallSidebar
      ? ["Organization Settings", "Events", "Coaching", "General"]
      : []
  );
  
  const handleOpenSection = (sectionName: string, event: React.MouseEvent) => {
    event.stopPropagation();
    setOpenSections((prev) =>
      prev.includes(sectionName)
        ? prev.filter((item) => item !== sectionName)
        : [...prev, sectionName]
    );
  };

  const sidebarMenu =  MenuItems;
  const sidebarRef=useRef(null)
  const handleClose=()=>{
     
      dispatch(closeSideBar())
     
  }
  useOutsideClick(sidebarRef,handleClose,'mousedown',!isSmallView)
  useEffect(() => {
    setOpenSections((prev) => {
       return [...prev];
      //return ["Organization Settings", ...prev];
    });
  }, [pathname]);

  return (
    <div
    ref={sidebarRef}
      className={cn(`   rounded-lg   bg-primary text-white dark:text-primary dark:bg-white  flex flex-col h-dvh   items-center transition-all  `,(isSideBarVisible)?(smallSidebar ? "w-[100px]" : "w-[283px]"):'w-0',isSmallView && 'absolute z-[1000] overflow-hidden')}
    >
    {sizeInfo.currentWidth < MOBILE_VIEW_ENDPOINT &&  <div className="absolute right-[10px] top-[10px] cursor-pointer "onClick={()=>{
        dispatch(closeSideBar())
      }}>
         <img loading="lazy" src={close} alt="Close" />
      </div>}
      <div className=" relative w-full  ">
        {!isSmallView && <div
          onClick={() => {
            sessionStorage.setItem("smallSidebar", `${!smallSidebar}`);
            setOpenSections([
              "Organization Settings",
              "Events",
              "Coaching",
              "General",
            ]);
            setSmallSideBar(!smallSidebar);
          }}
          className="bg-white  rounded-lg absolute -right-5 top-12 shadow-xl  py-1 px-1  hover:cursor-pointer z-10"
        >
          <LucideMenu className="text-primary w-8 h-8" />
        </div>}
      </div>
     <div
        className={`logo grid place-content-center ${
          smallSidebar ? "py-[20px]" : "py-[30px]"
        }  `}
      >
        <img
          loading="lazy"
          src={ logo}
          width={smallSidebar ? "40px" : "140px"}
          className="mix-blend-soft-light"
          alt=""
        />
      </div>

      <div className="links-content w-full overflow-y-auto customScroll-sidebar ">
        {sidebarMenu.map((item, index) => {
         
          if (item.isGroupItem) {
            //@ts-ignore
           
            return (
              <div
                key={index}
                className="group-item flex flex-col w-full  cursor-pointer "
                onClick={(e) => {
                  !smallSidebar && handleOpenSection(item.title, e);
                }}
              >
                {/* hover:text-primaryYellow hover:border-[#CBDB2A] hover:bg-[#332F4B]  */}
                {/* ${
                      lang == "ar" ? "hover:border-r-4" : "hover:border-l-4"
                    } */}
                <div
                  className={`flex w-full ${
                    smallSidebar ? "justify-center " : "justify-between"
                  } items-center py-3 px-4 ${
                    !smallSidebar
                      ? `hover:text-primaryYellow hover:border-[#CBDB2A] hover:bg-[#332F4B] ${
                          lang == "ar" ? "hover:border-r-4" : "hover:border-l-4"
                        }`
                      : ""
                  }  `}
                >
                  <h3
                    className={`font-bold ${
                      smallSidebar ? "text-center text-sm" : "text-lg"
                    } `}
                  >
                    {/* @ts-ignore */}
                    {sidebar[item.title] || item.title}
                  </h3>
                  {openSections.includes(item.title)
                    ? !smallSidebar && <ChevronUp className="w-6 h-6" />
                    : !smallSidebar && <ChevronDown className="w-6 h-6" />}
                </div>
                <SubMenu
                  smallSidebar={smallSidebar}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  item={item}
                  setOpenModel={setOpenModel}
                  CustomNavigate={CustomNavigate}
                  onSuccess={onSuccess}
                  onCancel={onCancel}
                  openSections={openSections}
                />
              </div>
            );
          } else {
            return (
              <div
                className={`item flex w-full ${
                  !smallSidebar
                    ? ` ${
                        currentPage == item.href.split("/")[1].split("?")[0]
                          ? `border-[#CBDB2A] ${
                              lang == "ar" ? "border-r-4" : "border-l-4"
                            } bg-[#332F4B] text-primaryYellow dark:text-white `
                          : ""
                      }  hover:bg-[#332F4B]  hover:text-primaryYellow ${
                        lang == "ar" ? "hover:border-r-4" : "hover:border-l-4"
                      } hover:border-[#CBDB2A] cursor-pointer`
                    : " cursor-default"
                } `}
                onClick={(e) => {
                  setCurrentPage(item.href.split("/")[1].split("?")[0]);
                }}
              >
                <Link
                  to={item.href}
                  className={`item-link w-full flex gap-2 items-center px-4  ${
                    smallSidebar ? "justify-center cursor-default" : ""
                  } py-3 `}
                  onClick={(e) => {
                    e.preventDefault();
                    CustomNavigate(item.href);
                    if (checkPath(window.location.pathname) && formIsDirty) {
                      setOpenModel(true);
                    } else {
                      onSuccess(item.href);
                    }
                  }}
                >
                  <div
                    className={`${
                      !smallSidebar
                        ? ""
                        : `hover:bg-primaryYellow cursor-pointer  px-3 py-3 transition duration-300 hover:text-primary rounded-lg ${
                            currentPage == item.href.split("/")[1].split("?")[0]
                              ? `bg-primaryYellow text-primary    dark:text-white `
                              : ""
                          }`
                    } `}
                  >
                    {item.Icon && <item.Icon />}
                  </div>

                  {/* @ts-ignore */}
                  {!smallSidebar && (sidebar[item.title] || item.title)}
                </Link>
              </div>
            );
          }
        })}

        
      </div>

      <div className=" fixed z-50">
        <Modal modalMaxWidth="max-w-lg" isOpen={openModel}>
          <div className="  flex flex-col gap-8 px-12 py-5 ">
            <div className={cn("flex flex-col justify-center items-center gap-4 text-center ",isLandscapeOrientation() && isMobile && 'gap-1')}>
              <img
                loading="lazy"
                width={isLandscapeOrientation() && isMobile ?70:200}
                height={200}
                src={modelLogo}
                alt="mocion-logo"
              />
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
                    onSuccess();
                    setOpenModel(false);
                  }}
                />
                <Button
                  customeStyle="bg-white text-primary dark:text-white   w-full rounded-full text-lg py-4 "
                  text={shared.no}
                  width="max-w-[400px] w-full"
                  onClick={() => {
                    onCancel();
                    setOpenModel(false);
                  }}
                />
              </div>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
}

export default Sidebar;
