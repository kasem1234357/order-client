import React, { ReactNode, Suspense, lazy } from "react";

import { RoutesConfig } from "../types";

import ImageIcon from "../components/global/ImageIcon";

import ProfileIcon from "../assets/icons/ProfileIcon";

import ClubAdminsIcon from "../assets/icons/ClubAdminsIcon";
import Loader from "../components/skeletons/Loader";
import Orders from "../pages/Orders";
import OrderIcon from "../assets/icons/OrderIcon";
import Users from "../pages/Users";
import Roles from "../pages/Roles";
import { Navigate } from "react-router-dom";
import Material from "../pages/Material";


const Loadable = ({ children }: { children: ReactNode }) => (
  <Suspense
    fallback={
      <div className="w-full h-[calc(100dvh-200px)] flex flex-col justify-center items-center">
        <Loader />
      </div>
    }
  >
    {children}
  </Suspense>
);
export const routes: RoutesConfig = [
  {
    path: "/",
    role: ["all"],
    title: "الطلبيات",
    tag:"Orders",
    isMainPage: true,
    icon: () => <ImageIcon Icon={OrderIcon} width={42} height={42} />,
    element: (
      <Loadable>
        <Orders />
      </Loadable>
    ),
  },
  {
    path: "/users",
    role: ["all"],
    title: "المستخدمين",
    tag:"Users",
    isMainPage: true,
    icon: () => <ImageIcon Icon={ProfileIcon} width={42} height={42} />,
    element: (
      <Loadable>
        <Users />
      </Loadable>
    ),
  },
   {
    path: "/roles",
    role: ["all"],
    title: "الصلاحيات",
    tag:"Roles",
    isMainPage: true,
    icon: () => <ImageIcon Icon={ClubAdminsIcon} width={42} height={42} />,
    element: (
      <Loadable>
        <Roles />
      </Loadable>
    ),
  },
  {
    path: "/material",
    role: ["all"],
    title: "المواد",
    tag:"Material",
    isMainPage: true,
    icon: () => <ImageIcon Icon={ClubAdminsIcon} width={42} height={42} />,
    element: (
      <Loadable>
        <Material />
      </Loadable>
    ),
  },
   {
    path: "/*",
    role: ["all"],
    title: "",
    
    isMainPage: false,
    
    element: (
      <Loadable>
        <Navigate to='not-found' />
      </Loadable>
    ),
  },
 
];
export const routesSchema = (role = "all") => {
  if (role === "super_admin") return routes;
  const safeRoutes = routes.filter(
    (route) => route.role.includes(role) || route.role.includes("all")
  );
  return safeRoutes;
};
