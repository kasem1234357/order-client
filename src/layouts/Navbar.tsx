import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { routes } from "../config/routesConfig";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import logo from "../assets/icons/logo.png";
import { useDispatch, useSelector } from "react-redux";
import {

  UserSliceType,
} from "../lib/redux/slices/userSlice";

import NavBarProfile from "./NavBarProfile";
import usePreNavigation from "../hooks/usePreNavigation";

import Button from "../components/global/Button";
import Modal from "../components/global/Modal";
import { useGetDictionary } from "../hooks/useGetDictionary";

import { DictionaryType } from "../types";

type Props = {
  openHelpCenter: boolean;
  setOpenHelpCenter: React.Dispatch<React.SetStateAction<boolean>>;
};

function Navbar({ openHelpCenter, setOpenHelpCenter }: Props) {
  // function to confirm navigation depending on the current path and the list of forms paths
  // you must add this fuction to any link or button that navigates to another page
  // with preventDefault() to avoid the default behavior of the browser
  // const handleNavigation = usePreNavigation(async (path) => {
  //

  //   if (checkPath(window.location.pathname)) {
  //     return window.confirm("Are you sure you want to leave?");
  //   }
  //   return true;
  // });
  const { shared, profile }: DictionaryType = useGetDictionary();
  const { onCancel, onSuccess, CustomNavigate } = usePreNavigation(null, {
    isCustom: true,
  });
  const [openModel, setOpenModel] = useState(false);
  const { navbar }: DictionaryType = useGetDictionary();
  const path = useLocation().pathname;
  const [searchParams] = useSearchParams();
  const user_stage = useSelector((state: any) => state?.user?.stage);
  const user_status = useSelector((state: any) => state?.user?.status);
  const location = useLocation();
  const navigate = useNavigate();
  const [notAccessibleTitles, setNotAccessibleTitles] = useState<
    { key: string; value: string }[]
  >([]);

  const [queryParams, setQueryParams] = useState<
    { key: string; value: string }[]
  >([]);
  useEffect(() => {
    if (location.state) {
      setNotAccessibleTitles(location.state.notAccessibleTitles);
    }
  }, [location.state, location]);

  const hiddenKeys = [
    "id",
    "section",
    "max",
    "min",
    "currentPage",
    "currentSize",
  ];


  const reduxLang = useSelector((state: any) => state?.user?.lang);
  const lang = localStorage.getItem("lang") || reduxLang;
  const clubsRedux = useSelector((state: UserSliceType) => state.user.clubs);
  const dispatch = useDispatch();

  const [navInfo, setNavInfo] = useState<any>({});

  useEffect(() => {
   
  }, [ user_stage]);
  const handleNavbarInfo = () => {
    let PathWithoutQuery = path.split("?")[0];

    const navInfo = routes.find((item) => {
      let currentItem = item;
      let currentPath = PathWithoutQuery;
      if (item.path.indexOf(":") !== -1) {
        //

        currentItem = { ...item, path: item.path.split(":")[0] };
        currentPath = currentPath.slice(0, currentPath.lastIndexOf("/"));
        //
        return (
          currentItem.path === currentPath ||
          currentItem.path === currentPath + "/" ||
          currentItem.path === currentPath.substring(0, currentPath.length - 1)
        );
      } else {
        return (
          item.path === PathWithoutQuery ||
          item.path === PathWithoutQuery + "/" ||
          item.path ===
            PathWithoutQuery.substring(0, PathWithoutQuery.length - 1)
        );
      }
    });
    setNavInfo(navInfo);
  };
  useEffect(() => {
    const tempQueryParams: { key: string; value: string }[] = [];
    searchParams.forEach((valueEl, keyEl) => {
      if (!hiddenKeys.includes(keyEl)) {
        tempQueryParams.push({ value: valueEl, key: keyEl });
      }
    });
    setQueryParams(tempQueryParams);
    handleNavbarInfo();
  }, [path, window.location.search]);



  const languages = [
    { value: "en", label: "En" },
    { value: "ar", label: "ع" },
  ];
  return (
    <nav className=" p-4 ">
      <div className="content flex justify-between items-center  bg-[#fff] dark:bg-primaryLight z-50 w-full bg-dark-1 px-6 py-4 lg:px-19 shadow-custom  rounded-md">
        <div className="flex gap-1 items-center">
          <div className="xl:max-w-[42px] xl:min-w-[42px] max-w-[35px] min-w-[35px]">
            {navInfo?.icon && navInfo.icon(42, 42)}
          </div>

          <span className="font-bold text-lg xl:text-2xl text-primary dark:text-white flex gap-2 items-center">
            <span
              className="cursor-pointer "
              onClick={() => {
                if (navInfo?.redirect !== navInfo?.path) {
                  navigate(`${navInfo?.redirect}`);
                }
              }}
            >
              {/* @ts-ignore */}
              {(navbar && navInfo?.title && navbar[navInfo?.title]) ||
                navInfo?.title}
            </span>
            {navInfo?.subNavs &&
              navInfo?.subNavs?.map((item: any, index: any) => {
                return (
                  <span
                    className="flex gap-2 items-center   capitalize"
                    key={item?.title}
                  >
                    {" "}
                    {index == 0 && (
                      <ChevronRight className="min-w-6 max-w-6  xl:max-w-6 xl:min-w-8" />
                    )}
                    {/* @ts-ignore */}
                    {(navbar && item?.title && navbar[item?.title]) ||
                      item?.title}
                    {index !== navInfo?.subNavs.length - 1 && (
                      <ChevronRight className="min-w-6 max-w-6  xl:max-w-6 xl:min-w-8" />
                    )}
                  </span>
                );
              })}
            {/* {notAccessibleTitles && notAccessibleTitles.map((item, index) => {
                
                return (
                  <span
                    className="flex gap-2 items-center  capitalize"
                    key={item?.key}
                  >
                    {index === 0 && <ChevronRight />}
                    {item?.value}
                    {index !== notAccessibleTitles.length - 1 && <ChevronRight />}
                  </span>
                );
              })} */}
            {queryParams.length > 0 &&
              queryParams.map((item, index) => {
                return (
                  <span
                    className="flex gap-2 items-center  capitalize"
                    key={item?.key}
                  >
                    {index == 0 &&
                      (lang == "ar" ? (
                        <ChevronLeft
                          className=" min-w-6 max-w-6  xl:max-w-6 xl:min-w-8"
                          color="#1E1850"
                        />
                      ) : (
                        <ChevronRight
                          className="min-w-6 max-w-6  xl:max-w-6 xl:min-w-8"
                          color="#1E1850"
                        />
                      ))}

                    <p className="truncate max-w-[150px] 2xl:whitespace-normal 2xl:max-w-none">
                      {/* @ts-ignore */}
                      {(navbar && item?.value && navbar[item?.value]) ||
                        // (item?.value?.length > 15
                        //   ? `${item?.value?.slice(0, 15)}...:`
                        item?.value}
                    </p>
                    {index !== queryParams.length - 1 &&
                      (lang == "ar" ? (
                        <ChevronLeft
                          className="min-w-6 max-w-6  xl:max-w-6 xl:min-w-8"
                          color="#1E1850"
                        />
                      ) : (
                        <ChevronRight
                          className="min-w-6 max-w-6  xl:max-w-6 xl:min-w-8"
                          color="#1E1850"
                        />
                      ))}
                  </span>
                );
              })}
          </span>
        </div>
       

        <div className="flex gap-4 items-center relative">
         
          <NavBarProfile />
          <div className="list">
            <ul className="flex  gap-7 items-baseline ">
             
              {/* <li>
                <DarkModeToggle />
              </li> */}
            </ul>
          </div>

        
        </div>
      </div>
      <div className=" fixed z-50">
        <Modal modalMaxWidth="max-w-lg" isOpen={openModel}>
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
    </nav>
  );
}

export default Navbar;
