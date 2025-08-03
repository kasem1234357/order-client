import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { selectClub, setClubs, UserSliceType } from '../lib/redux/slices/userSlice';
import { routes } from '../config/routesConfig';
import { DictionaryType } from '../types';
import { useGetDictionary } from '../hooks/useGetDictionary';
import usePreNavigation from '../hooks/usePreNavigation';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import SideBarIcon from '../assets/icons/SideBarIcon';
import { Tooltip } from 'react-tooltip';
import { ChevronLeft } from 'lucide-react';
import { openSideBar } from '../lib/redux/slices/controlSlice';

type Props = {}

function MobileNavbar({}: Props) {
    const { navbar }: DictionaryType = useGetDictionary();

  const [openModel, setOpenModel] = useState(false);
 
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

    handleNavbarInfo();
  }, [path, window.location.search]);

  // const status_tooltip =
  //   user_status == "Complete your profile"
  //     ? profile.profile_status?.complete_your_profile_message
  //     : user_status == "Suspended"
  //     ? profile.profile_status?.suspended_message
  //     : user_status == "Cancelled"
  //     ? profile.profile_status?.cancelled_message
  //     : user_status == "Under review"
  //     ? profile.profile_status?.under_review_message
  //     : user_status == "Active"
  //     ? profile.profile_status?.active_message
  //     : "";

  const languages = [
    { value: "en", label: "En" },
    { value: "ar", label: "ع" },
  ];
  return (
    <div className='flex w-full  px-2 items-center justify-between'>
        <div className='side-icon cursor-pointer' onClick={()=>{
          dispatch(openSideBar())
        }}>
          <SideBarIcon width={30}/>
        </div>
        <div className='nav-content flex flex-col items-start justify-start'>
           <span className="font-bold text-lg xl:text-2xl text-primary dark:text-white flex gap-2 items-center p-3 pb-0">
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

          </span>
        
        </div>
        <div className='back-icon border-2 border-primary  rounded-md p-2 w-[30px] h-[30px] grid place-content-center cursor-pointer stroke-primary hover:stroke-white hover:bg-primary' onClick={()=>{
                   navigate(-1)
        }}>
          <ChevronLeft
                          className=" min-w-6 max-w-6  xl:max-w-6 xl:min-w-8 stroke-inherit"
                          
                        />
        </div>

    </div>
  )
}

export default MobileNavbar