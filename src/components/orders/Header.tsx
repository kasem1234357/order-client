import React, { useEffect, useRef, useState } from "react";
import PrintIcon from "../../assets/icons/print.svg";
import { useNavigate } from "react-router-dom";
import { ImgIcon } from "../../utils/utils";
import { generateMenu } from "../../utils/MenuGenerator";
import DropDownBox from "../custom/DropDownBox/DropDownBox";
import creataIcon from "../../assets/icons/CREATE.svg";
//import { FilterBox } from "../../config/menuConfig";
import useOutsideClick from "../../hooks/useOutsideClick";
//import ClubsSidebar from './clubsSidebar/ClubsSidebar';
import useExport from "../../hooks/useExport";
import { toast } from "react-toastify";
// import AddOnsSidebar from './AddOnsSidebar';
import { useSelector } from "react-redux";
import { UserSliceType } from "../../lib/redux/slices/userSlice";

import dictionary from "../../dictionary/dictionary.json";
import SideBar from "../global/SideBar";
import { useGetDictionary } from "../../hooks/useGetDictionary";
import { DictionaryType } from "../../types";
import DynamicFilter, { FilterConfig } from "../global/DynamicFilter";
//import PrivateCoachingSidebar from "./PrivateCoachingSidebar";
import { useGetAllCourtsByNameQuery } from "../../lib/redux/services/sections/Courts";

import PrintButton from "../global/PrintButton";

import AddForIcon from "../../assets/icons/AddForIcon";
import CreateIcon from "../../assets/icons/CreateIcon";
import ImageIcon from "../global/ImageIcon";
import ExportIcon from "../../assets/icons/ExportIcon";
import FilterIcon from "../../assets/icons/FilterIcon";
import SearchIcon from "../../assets/icons/SearchIcon";
import Modal from "../global/Modal";

import { useGetAllPrivateCoachesQuery } from "../../lib/redux/services/sections/Coaches";
import { useDebounce } from "../../hooks/useDebounce";
import ExportButton from "../global/ExportButton";
import { useViewport } from "../../hooks/useViewport";
import { MOBILE_VIEW_ENDPOINT } from "../../constants";
import PlusIcon from "../../assets/icons/PlusIcon";
import OrderSidebar from "./OrderSidebar";
import { useGetAllOrdersQuery } from "../../lib/redux/services/Api";

type Props = {
  id: string | number;
  data: any;
  filter: any;
  search: any;
  setFilter: React.Dispatch<React.SetStateAction<Object>>;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  setLimitedFields: React.Dispatch<React.SetStateAction<string[]>>;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  selectedCalenderSlot: any;
  setSelectedCalenderSlot: any;
};

function Header({
  id,
  data,
  setSearch,
  setFilter,
  setLimitedFields,
  setOpenModal,
  selectedCalenderSlot,
  setSelectedCalenderSlot,
  filter,
  search,
}: Props) {
  const {
    leagues_tournaments,
    Academy,
    shared,
    coaches,
    inputs,
  }: DictionaryType = useGetDictionary();
  const [successModal, setSuccessModal] = useState(false);
  const [successModalProps, setSuccessModalProps] = useState<any>(null);
  const [sidebarType, setSidebarType] = useState<
    "new" | "edit" | "add player" | "duplicate" | "view"
  >("new");
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [matchType, setMatchType] = useState<"public" | "private">("public");
  const { generateExcelFile } = useExport();
  const clubId = useSelector((state: UserSliceType) => state.user.selectedClub);

  const Roles = useSelector(
    //@ts-ignore
    (state: UserSliceType) => state.user.currentPremission
  );
  const navigate = useNavigate();
  const openSidebar = (props: any) => {
    setSidebarOpen(true);
    setMatchType(props.matchType);
  };
  const dropDownRef2 = useRef<HTMLButtonElement>(null);
  const [openDropDown2, setOpenDropDown2] = useState<boolean>(false);
  const closeDropDown2 = () => {
    setOpenDropDown2(false);
  };
  useOutsideClick(dropDownRef2, closeDropDown2);

  const servicesConfig: FilterConfig = [
    {
      type: "number",
      name: "orderNumber",
      label: 'order Number',
    },
    {
      type: "select",
      name: "stage",
      label: "stage",
      options: [
        { label: "Pending", value: "Created" },
        { label: "Completed", value: "Completed" },
      
        {label:'في الفرز', value:"Fraza Delivered"},
        {label:'في القص', value:"Qsasa Delivered"},
        {label:'مرتجع', value:"Return Recorded"},
        { label: "Cancelled", value: "Cancelled" },
      ],
    },
    {
      type: "number",
      name: "price",
      label: 'price',
    },
    { type: "date", name: "createdAt", label: "order date" },
    { type: "date", name: "invoiceDate", label: "invoice date" },
    { type: "date", name: "deliveryDate", label: "delivery date" },
    {
      type: "text",
      name: "clientName",
      label: "Client Name",
    },
    {
      type: "text",
      name: "createdBy",
      label: "Created By",
    },
  ];
  const FilterBox2 = [
    {
      name: "Filter",
      tag: "filter",
      icon: AddForIcon,
      action: "any",
      color: "#1e1850",
    },
  ];

  const filterDropDown = generateMenu(
    FilterBox2,
    {},
    {
      filter: {
        //@ts-ignore
        component: (item, onClick, closeDropDown) => {
          return (
            <div
              style={{ direction: "rtl" }}
              className=" max-h-60 overflow-y-auto customScroll px-3 py-2"
              //@ts-ignore
              ref={dropDownRef2}
            >
              <div style={{ direction: "ltr" }} className="min-h-52">
                <div
                  className="text-right text-red-500 cursor-pointer"
                  onClick={() => {
                    setFilter({});
                  }}
                >
                  {shared.reset}
                </div>

                <DynamicFilter
                  config={servicesConfig}
                  onChange={(filters) => {
                    setFilter((prev) => {
                      return { ...prev, ...filters };
                    });
                  }}
                />
              </div>
            </div>
          );
        },
      },
    }
  );
  useEffect(() => {
    setSelectedCalenderSlot(null);
  }, [sidebarOpen]);
  const [startExporting, setStartExporting] = useState(false);
  const {
    data: privateCoachingData,
    isLoading,
    isFetching,
    isUninitialized,
    refetch,
    isSuccess,
  } = useGetAllPrivateCoachesQuery(
    {
      club_id: clubId,
      limit: 5000,
      name: useDebounce(search),
      ...filter,
    },
    {
      skip: !startExporting,
    }
  );
  useEffect(() => {
    console.log(privateCoachingData);

    if (isSuccess && privateCoachingData) {
      if (
        !privateCoachingData ||
        !privateCoachingData?.data ||
        privateCoachingData?.data?.length === 0
      ) {
        toast.error("No data to export");
      } else {
        generateExcelFile(
          [...privateCoachingData?.data],
          `private-coaching-${id}`
        );
        toast.success("Exported successfully");
      }
      setStartExporting(false);
    }
  }, [isSuccess, privateCoachingData]);
  const { sizeInfo, isMobile } = useViewport();
  return (
    <div className="">
      <div className="flex gap-4 items-center justify-between w-full overflow-x-auto customScroll py-2 mobile:flex-col-reverse mobile:items-start mobile:pt-0">
        <div className="mobile:flex mobile:justify-between mobile:items-center mobile:w-full">
          <h3 className="text-lg text-primary dark:text-white pl-3 font-bold">
            {coaches["coach_game_title"]}
          </h3>
          {sizeInfo.currentWidth < MOBILE_VIEW_ENDPOINT && (
            <div className="flex gap-1 items-center">
              <PrintButton />
              <ExportButton
                fileName={`orders`}
                getFunction={useGetAllOrdersQuery}
                getFunctionParams={{
                  club_id: clubId,
                  limit: 1000,
                  name: search,
                  ...filter,
                }}
              />
            </div>
          )}
        </div>

        <div className="flex gap-4 items-center mobile:w-full">
          <div className="controll flex gap-2 items-center flex-2  mobile:w-full">
            {/* <div className="flex gap-2 items-center bg-[#F3F3F3] dark:bg-primaryLight p-1 rounded-md border border-main-1 mobile:w-full">
              <ImageIcon Icon={SearchIcon} width={35} />
              <input
                type="text"
                className="text-main-1 p-2 font-normal tracking-wider text-lg outline-none border-none bg-transparent focus:border-none focus:outline-none w-auto"
                placeholder={shared.search}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
              />
            </div> */}
            {!(sizeInfo.currentWidth < MOBILE_VIEW_ENDPOINT) && (
              <>
                <PrintButton />
                <ExportButton
                  fileName={`orders`}
                  getFunction={useGetAllOrdersQuery}
                  getFunctionParams={{
                    club_id: clubId,
                    limit: 5000,
                    name: search,
                    ...filter,
                  }}
                />
              </>
            )}

            <button
              className="flex gap-2 items-center bg-[#F3F3F3] dark:bg-primaryLight p-2 rounded-md border border-main-1"
              onClick={() => {
                setOpenDropDown2((prev) => !prev);
              }}
            >
              <ImageIcon Icon={FilterIcon} width={32} />
            </button>
            {openDropDown2 && (
              <DropDownBox
                dropDownConfig={filterDropDown}
                title=""
                closeDropDown={closeDropDown2}
                className="absolute top-[190px] ltr:right-[5px] dark:bg-primary rtl:left-[5px] z-50 w-fit"
              />
            )}
            {!(sizeInfo.currentWidth < MOBILE_VIEW_ENDPOINT) &&
               
                <div>
                  <button
                    className="flex gap-2 items-center bg-primary dark:bg-primaryYellow dark:text-primary p-2 px-4 rounded-md border border-main-1 text-white"
                    onClick={() => {
                      setSidebarOpen(true);
                    }}
                  >
                    {<CreateIcon />} {shared.create}
                  </button>
                </div>
              }
          </div>
        </div>
      </div>
      {sizeInfo.currentWidth < MOBILE_VIEW_ENDPOINT &&
        !sidebarOpen &&
       
          <div
            className="fixed w-[50px] h-[50px] rounded-full bg-primary bottom-[85px] right-5 text-white grid place-content-center cursor-pointer z-[60]"
            onClick={() => {
              setSidebarOpen(true);
            }}
          >
            <PlusIcon width={"30px"} height={"30px"} />
          </div>
        }
      {sidebarOpen && (
        <SideBar
          setSidebarOpen={setSidebarOpen}
          sidebarOpen={sidebarOpen}
          headerImage={creataIcon}
          headerTitle={shared.create}
          sideBarMaxWidth={"max-w-[895px]"}
        >
          <OrderSidebar
            id={clubId}
            type={sidebarType}
            setOpenModal={setOpenModal}
            selectedCalenderSlot={selectedCalenderSlot}
            setSelectedCalenderSlot={setSelectedCalenderSlot}
            openSuccessModal={(props) => {
              setSuccessModalProps({
                ...props,
                setSidebarType,
                openSidebar: () => setSidebarOpen(true),
              });
              setSuccessModal(true);
            }}
          />
        </SideBar>
      )}

    </div>
  );
}

export default Header;
