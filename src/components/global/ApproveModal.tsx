import React, { useEffect, useState } from "react";
import { useActivateCoacheMutation } from "../../lib/redux/services/sections/Coaches";
import { toast } from "react-toastify";
import {
  getHoursSince,
  isNowBeforeDeadline,
  toastMessage,
} from "../../utils/utils";
import logo from "../../assets/icons/logo.png";
import { useGetDictionary } from "../../hooks/useGetDictionary";
import { DictionaryType } from "../../types";
import Button from "../global/Button";
import { useDeleteBookingMutation } from "../../lib/redux/services/sections/Booking";
import { Tooltip } from "react-tooltip";
import { Info } from "lucide-react";
import CheckBox from "./CheckBox";
import { useApproveOrderStageMutation, useCancelOrderMutation, useUpdateOrderStageMutation } from "../../lib/redux/services/Api";
import { Controller, useForm } from "react-hook-form";
import DateInput from "./DateInput";
import ValidateError from "./ValidateError";
import Input from "./Input";

type propsType = {
  toggleModal?: () => void;
  orderInfo:any
  orderId: number;
  label:string
  stage?: string;
  cancellationHours?: number;

  created_from?: "dashboard" | "mobile";
};
type OrderFormType ={
    weight:number;
    date:string;
    returnWeight:string;
}
const ApproveModal = ({
  toggleModal,
  orderId,
  orderInfo,
  label,
  cancellationHours,
  stage,
  created_from = "dashboard",

}: propsType) => {
  const [apiAction] = useUpdateOrderStageMutation();
  const [withReccuring, setIsWithRecurring] = useState(false);
    const [aproveStage] = useApproveOrderStageMutation();
  const { inputs, coaches, shared, events }: DictionaryType =
    useGetDictionary();
  const apiActionHandler = async () => {
        try {
          if (orderInfo?.stage?.name !== "Created" && orderInfo.isApproved) {
            if (orderInfo?.stage?.name === "Cancelled") {
              toast.warn('لا يمكنك الموافقة على طلب تم الغاءه سابقا')
              return;
            } else {
              toast.warn("لا يمكنك الموافقة على طلب تمت الموافقة عليه سابقا ");
              return;
            }
          }
          await toast.promise(
            aproveStage({ id: orderInfo._id, stage: orderInfo?.stage?.name }).unwrap(),
            toastMessage()
          );
        } catch (error) {
          console.log(error);
        }
      }
       const disableInfo = ()=>{
        switch (orderInfo?.stage?.name) {
            case 'Created':
               return {
                date:orderInfo?.date,
                weight:orderInfo?.weight
               }
                
                break;
                case 'Approved':
                   return {
                date:orderInfo?.date,
                weight:orderInfo?.weight
               }
                break;
                 case 'Fraza Delivered':
                   return {
                date:orderInfo?.frazaDelivery?.deliveryDate,
                weight:orderInfo?.frazaDelivery?.deliveredWeight
               }
                
                break;
                 case 'Qsasa Delivered':
                    return {
                date:orderInfo?.qsasaDelivery?.deliveryDate,
                weight:orderInfo?.qsasaDelivery?.deliveredWeight
               }
                   
                break;
                 case 'Return Recorded':
                     return {
                date:orderInfo?.returnStore?.returnDate,
                weight:orderInfo?.returnStore?.returnedWeight
               }
                 
                break;
                                 case 'Completed':
                     return {
                date:orderInfo?.deliveryDate,
                weight:orderInfo?.finalWeight
               }
                 
                break;
        
            default:
                break;
        }
    }
    console.log(orderInfo);
    
    console.log(disableInfo());
    
  const defaultData = {
    weight:0,
    date:'',
    returnWeight:0,
  }
    const {
      control,
      handleSubmit,
      reset,
      setValue,
      trigger,
      formState: { errors },
    } = useForm<OrderFormType>({
      //@ts-ignore
      
      defaultValues: disableInfo(),
    });
   
  const onSubmit =async(data:any)=>{
    await apiActionHandler();
  }
  useEffect(()=>{
   disableInfo()
  },[])
  return (
    <div className="flex flex-col gap-8 px-12 py-8 pt-10 ">
      <div className="flex flex-col justify-center items-center gap-2 text-center ">
        <img loading="lazy" width={200} height={200} src={logo} alt="mocion-logo" />
        <div className="pt-6">
          <h2 className={` text-3xl text-primaryRed  `}>
            {label}
          </h2>
          <p
            className={`text-lg font-normal  text-[#1E1850] dark:text-white break-words leading-relaxed whitespace-pre-wrap `}
          >
           هل تأكد استلامك لهذه التفاصيل
          </p>
        </div>
        <form className="flex gap-2 flex-col w-full" onSubmit={handleSubmit(onSubmit)}>
             <div className="flex flex-1 gap-2">
                <div className="w-full ltr">
                   <Controller
          name="date"
          control={control}
          render={({ field }) => <DateInput isDisabled={true} name="invoiceDate" title=" تاريخ التسليم" ar={false} dateInputProps={{ ...field }}
          placeHolder="date" handleChangeEvent={(e) => {
                      setValue("date", e.replace("Sept", "Sep"));
                   

                      
                      trigger("date");
                    }}/>}
        />
                  {errors.date &&
                    errors.date.type === "required" && <ValidateError />}
                </div>
              </div>
               <div className="flex flex-1 gap-2">
                              <div className="w-full">
                                <Controller
                                  name="weight"
                                  rules={{ required: true }}
                                  control={control}
                                  render={({ field }) => (
                                    <Input
                                      inputProps={{
                                        ...field,
                                        type: "number",
                                        readOnly:true,
                                        onWheel: (e) => {
                                          e.preventDefault();
                                          //@ts-ignore
                                          e.target.blur();
                                        },
                                      //   readOnly: type !== "new" && type !== "duplicate",
                                      //   disabled: type !== "new" && type !== "duplicate",
                                      }}
                                      label={'الوزن المسلم'}
                                      title="Kg"
                                      // customClass={
                                      //   type !== "new" && type !== "duplicate"
                                      //     ? "bg-[#f3f3f3]"
                                      //     : ""
                                      // }
                                     
                                    />
                                  )}
                                />
                                {errors.weight &&
                                  errors.weight.type === "required" && <ValidateError />}
                              </div>
                            </div>
                             <div className="flex flex-1 gap-2">
                             
                            </div>
                            <div
          className={`mt-6 flex flex-col items-center justify-center gap-6  w-full `}
        >
          
          <div className="flex flex-col w-full gap-8 items-center justify-center">
            {/*cancellationHours !== undefined && isNowBeforeDeadline(startTime,cancellationHours) &&  */}
            {
              <div data-tooltip-id="cancel_with_refund" className="w-full">
                
                <Button
                  customeStyle={`flex-1 bg-primary text-white font-bold dark:text-white dark:bg-primary  w-full rounded-full border border-primary   text-lg py-4  `}
                  type="submit"
                  text={
                    <p className="flex flex-row gap-1  items-center justify-center w-full ">
                      <p> تأكيد الطلب</p>
                    </p>
                  }
                  width="max-w-[400px] w-full"
                 
                />
              </div>
            }
            {/* ( created_from === 'dashboard' || (cancellationHours !== undefined && !isNowBeforeDeadline(startTime,cancellationHours)) )&& */}
           

            {/*cancellationHours !== undefined && isNowBeforeDeadline(startTime,cancellationHours) &&  */}
            {}
            {/* <Tooltip
              id={"cancel_without_refund"}
              content={"hello"}
              style={{
                backgroundColor: "#CBDB2A",
                color: "#1e1850",
                zIndex: 2,
              }}
              place="bottom"
            /> */}
          </div>
          <Button
            customeStyle={` text-primaryRed font-bold dark:text-primaryRed   w-full rounded-full text-lg py-4 hover:border hover:border-primaryRed `}
            text={'اغلاق النافذة'}
            width="max-w-[400px] w-full"
            onClick={() => {
              toggleModal && toggleModal();
            }}
          />
        </div>
        </form>
        
      </div>
    </div>
  );
};

export default ApproveModal;
