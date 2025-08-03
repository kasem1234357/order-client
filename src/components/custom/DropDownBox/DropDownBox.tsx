import { useSelector } from "react-redux";
import { useGetDictionary } from "../../../hooks/useGetDictionary";
import { DictionaryType, DropDownMenuItem } from "../../../types";
import { checkRole } from "../../../utils/checkRole";
import { cn } from "../../../utils/utils";
import { UserSliceType } from "../../../lib/redux/slices/userSlice";
const testRoles = [{}];
function DropDownBox({
  dropDownConfig,
  title,
  closeDropDown,
  className,
}: {
  title?: string;
  dropDownConfig: DropDownMenuItem[];
  closeDropDown: () => void;
  className?: string;
}) {
  const Dict: DictionaryType = useGetDictionary();
  // const Roles = useSelector(
  //   //@ts-ignore
  //   (state: UserSliceType) => state.user.currentPremission
  // );

  return (
    <div
      className={cn(
        "absolute  flex flex-col gap-2 -right-4 top-6 bg-white p-3 pr-6 text-white-500 rounded-md text-sm z-50  shadow-md",
        className
      )}
    >
      {title && (
        <>
          <h4>{title}</h4>
          <hr />
        </>
      )}

      <ul className="flex flex-col list-none whitespace-nowrap ">
        {dropDownConfig.map((item) => {
          //@ts-ignore
          // const isAllowed = checkRole(item.eventType, item.sections, Roles);
          console.log(item);

          //@ts-ignore

          // const itemEventType = item.eventType;
          //
          // let isInvalid = false;
          // item.sections.forEach((section)=>{
          //   //@ts-ignore
          //      const sectionRoles = testRoles?.find((role)=>role?.section === section)
          //

          //      if(sectionRoles){
          //
          //

          //          if(sectionRoles[itemEventType as keyof typeof sectionRoles] === false){
          //

          //            isInvalid = true;
          //          }
          //      }

          // })
          // if(isInvalid){
          //   return
          // }
          //
          // if (!isAllowed) {
          //   return;
          // }
          return (
            <li
              className={cn(
                "flex gap-1 py-2 items-center cursor-pointer  hover:bg-gray-100 dark:hover:bg-primaryLight p-2 rounded-md",
                item.component && "hover:bg-inherit p-0"
              )}
              onClick={async () => {
                if (!item.component) {
                  item.isAsync ? await item.onClick() : item.onClick();
                  // closeDropDown();
                }
              }}
              key={item.tag}
            >
              {item.component ? (
                item.component(item, item.onClick, closeDropDown)
              ) : (
                <>
                  <item.icon size={18} strokeWidth={3} />
                  <p
                    className={cn(
                      "text-[color:var(--item-color)]",
                      "dark:text-white"
                    )}
                    style={{ ["--item-color" as any]: item.color }}
                  >
                    {/* @ts-ignore */}
                    {(item.translateSection &&
                      // @ts-ignore
                      Dict[item.translateSection] &&
                      // @ts-ignore
                      Dict[item.translateSection].table_menu &&
                      // @ts-ignore
                      Dict[item.translateSection].table_menu[item.name]) ||
                      item.name}
                  </p>{" "}
                </>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default DropDownBox;
