import React, { useEffect, useState } from "react";
import { coulmnsType, tableConfig } from "../../types";
import { UserSliceType } from "../../lib/redux/slices/userSlice";
import { useSelector } from "react-redux";
//import Controll from "./Controll";
import createIcon from "../../assets/icons/CREATE.svg";
import Table from "../custom/tableWrapper/Table";
import { cn, splitDateTimeString } from "../../utils/utils";
import SideBar from "../global/SideBar";
//import PrivateCoachingSidebar from "./PrivateCoachingSidebar";
import { useGetDictionary } from "../../hooks/useGetDictionary";
import { DictionaryType } from "../../types";
import { useLocation } from "react-router-dom";
import OrderSidebar from "./OrderSidebar";
import Controll from "./Controll";

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
  const [rowId, setRowId] = useState<string>('');
  const [row, setRow] = useState<any>({});
  const location = useLocation();
  const config: tableConfig = {
    status: {
      isCustomViewChildren: true,
      customViewChildren: (row, tag) => {
        const bookingsStatusStyle = [
          {
            name: "Draft",
            bgColor: "bg-primary",
            textColor: "text-[#CBDB2A]",
            label: shared.draft,
          },
          {
            name: "approved",
            bgColor: "bg-[#1e1850]",
            textColor: "text-[#CBDB2A]",
            label: "Approved",
          },
          {
            name: "completed",
            bgColor: "bg-[#34C759]",
            textColor: "text-primary dark:text-white",
            label: "Completed",
          },
          {
            name: "fraza delivered",
            bgColor: "bg-[#34C759]",
            textColor: "text-primary dark:text-white",
            label: 'يتم الفرز',
          },
          {
            name: "qsasa delivered",
            bgColor: "bg-[#34C759]",
            textColor: "text-primary dark:text-white",
            label: 'يتم القص',
          },
           {
            name: "return recorded",
            bgColor: "bg-[#34C759]",
            textColor: "text-primary dark:text-white",
            label: 'تم الارجاع',
          },
          {
            name: "created",
            bgColor: "bg-secondary",
            textColor: "text-primary dark:text-white",
            label: shared.pending,
          },
           {
            name: "pending",
            bgColor: "bg-secondary",
            textColor: "text-primary dark:text-white",
            label: shared.pending,
          },
          {
            name: "cancelled",
            bgColor: "bg-[#EF4626]",
            textColor: "text-white",
            label: shared.canceled,
          },
        ];
        console.log(row?.stage?.name);
        
        const bookingStatus = bookingsStatusStyle.find(
          (e) => (e.name === row?.stage?.name?.toLowerCase() )|| e.name ===row?.status?.toLowerCase()
        );
        return (
          <td className="flex-1 p-4  min-w-[150px] text-center">
            <div
              className={cn(
                "grid place-content-center px-4 py-2 rounded-3xl w-[100px] mx-auto",
                `${bookingStatus?.bgColor} ${bookingStatus?.textColor}`
              )}
            >
              {bookingStatus?.label || row[tag]}
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
              <Controll
                row={row}
                tag={tag}
                setRow={setRow}
                setRowId={setRowId}
                setSidebarOpen={setSidebarOpen}
                clubId={clubId}
                setIsModelTriggered={setIsModelTriggered}
                setActionType={setActionType}

               
              />
            </div>
          </td>
        );
      },
    },
    coach_id: {
      hasImg: true,
      imgValueKey: "coach_id.image",
      customClassName: "flex flex-col gap-2 items-center justify-center p-4",
    },

    start_time: {
      isCustomViewChildren: true,
      customViewChildren: (row, tag) => {
        const dateParts = splitDateTimeString(row[tag], lang);
        return (
          <td className="flex-1 p-4">
            {dateParts.day} {dateParts.month} {dateParts.year} {dateParts.at}{" "}
            {dateParts.time}
          </td>
        );
      },
    },

    court_type: {
      isCustomViewChildren: true,
      customViewChildren: (row, tag) => {
        return (
          <td className=" flex-1 p-4   ">
            {/* @ts-ignore */}
            {options[row.court_id.court_type]}
          </td>
        );
      },
    },
    gender: {
      isCustomViewChildren: true,
      customViewChildren: (row, tag) => {
        return (
          <td className=" flex-1  p-4  ">
            {/* @ts-ignore */}
            {options[row.gender.toLowerCase()]}
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
      {sidebarOpen && (
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
          <OrderSidebar
            type={actionType}
            setOpenModal={setOpenModal}
            selectedCalenderSlot={selectedCalenderSlot}
            setSelectedCalenderSlot={setSelectedCalenderSlot}
            tableId={rowId}
            rowData={row}
          />
        </SideBar>
      )}
      <Table
        columnsData={columns}
        rowData={data?.data?.orders}
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
          setRowId(row._id);
        }}
      />
    </div>
  );
}

export default OrderTable;
