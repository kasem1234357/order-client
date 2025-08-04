import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useOutsideClick from "../hooks/useOutsideClick";
import DropDownBox from "../components/custom/DropDownBox/DropDownBox";
import { ImgIcon, toastMessage } from "../utils/utils";
import { generateMenu } from "../utils/MenuGenerator";
import logoutIcon from "../assets/icons/logoutRed.svg";
import { useGetMyProfileQuery } from "../lib/redux/services/sections/Profile";
import ProfileSkeleton from "../components/skeletons/ProfileSkeleton";
import profile_placeholder from "../assets/images/user_placeholder.png";

import { useDispatch, useSelector } from "react-redux";
import deleteIcon from "../assets/icons/DELETE __ DARK Red.svg";
import {
  selectClub,
  setClubs,
  setPremission,
  setStage,
  setStatus,
  setTimeFormat,
  setUser,
  UserSliceType,
} from "../lib/redux/slices/userSlice";
import ActionModal from "../components/global/ActionModal";
import { useGetDictionary } from "../hooks/useGetDictionary";
import { DictionaryType } from "../types";
import ModalButton from "../components/global/ModalButton";
import { useActivateClubMutation } from "../lib/redux/services/sections/Clubs";
import HelpCenterIcon from "../assets/icons/HelpCenterIcon";
import useDarkMode from "../hooks/useDarkMode";
import ProfileIcon from "../assets/icons/ProfileIcon";
import { toast } from "react-toastify";
import { Api } from "../lib/redux/services/Api";
type props = {
  
};
const NavBarProfile = ({  }: props) => {
  const { logout, profile, shared }: DictionaryType = useGetDictionary();
  const [darkMode, setDarkMode] = useDarkMode();
  const dropDownRef = useRef<HTMLButtonElement>(null);
  const [openDropDown, setOpenDropDown] = useState<boolean>(false);
  const dispatch = useDispatch();
  const { data, isFetching, isSuccess } = useGetMyProfileQuery("");
  useEffect(() => {
    if (data && isSuccess) {
      console.log(data?.data);

      dispatch(setUser(data?.data));
      // data?.data?.status?.toLowerCase() !== "active" &&
      //   dispatch(setPremission({}));
    }
  }, [data, isSuccess]);
  if (data) {
    dispatch(setStage(data?.data?.stage));
    
    
    window.localStorage.setItem(
      "generalInfo",
      JSON.stringify({
        name: data?.data?.user?.currentUser?.userName,
        photo: data?.data?.currentUser?.photo,
      })
    );
    dispatch(setStatus(data?.data?.status));
    dispatch(setTimeFormat(+data?.data?.time_format));
  }

  const navigate = useNavigate();

  const closeDropDown = () => {
    setOpenDropDown(false);
  };

  const profileBox = [
    // {
    //   name: profile.profile_menu.my_profile,
    //   tag: "myProfile",
    //   icon: ProfileIcon,
    //   action: "navigateToProfile",
    //   color: "#1e1850",
    // },
    // {
    //   name: profile.profile_menu.help_center,
    //   tag: "helpCenter",
    //   icon: HelpCenterIcon,
    //   action: "openHelpCenter",
    //   color: "#1e1850",
    // },
    {
      name: profile.profile_menu.logout,
      tag: "logout",
      icon: () => ImgIcon(logoutIcon, 28, 28),
      action: "logoutHandler",
      color: "#eb0707",
    },
  ];

  const profileDropDown = generateMenu(
    profileBox,
    {
      navigateToProfile: {
        cb: () => {
          navigate("/profile");
          closeDropDown();
        },
        isAsync: false,
        params: {},
      },
      // logoutHandler: {
      //   cb: async () => {
      //     try {
      //       await signOut(auth);
      //     } catch (error) {
      //       console.error("Logout Error:", error);
      //     }
      //     dispatch(setClubs([]));
      //     dispatch(selectClub(0));
      //     localStorage.clear();
      //     navigate("/auth/welcome");
      //   },
      //   isAsync: false,
      //   params: {},
      // },
    
    },
    {
      logout: {
        component: (item, onClick, closeDropDown) => {
          return (
            <div className="hover:bg-gray-100 dark:hover:bg-primaryLight w-full flex items-center px-2 rounded-md  py-1 ">
              <ModalButton
                buttonContent={
                  <div className=" w-full cursor-pointer">
                    <label className="flex flex-row gap-1 items-center justify-center w-full py-1">
                      <img loading="lazy"
                        className="w-8 cursor-pointer"
                        src={deleteIcon}
                        alt=""
                      />

                      <p className={` text-sm text-primary dark:text-white`}>
                        {profile.profile_menu?.logout}
                      </p>
                    </label>
                  </div>
                }
                modalContent={
                  //<ActivateCoachModal coach_id={coach_id} active={isActive} />
                  <ActionModal
                    useApiAction={useActivateClubMutation}
                    titleClassName={"text-primary dark:text-white"}
                    title={logout?.logout_confirmation_title}
                    subtitle={logout?.logout_confirmation_subtitle}
                    firstButtonTitle={shared.no}
                    secondButtonTitle={shared.yes}
                    secondButtonCallback={async () => {
                     

                      localStorage.clear();

                    
                      dispatch(Api.util.resetApiState());
                      navigate("/login");
                      //set the theme to light
                      document.documentElement.classList.remove("dark");
                    }}
                  />
                }
                modalMaxWidth="max-w-lg "
              />
            </div>
          );
        },
      },
    }
  );

  useOutsideClick(dropDownRef, closeDropDown);

  if (isFetching) {
    return <ProfileSkeleton />;
  }
  return (
    <div className="dropMenu__Box flex gap-2 items-center mobile:flex-col-reverse mobile:gap-1">
      <span className="text-red-500 hidden xl:block mobile:block ">
        {data?.data?.user?.currentUser?.userName }
      </span>
      <img loading="lazy"
        onClick={() => setOpenDropDown((prev) => !prev)}
        src={data?.data?.photo ? data?.data?.photo : profile_placeholder}
        alt=""
        className="rounded-full w-[50px] h-[50px] object-cover mobile:w-[30px] mobile:h-[30px]"
      />
      {/* @ts-ignore */}
      <div ref={dropDownRef}>
        {openDropDown && (
          <DropDownBox
            dropDownConfig={profileDropDown}
            title=""
            closeDropDown={closeDropDown}
            className=" absolute top-10 dark:bg-primary right-20 -left-20  w-[150px] mobile:bottom-0 mobile:-top-[155px] mobile:h-[150px] mobile:left-auto mobile:right-10 mobile:border mobile:border-primary mobile:text-primary mobile:z-[1000] "
          />
        )}
      </div>
    </div>
  );
};

export default NavBarProfile;
