import React, { useEffect, useState } from "react";
import { coulmnsType, tableConfig } from "../../types";
import { UserSliceType } from "../../lib/redux/slices/userSlice";
import { useSelector } from "react-redux";
//import Controll from "./Controll";
import createIcon from "../../../assets/icons/CREATE.svg";
import Table from "../custom/tableWrapper/Table";
import { cn, splitDateTimeString } from "../../utils/utils";
import SideBar from "../global/SideBar";
//import PrivateCoachingSidebar from "./PrivateCoachingSidebar";
import { useGetDictionary } from "../../hooks/useGetDictionary";
import { DictionaryType } from "../../types";
import { useLocation } from "react-router-dom";

type Props = {
  data: any;
  columns: coulmnsType;
  clubId: number;
  limitedFields?: string[];
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  selectedCalenderSlot: any;
  setSelectedCalenderSlot: any;
};
function OrderTable({
  data,
  columns,
  limitedFields,
  setOpenModal,
  selectedCalenderSlot,
  setSelectedCalenderSlot,
}: Props) {
  const { shared, Academy, options }: DictionaryType = useGetDictionary();
  const clubId = useSelector((state: UserSliceType) => state.user.selectedClub);
  const lang = useSelector((state: any) => state?.user?.lang);
  const [isModelTriggered, setIsModelTriggered] = useState<boolean>(false);
  const [actionType, setActionType] = useState<
    "edit" | "add player" | "duplicate" | "view"
  >("edit");
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [rowId, setRowId] = useState<number>(0);
  const [row, setRow] = useState<any>({});
  const location = useLocation();
  const config: tableConfig = {
     isActive: {
          isCustomViewChildren: true,
          customViewChildren: (row, tag) => {
          
            
            return (
              <td className="flex-1 p-4  min-w-[150px] text-center">
                <div
                  className={cn(
                    "grid place-content-center px-4 py-2 rounded-3xl w-[100px] mx-auto",
                    row[tag]
                      ? "bg-[#34C759] text-primary dark:text-white"
                      : "text-[#F3F3F3] bg-[#EF4626]"
                  )}
                >
                  {row[tag]? 'Active': "inActive"}
                </div>
              </td>
            );
          },
        },
    //    controll: {
    //        isCustomViewChildren: true,
    //        customViewChildren: (row, tag) => {

    //                return <BookingControll row={row} tag={tag} setRow={setRow} setSidebarOpen={setSidebarOpen}  clubId={clubId} setActionType = {setActionType} setIsModelTriggered={setIsModelTriggered} />

    //        }
    //    },

    controll: {
      isCustomViewChildren: true,
      customViewChildren: (row, tag) => {
        return (
          <td
            onClick={(e) => {
              e.stopPropagation();
            }}
            className=" flex-1  relative  "
          >
            <div className="flex  justify-center items-center ">
              {/* <Controll
                row={row}
                tag={tag}
                setRow={setRow}
                setRowId={setRowId}
                setSidebarOpen={setSidebarOpen}
                clubId={clubId}
                setIsModelTriggered={setIsModelTriggered}
                setActionType={setActionType}
              /> */}
            </div>
          </td>
        );
      },
    },

  };
  const view = (row: any) => {
    console.log(window.location.pathname);
    setSidebarOpen(true);
    setActionType(row.action_type);
    setRow(row);
  };
  useEffect(() => {
    console.log(location.state);
    if (location.state && location.state.event_id !== 0) {
      console.log(location.state);

      setRowId(location.state?.event_id);
      view({
        event_id: location.state?.event_id,
        action_type: location.state?.type || "view",
      });
    }
  }, [location]);
  useEffect(() => {
    setSelectedCalenderSlot(null);
  }, [sidebarOpen]);
  return (
    <div className=" fixed-table customer-table printContainer ">
      {/* {sidebarOpen && (
        <SideBar
          setSidebarOpen={setSidebarOpen}
          sidebarOpen={sidebarOpen}
          headerImage={createIcon}
          headerTitle={
            actionType === "edit" || actionType === "add player"
              ? shared.edit
              : shared.create
          }
          sideBarMaxWidth={"max-w-[895px]"}
        >
          <PrivateCoachingSidebar
            type={actionType}
            setOpenModal={setOpenModal}
            selectedCalenderSlot={selectedCalenderSlot}
            setSelectedCalenderSlot={setSelectedCalenderSlot}
            tableId={rowId}
            rowData={row}
          />
        </SideBar>
      )} */}
      <Table
        columnsData={columns}
        rowData={data?.data?.users}
        config={config}
        generalCellColumnClassName="  "
        generalCellRowClassName="  min-w-[150px] w- overflow-hidden text-center "
        generalRowClassName=" text-center hover:bg-gray-200 dark:hover:bg-primaryLight hover:cursor-pointer transition duration-300"
        generalColumnsClassName=" bg-[#F3F3F3] text-primary dark:text-white  static text-center "
        tbodyClassName={cn(
          data?.length > 0 &&
            data?.length < 2 &&
            isModelTriggered &&
            "min-h-[400px] "
        )}
        limitedFields={limitedFields || []}
        rowAction={(row: any, index: number) => {
          setSidebarOpen(true);
          setActionType("view");
          setRow(row);
          setRowId(row.id);
        }}
      />
    </div>
  );
}

export default OrderTable;
