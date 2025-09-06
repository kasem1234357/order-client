import React, { useState } from "react";
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
import { useCancelOrderMutation, useUpdateOrderStageMutation } from "../../lib/redux/services/Api";
import { Controller, useForm } from "react-hook-form";
import DateInput from "./DateInput";
import ValidateError from "./ValidateError";
import Input from "./Input";

type propsType = {
  toggleModal?: () => void;
  orderId: number;
  label:string
  stage?: string;


  created_from?: "dashboard" | "mobile";
};
type OrderFormType ={
    finalWeight:number;
    numberOfBoxes:number
}
const CompleteModal = ({
  toggleModal,
  orderId,
  label,

  stage,

}: propsType) => {
  const [apiAction] = useUpdateOrderStageMutation();
  const [withReccuring, setIsWithRecurring] = useState(false);
  const { inputs, coaches, shared, events }: DictionaryType =
    useGetDictionary();
  const apiActionHandler = async (data: any) => {
    if(data.finalWeight === 0 && data.numberOfBoxes === 0){
        toast.error('يجب ادخال بيانات باحد الحقلين ')
        return
    }
    try {
      await toast.promise(
        apiAction({        
          id:orderId,
          stage:stage,
        finalWeight:data?.finalWeight,
        numberOfBoxes:data?.numberOfBoxes

        }).unwrap(),
        toastMessage()
      );
      toggleModal && toggleModal();
    } catch (error) {}
  };
  const defaultData = {
    finalWeight:0,
    numberOfBoxes:0
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
      
      defaultValues: defaultData,
    });
  const onSubmit =async(data:any)=>{
    await apiActionHandler(data);
  }
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
            هل تريد حقا اكمال العملية
          </p>
        </div>
        <form className="flex gap-2 flex-col w-full" onSubmit={handleSubmit(onSubmit)}>
             <div className="flex flex-1 gap-2">
               <div className="w-full">
                                <Controller
                                  name="numberOfBoxes"
                                 
                                  control={control}
                                  render={({ field }) => (
                                    <Input
                                      inputProps={{
                                        ...field,
                                        type: "number",
                                        onWheel: (e) => {
                                          e.preventDefault();
                                          //@ts-ignore
                                          e.target.blur();
                                        },
                                      //   readOnly: type !== "new" && type !== "duplicate",
                                      //   disabled: type !== "new" && type !== "duplicate",
                                      }}
                                      label={'عدد الاطباق النهائي'}
                                      title="طبق"
                                      // customClass={
                                      //   type !== "new" && type !== "duplicate"
                                      //     ? "bg-[#f3f3f3]"
                                      //     : ""
                                      // }
                                     
                                    />
                                  )}
                                />
                                {errors.numberOfBoxes &&
                                  errors.numberOfBoxes.type === "required" && <ValidateError />}
                              </div>
              </div>
               <div className="flex flex-1 gap-2">
                              <div className="w-full">
                                <Controller
                                  name="finalWeight"
                                  
                                  control={control}
                                  render={({ field }) => (
                                    <Input
                                      inputProps={{
                                        ...field,
                                        type: "number",
                                        onWheel: (e) => {
                                          e.preventDefault();
                                          //@ts-ignore
                                          e.target.blur();
                                        },
                                      //   readOnly: type !== "new" && type !== "duplicate",
                                      //   disabled: type !== "new" && type !== "duplicate",
                                      }}
                                      label={'الوزن النهائي'}
                                      title="Kg"
                                      // customClass={
                                      //   type !== "new" && type !== "duplicate"
                                      //     ? "bg-[#f3f3f3]"
                                      //     : ""
                                      // }
                                     
                                    />
                                  )}
                                />
                                {errors.finalWeight &&
                                  errors.finalWeight.type === "required" && <ValidateError />}
                              </div>
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
                      <p>اكمال العملية</p>
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

export default CompleteModal;
