import { LucideIcon } from "lucide-react";
import { ComponentType, ReactElement } from "react";
import { Dependencies, DropDownMenuItem, MASSEGE_MENU_Type } from "../types";

// MenuItem factory to generate each item with its specific callback logic
const createMenuItem = (
  name: string,
  tag: string,
  icon: LucideIcon | ComponentType<any>,

  color: string,
  callbackFn: () => void,
  sections: string[],
  eventType: "read" | "write" | "create" | "delete" | "none",
  isAsync: boolean,
  translateSection: string | undefined,
  component?: (
    item: DropDownMenuItem,
    onClick: any,
    closeDropDown: any
  ) => React.ReactNode
) => ({
  name,
  tag,
  icon,
  color,
  onClick: callbackFn,
  sections,
  eventType,
  isAsync,
  translateSection,
  component,

  // Each item has its own `onClick` set here
});
export const generateMenu = (
  menuConfig: MASSEGE_MENU_Type[],
  dependencies: Dependencies,
  options?: {
    [key: string]: {
      component?: (
        item: DropDownMenuItem,
        onClick: any,
        closeDropDown: any
      ) => React.ReactNode;
    };
  }
) => {
  return menuConfig.map((item) => {
    let callbackFn;
    // Assign specific callback based on action type
    const handleNotFound = () => console.log(`${item.action} not found`);
    if (dependencies[item.action]?.isAsync) {
      callbackFn = async () =>
        (await dependencies[item.action]?.cb(
          dependencies[item.action].params
        )) || handleNotFound;
    } else {
      callbackFn = () =>
        dependencies[item.action]?.cb(dependencies[item.action].params) ||
        handleNotFound;
    }

    // Return a dynamically created menu item with the specific callback
    return createMenuItem(
      item.name,
      item.tag,
      item.icon,
      item.color,
      callbackFn,
      item.sections || [],
      item.eventType || "none",

      dependencies[item.action]?.isAsync || false,
      item.translateSection,
      options && options[item.tag]?.component
    );
  });
};

export default function generateRandomIDWithDate() {
  const currentDate = new Date();
  const timestamp = currentDate.getTime(); // Get current timestamp in milliseconds

  const randomPart = Math.floor(Math.random() * 10000); // Generating a random 4-digit number

  const randomID = +`${timestamp}${randomPart}`;
  return randomID;
}
