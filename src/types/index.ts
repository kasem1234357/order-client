import { LucideIcon } from "lucide-react";
import { ComponentType, ReactNode } from "react";
import dictionaryType from "../dictionary/dictionary.json";
export type MASSEGE_MENU_Type = {
  // name for translation and display
  name: string;
  // tag if you want to replace item with custom component
  tag: string;

  translateSection?: string;
  icon: React.ComponentType<any> | LucideIcon;
  color: string;
  // action to call on onClick
  action: string;
  eventType?: "read" | "write" | "create" | "delete" | "none";
  // sections for roles to on/off this item
  sections?: enumSectionType[];
};
export type Dependencies = {
  [key: string]: {
    cb: (...args: any) => void | Promise<any>;
    isAsync: boolean;
    params: {
      [key: string]: any;
    };
  };
};
export type tableConfig = {
  [key: string]: Partial<{
    //  valueKeys: list of values you wants to view under the same tag
    valueKeys: string[]; //done
    emptyValue:any,
    // event type if the item have action
    eventListnerType?: string;
    columnCellClassName?: string;
    tdClassName?: string;
    // action
    action: () => void;
    // is box have for html styling and disaplying img
    hasImg: boolean; //done
    // itemKey thats have img info
    imgValueKey: string; // done
    // when you add custom view children you disable all methods and view the children
    isCustomViewChildren?: boolean;
    customViewChildren: (
      row: any,
      tag: any,
      setCurrentTrStyle?: any,
      rowIndex?: number,
      offsetLeft?:{}
    ) => void; //done
    // split listed value by uniqe  good for styling
    spliter: string; // done
    customClassName: string; // done
    isBoolValue?: boolean; // done
    EnumBoolValue: {
      // done
      inTrue: string;
      inFalse: string;
      truethlyClassNames: string;
      falsyClassNames: string;
    };
    htmlElementType:
      | "button"
      | "p"
      | "span"
      | "h1"
      | "h2"
      | "h3"
      | "h4"
      | "div";
  }>;
};
export type MenuItem = {
  title: string;
  href: string;
  tag: enumSectionType | "none" | enumSectionType[];
  Icon?: any;
  iconImgUrl?: string;
  isGroupItem: boolean;
  isActive?: boolean;
  subMenu?: MenuItem[];
};
export type stateType = {
  [key in "available" | "booked" | "out" | "draft"]: {
    title: string;
    color: string;
    blurColor: string;
  };
};
export type timeInfo = {
  intTime: number;
  startTime: number;
  pireodLength: number;
  endTime: number;
  firstHalf: boolean;
  secondHalf: boolean;
};
export type DropDownMenuItem = {
  component?: (
    item: DropDownMenuItem,
    onClick: any,
    closeDropDown: any
  ) => React.ReactNode;
  name: string;
  tag: string;
  icon: LucideIcon | ComponentType<any>;
  color: string;
  onClick: () => void;
  isAsync: boolean;
  sections: string[];
  eventType: string;
};
export type coulmnsType = {
  title: string;
  tag: string;
  icon?: () => JSX.Element;
  sortFn?: (a: any, b: any) => any;
}[];

export type DictionaryType = typeof dictionaryType;

export type sectionType = [
  "Orders",
  "Roles",
  "Users",
  "Settings"
];
export type enumSectionType = sectionType[number];
export type RoutesConfig = {
  path: string;
  role: string[];
  title: string;
  redirect?: string;
  tag?: enumSectionType;
  icon?: (width?: number, height?: number) => JSX.Element;
  isMainPage?: boolean;
  element:  ReactNode;
  subNavs?: { [key: string]: string }[];
  hiddenQuery?: string[];
}[];
