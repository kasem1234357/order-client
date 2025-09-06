import { Dispatch, SetStateAction, useRef, useState } from "react";
import DropDownBox from "../custom/DropDownBox/DropDownBox";
import { useNavigate } from "react-router-dom";
import useOutsideClick from "../../hooks/useOutsideClick";
import {
  useActivateUserMutation,
  useActivationRoleMutation,
  useApproveOrderStageMutation,
  useUpdateOrderStageMutation,
} from "../../lib/redux/services/Api";
import { generateMenu } from "../../utils/MenuGenerator";
import { ordersMenu } from "../../config/menuConfig";
import { toastMessage } from "../../utils/utils";
import { toast } from "react-toastify";
import deactivateIcon from "../../assets/icons/DELETE __ DARK Red.svg";

import ModalButton from "../global/ModalButton";
import pricingGreen from "../../assets/icons/pricingGreen.svg";
import ActionModal from "../global/ActionModal";
import { useGetDictionary } from "../../hooks/useGetDictionary";
import { DictionaryType } from "../../types";
import ImageIcon from "../global/ImageIcon";
import MenuIcon from "../../assets/icons/MenuIcon";
import CancelModal from "../global/CancelModal";
import StageModal from "../global/StageModal";
import EditIcon from "../../assets/icons/EditIcon";
import CompleteModal from "../global/ComplateModal";
import ApproveModal from "../global/ApproveModal";
const Controll = ({
  row,
  tag,
  setRow,
  setActionType,
  setSidebarOpen,

  setIsModelTriggered,
  setRowId,
}: {
  row: any;
  setActionType: any;
  tag: string;
  setRow: React.Dispatch<any>;
  setSidebarOpen: Dispatch<SetStateAction<boolean>>;
  clubId: number;
  setRowId: any;
  setIsModelTriggered: Dispatch<SetStateAction<boolean>>;
}) => {
  const navigate = useNavigate();
  const { clubs, shared }: DictionaryType = useGetDictionary();
  const [openModel, setOpenModel] = useState<boolean>(false);
  const tdRef = useRef<HTMLTableCellElement>(null);
  useOutsideClick(tdRef, () => {
    setOpenModel(false);
    setIsModelTriggered(false);
  });
  const [updateStage] = useUpdateOrderStageMutation();

  const refactorMenu = (menu:any)=>{
    if(row.status === 'Cancelled'){
      return menu.filter((item:any) =>item.eventType !== 'write')

    }
    return menu
  }
  const menu = generateMenu(refactorMenu(ordersMenu), {
    edit: {
      isAsync: false,
      params: {},
      cb: (props) => {
        setRow(row);
        setRowId(row._id);
        setActionType("edit");
        setSidebarOpen(true);
        setOpenModel(false);
      },
    },
    // approved: {
    //   cb: async () => {
    //     try {
    //       if (row?.stage?.name !== "Created" && row.isApproved) {
    //         if (row?.stage?.name === "Cancelled") {
    //           toast.warn('لا يمكنك الموافقة على طلب تم الغاءه سابقا')
    //           return;
    //         } else {
    //           toast.warn("لا يمكنك الموافقة على طلب تمت الموافقة عليه سابقا ");
    //           return;
    //         }
    //       }
    //       await toast.promise(
    //         aproveStage({ id: row._id, stage: row?.stage?.name }).unwrap(),
    //         toastMessage()
    //       );
    //     } catch (error) {
    //       console.log(error);
    //     }
    //   },
    //   params: {},
    //   isAsync: true,
    // },
    delete: {
      isAsync: true,
      params: {},
      cb: async (props) => {
        // try {
        //     const responseData = await toast.promise(
        //         deletePriceList({ id: row.id}).unwrap(),
        //         toastMessage()
        //     );
        // } catch (error) {
        //
        // }
      },
    },
    // complete: {
    //   cb: async () => {
    //     try {
         
    //         if (row?.stage?.name === "Cancelled") {
    //           toast.warn('لا يمكنك انهاء طلب تم الغاءه سابقا')
    //           return;
    //         } 
          
    //       await toast.promise(
    //         updateStage({ id: row._id, stage: "Completed" }).unwrap(),
    //         toastMessage()
    //       );
    //     } catch (error) {
    //       console.log(error);
    //     }
    //   },s
    //   params: {},
    //   isAsync: true,
    // },
  },{
    cancel: {
            component: () => {
              return (
                <div className="hover:bg-gray-100 dark:bg-primary dark:hover:bg-primaryLight w-full flex items-center px-2 rounded-md  py-1 ">
                  <ModalButton
                    buttonContent={
                      <div className=" w-full ">
                        <label className="flex flex-row gap-1 items-center justify-center w-full py-1 cursor-pointer">
                          <img loading="lazy" className="w-8" src={deactivateIcon} alt="" />

                          <p className={` text-sm text-primaryRed `}>
                            الغاء الطلب
                          </p>
                        </label>
                      </div>
                    }
                    modalContent={
                      <CancelModal
                         bookingId={row._id}
                          seriesId={row.series_id || 0}
                        cancellationHours={row.cancellation_policy_hours}
                         startTime={row.start_time}
                      />
                    }
                    modalMaxWidth="max-w-lg "
                  />
                </div>
              );
            },
          },
    Fraza: {
            component: () => {
              return (
                <div className="hover:bg-gray-100 dark:bg-primary dark:hover:bg-primaryLight w-full flex items-center px-2 rounded-md  py-1 ">
                  <ModalButton
                    buttonContent={
                      <div className=" w-full ">
                        <label className="flex flex-row gap-1 items-center justify-center w-full py-1 cursor-pointer">
                          <EditIcon/>

                          <p className={` text-sm  `}>
                           نقل الى الفرازة
                          </p>
                        </label>
                      </div>
                    }
                    modalContent={
                      <StageModal
                         orderId={row._id}
                         stage={'Fraza Delivered'}
                         label="نقل الى الفرازة"
                       
                      />
                    }
                    modalMaxWidth="max-w-lg "
                  />
                </div>
              );
            },
          },
           cutting: {
            component: () => {
              return (
                <div className="hover:bg-gray-100 dark:bg-primary dark:hover:bg-primaryLight w-full flex items-center px-2 rounded-md  py-1 ">
                  <ModalButton
                    buttonContent={
                      <div className=" w-full ">
                        <label className="flex flex-row gap-1 items-center justify-center w-full py-1 cursor-pointer">
                          <EditIcon/>

                          <p className={` text-sm  `}>
                           نقل الى القصاصة
                          </p>
                        </label>
                      </div>
                    }
                    modalContent={
                      <StageModal
                         orderId={row._id}
                         stage={'Qsasa Delivered'}
                         label="نقل الى القصاصة"
                       
                      />
                    }
                    modalMaxWidth="max-w-lg "
                  />
                </div>
              );
            },
          },
          return: {
            component: () => {
              return (
                <div className="hover:bg-gray-100 dark:bg-primary dark:hover:bg-primaryLight w-full flex items-center px-2 rounded-md  py-1 ">
                  <ModalButton
                    buttonContent={
                      <div className=" w-full ">
                        <label className="flex flex-row gap-1 items-center justify-center w-full py-1 cursor-pointer">
                          <EditIcon/>

                          <p className={` text-sm  `}>
                           ارجاع الطلب الى المخزن
                          </p>
                        </label>
                      </div>
                    }
                    modalContent={
                      <StageModal
                         orderId={row._id}
                         stage={'Return Recorded'}
                         label="ارجاع الطلب الى المخزن"
                       
                      />
                    }
                    modalMaxWidth="max-w-lg "
                  />
                </div>
              );
            },
          },
    approved:{
       component: () => {
              return (
                <div className="hover:bg-gray-100 dark:bg-primary dark:hover:bg-primaryLight w-full flex items-center px-2 rounded-md  py-1 ">
                  <ModalButton
                    buttonContent={
                      <div className=" w-full ">
                        <label className="flex flex-row gap-1 items-center justify-center w-full py-1 cursor-pointer">
                          <EditIcon/>

                          <p className={` text-sm  `}>
                             تأكيد العملية والموافقة عليها
                          </p>
                        </label>
                      </div>
                    }
                    modalContent={
                      <ApproveModal
                         orderInfo={row}
                         orderId={row._id}
                         stage={'Approved'}
                         label="  تأكيد العملية"
                       
                      />
                    }
                    modalMaxWidth="max-w-lg "
                  />
                </div>
              );
            },
    }   ,
          complete:{
             component: () => {
              return (
                <div className="hover:bg-gray-100 dark:bg-primary dark:hover:bg-primaryLight w-full flex items-center px-2 rounded-md  py-1 ">
                  <ModalButton
                    buttonContent={
                      <div className=" w-full ">
                        <label className="flex flex-row gap-1 items-center justify-center w-full py-1 cursor-pointer">
                          <EditIcon/>

                          <p className={` text-sm  `}>
                           انهاء الطلب
                          </p>
                        </label>
                      </div>
                    }
                    modalContent={
                      <CompleteModal
                         orderId={row._id}
                         stage={'Completed'}
                         label="انهاء الطلب"
                       
                      />
                    }
                    modalMaxWidth="max-w-lg "
                  />
                </div>
              );
            },
          }
          
  });
  return (
    <>
      <button
        //@ts-ignore
        // ref={tdRef}
        className="flex gap-2 items-center  p-2 rounded-md "
        onClick={() => {
          setOpenModel((prev) => !prev);
          setIsModelTriggered((prev) => !prev);
        }}
      >
        <ImageIcon Icon={MenuIcon} width={24} className="cursor-pointer z-10" />
      </button>
      {/* @ts-ignore */}
      <div ref={tdRef}>
        {openModel && menu && (
          <DropDownBox
            dropDownConfig={menu}
            title=""
            closeDropDown={() => {}}
            className=" absolute top-10 right-[20px]   w-max dark:bg-primary"
          />
        )}
      </div>
    </>
  );
};
export default Controll;
