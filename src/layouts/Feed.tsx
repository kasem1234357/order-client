import React, { Suspense, useEffect, useState } from "react";
import { Route, Routes, useSearchParams } from "react-router-dom";
import { routesSchema } from "../config/routesConfig";
import Navbar from "./Navbar";
//import AuthProvider from "../components/auth/AuthProvider";

import { useDispatch, useSelector } from "react-redux";
import { UserSliceType } from "../lib/redux/slices/userSlice";
import { useViewport } from "../hooks/useViewport";
import { cn } from "../utils/utils";
import MobileNavbar from './MobileNavbar';
import { MOBILE_VIEW_ENDPOINT } from "../constants";

type Props = {};
const currentPremission2 = [
  {
    section: "Chat",
    read: true,
    create: true,
    write: true,
    delete: true,
  },
  {
    section: "Home",
    read: true,
    create: true,
    write: true,
    delete: true,
  },
  {
    section: "Booking",
    read: false,
    create: true,
    write: true,
    delete: false,
  },
  {
    section: "Coaching",
    read: true,
    create: true,
    write: true,
    delete: true,
  },
  {
    section: "Club Admins",
    read: true,
    create: true,
    write: true,
    delete: true,
  },
  {
    section: "Pricing",
    read: true,
    create: true,
    write: true,
    delete: true,
  },
  {
    section: "Coaches",
    read: true,
    create: true,
    write: true,
    delete: true,
  },
  {
    section: "Courts",
    read: true,
    create: true,
    write: true,
    delete: true,
  },
  {
    section: "Events",
    read: true,
    create: true,
    write: true,
    delete: true,
  },
  {
    section: "Organization",
    read: true,
    create: true,
    write: true,
    delete: true,
  },
  {
    section: "Payments",
    read: true,
    create: true,
    write: true,
    delete: true,
  },
  {
    section: "Payment Methods",
    read: true,
    create: true,
    write: true,
    delete: true,
  },
  {
    section: "Club Customers",
    read: true,
    create: true,
    write: true,
    delete: true,
  },
  {
    section: "POS",
    read: true,
    create: true,
    write: true,
    delete: true,
  },
  {
    section: "Extras",
    read: true,
    create: true,
    write: true,
    delete: true,
  },
  {
    section: "Help Center",
    read: true,
    create: true,
    write: true,
    delete: true,
  },
  {
    section: "Message",
    read: true,
    create: true,
    write: true,
    delete: true,
  },
  {
    section: "Notifications",
    read: true,
    create: true,
    write: true,
    delete: true,
  },
  {
    section: "Profile",
    read: true,
    create: true,
    write: true,
    delete: true,
  },
  {
    section: "Home",
    read: true,
    create: true,
    write: true,
    delete: true,
  },
  {
    section: "Booking",
    read: true,
    create: true,
    write: true,
    delete: true,
  },
  {
    section: "Coaching",
    read: true,
    create: true,
    write: true,
    delete: true,
  },
  {
    section: "Club Admins",
    read: true,
    create: true,
    write: true,
    delete: true,
  },
  {
    section: "Pricing",
    read: true,
    create: true,
    write: true,
    delete: true,
  },
  {
    section: "Coaches",
    read: true,
    create: true,
    write: true,
    delete: true,
  },
  {
    section: "Courts",
    read: true,
    create: true,
    write: true,
    delete: true,
  },
  {
    section: "Events",
    read: true,
    create: true,
    write: true,
    delete: true,
  },
  {
    section: "Organization",
    read: true,
    create: true,
    write: true,
    delete: true,
  },
  {
    section: "Payments",
    read: true,
    create: true,
    write: true,
    delete: true,
  },
  {
    section: "Payment Methods",
    read: true,
    create: true,
    write: true,
    delete: true,
  },
  {
    section: "Club Customers",
    read: true,
    create: true,
    write: true,
    delete: true,
  },
  {
    section: "POS",
    read: true,
    create: true,
    write: true,
    delete: true,
  },
  {
    section: "Extras",
    read: true,
    create: true,
    write: true,
    delete: true,
  },
  {
    section: "Help Center",
    read: true,
    create: true,
    write: true,
    delete: true,
  },
  {
    section: "Message",
    read: true,
    create: true,
    write: true,
    delete: true,
  },
  {
    section: "Notifications",
    read: true,
    create: true,
    write: true,
    delete: true,
  },
  {
    section: "Profile",
    read: true,
    create: true,
    write: true,
    delete: true,
  },
  {
    section: "Roles",
    read: true,
    create: true,
    write: true,
    delete: true,
  },
];
function Feed({}: Props) {
  //@ts-ignore
  const currentPremision = useSelector(
    //@ts-ignore
    (state: UserSliceType) => state.user.currentPremission
  );
  const dispatch = useDispatch()
      const isSideBarVisible = useSelector(
      (state: any) => state?.control?.isOpenSidebar
    );

    const [isSmallView,setIsSmallView]=useState(false)
  const [openHelpCenter, setOpenHelpCenter] = React.useState(false);
   const {isMobile,isDesktop,isTablet,sizeInfo} = useViewport()
  const status = useSelector((state: UserSliceType) => state.user.status);


    useEffect(()=>{
          if(sizeInfo.currentWidth <MOBILE_VIEW_ENDPOINT ){
             
              setIsSmallView(true)
          }else{
            setIsSmallView(false)
            
          }
    },[sizeInfo.currentWidth,isMobile])
   const {isLandscapeOrientation} = useViewport()
  return (
    <div className={cn("flex flex-col bg-white dark:bg-primary w-full p-4  overflow-hidden max-h-dvh",!isSmallView && 'rounded-l-xl','mobile:pt-0')}>
      {!isSmallView ?<Navbar
        openHelpCenter={openHelpCenter}
        setOpenHelpCenter={setOpenHelpCenter}
      />:<MobileNavbar/>}

      <div className={cn("p-2 h-full ",isLandscapeOrientation() &&isMobile && 'overflow-auto mobile:pb-[120px]')}>
        {/* <AuthProvider> */}
          <Suspense
            fallback={
              <div className="loading_auth">
                <span className="loader_auth"></span>
              </div>
            }
          >
            <Routes>
              {routesSchema().map((route) => {
               
                return (
                  <Route
                    key={route.title}
                    path={route.path}
                    element={route.element}
                  />
                );
              })}
            </Routes>
          </Suspense>
         
        {/* </AuthProvider> */}
      </div>
    </div>
  );
}

export default Feed;
