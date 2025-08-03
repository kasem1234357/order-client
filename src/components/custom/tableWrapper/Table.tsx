import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { tableConfig } from "../../../types";
import parse from "html-react-parser";
import { cn } from "../../../utils/utils";
import BallIcon from "../../../assets/icons/ball.svg";
import { useScrollDetection } from "../../../hooks/useScrollDetection";
import { useViewport } from "../../../hooks/useViewport";
type props = {
  columnsData: {
    title: string;
    tag: string;
    icon?: () => JSX.Element;
    htmlElement?: () => JSX.Element;
    sortFn?: (a: any, b: any) => any;
  }[];
  rowData: {
    [key: string]: any;
  }[];
  config?: tableConfig;
  generalRowClassName?: string;
  limitedFields?: string[];
  theadClassName?: string;
  tbodyClassName?: string;
  generalColumnsClassName?: string;
  rowAction?: (row: any, index: number) => void;
  generalCellRowClassName?: string;
  generalCellColumnClassName?: string;
  tableClassName?: string;
  updateScrollInfo?: any;
};
type TrElementProps = {
  limitedFields?: string[];
  columnsData: {
    title: string;
    tag: string;
    icon?: () => JSX.Element;
    sortFn?: (a: any, b: any) => any;
  }[];
  row: {
    [key: string]: any;
  };
  config?: tableConfig;
  generalRowClassName?: string;
  offset: {};
  rowIndex: number;
  rowAction?: (row: any, index: number) => void;
  generalCellRowClassName?: string;
};
const TrElement = ({
  rowAction,
  rowIndex,
  row,
  generalRowClassName,
  offset,
  columnsData,
  config,
  generalCellRowClassName,
  limitedFields,
}: TrElementProps) => {
  const [currentTrStyle, setCurrentTrStyle] = useState<string>("");

  const styleSetRef = useRef(false); // Prevent multiple style sets

  const handleStyle = useCallback(
    (style: string) => {
      styleSetRef.current = true;
      setCurrentTrStyle(style);
    },
    [currentTrStyle]
  );

  useEffect(() => {
    styleSetRef.current = false; // Reset on unmount
  }, []);

  return (
    <tr
      onClick={() => {
        rowAction && rowAction(row, rowIndex);
      }}
      className={cn(
        `py-4 border-b  text-primary dark:text-white w-full flex items-center`,
        generalRowClassName,
        currentTrStyle
      )}
      //@ts-ignore
    >
      {columnsData.map((coulmn, index) => {
        if (
          limitedFields &&
          limitedFields.length > 0 &&
          limitedFields?.includes(coulmn.tag)
        ) {
          return null;
        }
        const customView =
          config?.[getcoulmnTag(coulmn.tag)]?.isCustomViewChildren &&
          config?.[getcoulmnTag(coulmn.tag)]?.customViewChildren!(
            row,
            coulmn.tag,
            (style: string) => {
              // Defer style update to useEffect
              setTimeout(() => handleStyle(style), 0);
              return null;
            },
            rowIndex,
            offset
          );

        if (customView) return customView;

        if (config?.[getcoulmnTag(coulmn.tag)]?.valueKeys) {
          return (
            <td
              key={index}
              className={cn(
                "flex-1 p-4 flex items-center mobile:px-1",
                generalCellRowClassName,
                config?.[getcoulmnTag(coulmn.tag)]?.tdClassName
              )}
            >
              {config?.[getcoulmnTag(coulmn.tag)]?.valueKeys?.map((item) => {
                if (config?.[item]?.isBoolValue) {
                  return (
                    <>
                      <SetElementType
                        type={"button"}
                        className={cn(
                          config?.[getcoulmnTag(coulmn.tag)]?.customClassName,
                          row[item]
                            ? config?.[item]?.EnumBoolValue?.truethlyClassNames
                            : config?.[item]?.EnumBoolValue?.falsyClassNames
                        )}
                      >
                        {config?.[item]?.hasImg ? (
                          <img
                            loading="lazy"
                            src=""
                            width={50}
                            height={50}
                            className="rounded-full object-cover"
                          />
                        ) : null}
                        {row[item]
                          ? config?.[item]?.EnumBoolValue?.inTrue
                          : config?.[item]?.EnumBoolValue?.inFalse}
                      </SetElementType>{" "}
                      {config?.[getcoulmnTag(coulmn.tag)]?.spliter}
                    </>
                  );
                }
                return (
                  <SetElementType
                    type={"span"}
                    key={item}
                    className={cn(
                      //w-[130px]
                      "p-4  mx-auto",
                      config?.[getcoulmnTag(coulmn.tag)]?.hasImg &&
                        "flex gap-2 items-center  ",
                      config?.[getcoulmnTag(coulmn.tag)]?.customClassName
                    )}
                  >
                    {" "}
                    {getItemValue(item, row) ||
                      config?.[getcoulmnTag(coulmn.tag)]?.emptyValue ||
                      "-"}
                    {row[item]} {config?.[getcoulmnTag(coulmn.tag)]?.spliter}{" "}
                  </SetElementType>
                );
              })}
            </td>
          );
        }
        if (config?.[getcoulmnTag(coulmn.tag)]?.isBoolValue) {
          return (
            <td className={cn("flex", "flex-1 p-4", generalCellRowClassName)}>
              <SetElementType
                type={"button"}
                className={cn(
                  config?.[getcoulmnTag(coulmn.tag)]?.customClassName,
                  row[getcoulmnTag(coulmn.tag)]
                    ? config?.[getcoulmnTag(coulmn.tag)]?.EnumBoolValue
                        ?.truethlyClassNames
                    : config?.[getcoulmnTag(coulmn.tag)]?.EnumBoolValue
                        ?.falsyClassNames
                )}
              >
                {config?.[getcoulmnTag(coulmn.tag)]?.hasImg ? (
                  <img
                    loading="lazy"
                    src={
                      row[
                        config?.[getcoulmnTag(coulmn.tag)]?.imgValueKey || ""
                      ] || BallIcon
                    }
                    width={30}
                    height={330}
                  />
                ) : null}
                {row[getcoulmnTag(coulmn.tag)]
                  ? config?.[getcoulmnTag(coulmn.tag)]?.EnumBoolValue?.inTrue
                  : config?.[getcoulmnTag(coulmn.tag)]?.EnumBoolValue?.inFalse}
              </SetElementType>
            </td>
          );
        }
        return (
          <td
            className={cn(
              "flex-1  justify-center",
              generalCellRowClassName,
              config?.[getcoulmnTag(coulmn.tag)]?.customClassName
            )}
          >
            {" "}
            <SetElementType
              type={config?.[getcoulmnTag(coulmn.tag)]?.htmlElementType}
              className={cn(
                // w-[130px]
                "p-4  mx-auto",
                config?.[getcoulmnTag(coulmn.tag)]?.hasImg &&
                  "flex gap-2 items-center  "
              )}
            >
              {config?.[getcoulmnTag(coulmn.tag)]?.hasImg ? (
                <img
                  loading="lazy"
                  src={
                    row[
                      config?.[getcoulmnTag(coulmn.tag)]?.imgValueKey || ""
                    ] || BallIcon
                  }
                  width={30}
                  height={30}
                  className="rounded-full object-cover aspect-square w-[30px] h-[30px]"
                />
              ) : null}{" "}
              {getItemValue(coulmn.tag, row) ||
                config?.[getcoulmnTag(coulmn.tag)]?.emptyValue ||
                "-"}
            </SetElementType>
          </td>
        );
      })}
    </tr>
  );
};

const SetElementType = (props: any) => {
  switch (props.type) {
    case "button":
      return <button {...props}>{props.children}</button>;
      break;
    case "p":
      return <p {...props}>{props.children}</p>;
      break;
    case "span":
      return <span {...props}>{props.children}</span>;
      break;
    case "h1":
      return <h1 {...props}>{props.children}</h1>;
      break;
    case "h2":
      return <h2 {...props}>{props.children}</h2>;
      break;
    case "h3":
      return <h3 {...props}>{props.children}</h3>;
      break;

    case "h4":
      return <h4 {...props}>{props.children}</h4>;
      break;
    case "div":
      return <div {...props}>{props.children}</div>;
      break;
    default:
      return <p {...props}>{props.children}</p>;
      break;
  }
};
const getItemValue = (item: string, row: any) => {
  let parentKey = "";
  let childKey = "";
  if (item.indexOf(".") !== -1) {
    parentKey = item.split(".")[0];
    childKey = item.split(".")[1];
    if (row[parentKey]?.length) {
      return row[parentKey].map((item: any) => item[childKey]).join(" ");
    } else {
      return row[parentKey][childKey];
    }
  } else {
    return row[item] ? row[item].toString() : "";
  }
};
const getcoulmnTag = (tag: string) => {
  if (tag.indexOf(".") !== -1) {
    return tag.split(".")[0];
  } else {
    return tag;
  }
};
const Table = ({
  columnsData,
  rowData,
  limitedFields = [],
  config,
  theadClassName,
  tbodyClassName,
  rowAction,
  generalColumnsClassName = "",
  generalRowClassName = "",
  generalCellRowClassName = "",
  generalCellColumnClassName = "",
  tableClassName = "",
  updateScrollInfo,
}: props) => {
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const bodyRef = useRef<HTMLTableSectionElement>(null);
  const [scrollX, setScrollX] = useState(0);
  const [offsetLeft, setOffsetLeft] = useState(0);
  const {isLandscapeOrientation,isMobile} = useViewport()
  const [offsetTop, setOffsetTop] = useState(0);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  useScrollDetection(bodyRef, updateScrollInfo);
  const sortedData = useMemo(() => {
    if (!sortColumn) return rowData;
    return rowData.sort((a, b) => {
      const aValue = a[sortColumn];
      const bValue = b[sortColumn];
      if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
      if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });
  }, []);
   
  // useEffect(() => {
  //   const handler = setTimeout(() => {
  //     setOffsetLeft(scrollX);
  //   }, 0);

  //   return () => {
  //     clearTimeout(handler);
  //   };
  // }, [scrollX, 0]);
  return (
    <table
      className={cn(
        "w-full mt-5 p-2 border-[0.5px] border-white overflow-hidden overflow-x-auto flex flex-col customScroll rounded-lg mobile:mt-0",
        tableClassName
      )}
      onScroll={(e) => {
        //@ts-ignore

        //@ts-ignore
        if (setOffsetLeft.x > e.target.scrollLeft) {
          setOffsetLeft({
            //@ts-ignore
            x: e.target.scrollLeft - 150,
            dir: "left",
          });
        } else {
          setOffsetLeft({
            //@ts-ignore
            x: e.target.scrollLeft,
            dir: "right",
          });
        }
      }}
    >
      <thead
        className={cn(
          "  pb-0 bg-white dark:bg-primary  w-full flex mobile:text-[12px]",
          theadClassName
        )}
      >
        <tr
          className={cn(
            generalColumnsClassName,
            "w-full dark:bg-primaryLight flex "
          )}
        >
          {columnsData.map(
            (column,index) =>
              !limitedFields?.includes(column.tag) && (
                <th
                  key={`${column.tag}-${column.title}-${index}`}
                  className={cn(
                    "p-4  flex-1 mobile:px-1",
                    generalCellColumnClassName,
                    config?.[column.tag]?.columnCellClassName
                  )}
                >
                  {column.icon && <column.icon />}
                  <p> {parse(column.title)}</p>
                  {column.htmlElement && <column.htmlElement />}
                </th>
              )
          )}
        </tr>
      </thead>

      <tbody
        ref={bodyRef}
        className={cn(
          "w-full border bg-white dark:bg-primary rounded-b-md  flex flex-col overflow-y-auto  customScroll",isLandscapeOrientation() &&isMobile && '!min-h-[calc(100dvw-520px)] max-h-[auto]',
          tbodyClassName
        )}
        onScroll={(e) => {
          setOffsetTop({
            //@ts-ignore
            y: e.target.scrollTop,
          });
        }}
      >
        {rowData &&
          rowData?.map((row, index) => {
            return (
              <React.Fragment key={`${index}-${row?.id || row?.time}-tr`}>
                <TrElement
                  rowAction={rowAction}
                  rowIndex={index}
                  offset={{ offsetLeft, offsetTop }}
                  limitedFields={limitedFields}
                  row={row}
                  generalRowClassName={generalRowClassName}
                  columnsData={columnsData}
                  config={config}
                  generalCellRowClassName={generalCellRowClassName}
                />
              </React.Fragment>
            );
          })}
      </tbody>
    </table>
  );
};
export default Table;
