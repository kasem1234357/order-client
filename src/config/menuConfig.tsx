import {  MASSEGE_MENU_Type, MenuItem } from "../types";
import { ImgIcon } from "../utils/utils";

import deleteIcon from "../assets/icons/DELETE __ DARK Red.svg";

import { store } from "../lib/redux/store";

import HomeIcon from "../assets/icons/HomeIcon";

import ClubCustomersIcon from "../assets/icons/ClubCustomersIcon";

import EditIcon from "../assets/icons/EditIcon";

import ClubAdminsIcon from "../assets/icons/ClubAdminsIcon";

//@ts-ignore
const dictionary = store.getState().user.dictionary;
//------done-------//
export const MenuItems: MenuItem[] = [
  {
    title: "Orders",
    href: "/",
    tag: "Orders",
    isGroupItem: false,
    Icon: HomeIcon,
  },
  {
    title: "users",
    href: "/users",
    tag: "Users",
    isGroupItem: false,
    Icon: ClubCustomersIcon,
  },
  {
    title: "Roles",
    href: "/roles",
    tag: "Roles",
    isGroupItem: false,
    Icon: ClubAdminsIcon,
  },
    {
    title: "Material",
    href: "/material",
    tag: "Material",
    isGroupItem: false,
    Icon: ClubAdminsIcon,
  },

]
  //   title: "Competitive",
  //   href: "/competitive",
  //   isGroupItem: true,
  //   subMenu: [
  //     {
  //       title: "Leagues",
  //       href: "/competitive/leagues",
  //       isGroupItem: false,
  //       Icon: () => ImgIcon(leaguesIcon, 28, 28),
  //     },
  //     {
  //       title: "Tournaments",
  //       href: "/competitive/tournaments",
  //       isGroupItem: false,
  //       Icon: TournamentIcon,
  //     },
  //   ],
  // },
  // {
  //   title: "Friendly",
  //   href: "/friendly",
  //   isGroupItem: true,
  //   subMenu: [
  //     {
  //       title: "Public",
  //       href: "/friendly/public",
  //       isGroupItem: false,
  //       Icon: () => ImgIcon(publicEventsIcon, 28, 28),
  //     },
  //     {
  //       title: "Private",
  //       href: "/friendly/private",
  //       isGroupItem: false,
  //       Icon: () => ImgIcon(privateEventsIcon, 28, 28),
  //     },
  //   ],
  // },

//------done-------//
export const ordersMenu: MASSEGE_MENU_Type[] = [
  {
    name: "تعديل الطلب",
    translateSection: "clubs",
    color: "#1e1850",
    tag: "edit",
    eventType: "write",
    sections: ["Orders"],
    icon: EditIcon,
    action: "edit",
  },
  {
    name: "الموافقة على الطلب",
    translateSection: "clubs",
    color: "#1e1850",
    tag: "approved",
    eventType: "write",
    sections: ["Orders"],
    icon: EditIcon,
    action: "approved",
  },
  {
    name: "نقل الى الفرازة",
    translateSection: "clubs",
    color: "#1e1850",
    tag: "Fraza",
    eventType: "write",
    sections: ["Orders"],
    icon: EditIcon,
    action: "FrazaAction",
  },
  {
    name: "نقل الى القصاصة",
    translateSection: "clubs",
    color: "#1e1850",
    tag: "cutting",
    eventType: "write",
    sections: ["Orders"],
    icon: EditIcon,
    action: "cuttingAction",
  },
  {
    name: "ارجاع الطلب الى المخزن",
    translateSection: "clubs",
    color: "#1e1850",
    tag: "return",
    eventType: "write",
    sections: ["Orders"],
    icon: EditIcon,
    action: "return",
  },
  
  {
    name: 'انهاء الطلب',
    translateSection: "clubs",
    color: "#1e1850",
    tag: "complete",
    eventType: "write",
    sections: ["Orders"],
    icon: EditIcon,
    action: "complete",
  },
  {
    name: "ايقاف الطلب",
    translateSection: "clubs",
    color: "#EF4626",
    tag: "cancel",
    eventType: "delete",
    sections: ["Orders"],
    icon: ()=>ImgIcon(deleteIcon,28,28),
    action: "cancel",
  },
  
 
];
export const rolesMenu: MASSEGE_MENU_Type[] = [
  {
    name: "Edit Role",
    translateSection: "clubs",
    color: "#1e1850",
    tag: "edit",
    eventType: "write",
    sections: ["Roles"],
    icon: EditIcon,
    action: "edit",
  },
 
  // {
  //   name: "delete role",
  //   translateSection: "clubs",
  //   color: "#1e1850",
  //   tag: "delete",
  //   eventType: "delete",
  //   sections: ["Roles"],
  //   icon: EditIcon,
  //   action: "delete",
  // },
  {
    name: "انشاء كود الصلاحيات",
    translateSection: "clubs",
    color: "#1e1850",
    tag: "inviteCode",
    eventType: "create",
    sections: ["Roles"],
    icon: EditIcon,
    action: "inviteCodeAction",
  },
  
 
];
