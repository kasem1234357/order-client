import { useForm, Controller, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Input from "../global/Input";
import DateInput from "../global/DateInput";
import ValidateError from "../global/ValidateError";
import Button from "../global/Button";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { toastMessage } from "../../utils/utils";
import RadioInput from "../global/RadioInput";
import { CURRENCY } from "../../constants";
import { useCreateOrderMutation, useEditOrderMutation, useGetOrderByIdQuery } from "../../lib/redux/services/Api";
import Loader from "../skeletons/Loader";

// Enum Options
const statusOptions = ["Pending", "In Progress", "Completed", "Cancelled"] as const;
const stageOptions = [
  "Created",
  "Approved",
  "Fraza Delivered",
  "Qsasa Delivered",
  "Return Recorded",
  "Completed",
] as const;

// Schema
const stageSchema = z.object({
  //@ts-ignore
  name: z.enum(stageOptions),
  timestamp: z.string().optional(),
});

const orderFormSchema = z.object({
  orderNumber: z.string().min(1),
  //orderID: z.string().min(1),

  //createdBy: z.string().min(1),
  price: z.coerce.number().min(0),
  //@ts-ignore
  status: z.enum(statusOptions),
  weight: z.coerce.number().min(0),
  gramage: z.coerce.number().min(0),
  length: z.coerce.number().min(0),
  width: z.coerce.number().min(0),
  clientName: z.string().min(1),
  invoiceNumber: z.string().min(1),
  invoiceDate: z.string(),
  deliveryNumber: z.string().min(1),
  deliveryDate: z.string(),
  dimensionsRecord: z.string().optional(),
  stages: z.array(stageSchema).optional(),
  storage:z.string().min(1),
  frazaDelivery:z.object({
    deliveryDate:z.string().optional(),
    deliveredWeight:z.coerce.number().optional()
  }).optional(),
   qsasaDelivery:z.object({
    deliveryDate:z.string().optional(),
    deliveredWeight:z.coerce.number().optional()
  }).optional(),
  returnStore:z.object({
    returnDate:z.string().optional(),
    returnedWeight:z.coerce.number().optional()
  }).optional()
  
});

export type OrderFormType = z.infer<typeof orderFormSchema>;

type Props = {
  removeAnimation?: () => void;
  type?: "new" | "edit" | "add player" | "duplicate" | "view"|'edit-all';
  rowData?: Partial<OrderFormType>;
  tableId?:string
};

const OrderForm = ({ removeAnimation, type = "new", rowData ,tableId}: Props) => {
  const [createOrder] = useCreateOrderMutation()
  const [editOrder] = useEditOrderMutation()
  const {data,isFetching,isLoading,isSuccess} = useGetOrderByIdQuery({
    id:tableId
  },{
     skip:!tableId || tableId ===''
  })
  const defaultData: OrderFormType = {
    orderNumber: "",
    //createdBy: "",
    price: 0,
    status: "Pending",
    storage:"",
    weight: 0,
    gramage: 0,
    length: 0,
    width: 0,
    clientName: "",
    invoiceNumber: "",
    invoiceDate: " ",
    deliveryNumber: "",
    deliveryDate: " ",
    dimensionsRecord: "",

    stages: [],
  };

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<OrderFormType>({
    //@ts-ignore
    disabled:type === 'view',
    defaultValues: defaultData,
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "stages",
  });

  useEffect(() => {
    if (data) {
      console.log(data);
      
      reset(data?.data);
    }
  }, [data,isSuccess, type]);

  const onSubmit = async (data: OrderFormType) => {
    
    
    try {
      if(type === 'new'){
           await toast.promise(
        createOrder(data).unwrap(),
        toastMessage()
      );
      }else if(type === 'edit'){
          await toast.promise(
        editOrder({id:tableId,data}).unwrap(),
        toastMessage()
      );
      } 
    
      reset(defaultData);
      removeAnimation?.();
    } catch (error) {}
  };
  if(isLoading || isFetching){
   return <div className="w-full h-full flex flex-col justify-center items-center">
        <Loader />
      </div>
  }

  return (
   
    <div className="w-full px-6 py-8 flex flex-col gap-4 dark:bg-primary">
         <h3 className="font-bold text-lg text-primary dark:text-white">
           Order Info
      </h3>
      {/* @ts-ignore */}
    <form onSubmit={handleSubmit(onSubmit)} >
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-8 pb-7 border-b border-b-primary border-dotted">
          <div className="w-full flex-1 flex gap-4">
             
              <div className="flex flex-1 gap-2">
                <div className="w-full">
                 <Controller
          name="orderNumber"
          control={control}
          rules={{ required: true }}
          render={({ field }) => <Input label="رقم الطلب" inputProps={{...field}} />}
        />
        {errors.orderNumber && <ValidateError />}
                </div>
              </div>
              <div className="flex flex-1 gap-2">
                <div className="w-full">
                  <Controller
                    name="clientName"
                    rules={{ required: true }}
                    control={control}
                    render={({ field }) => (
                      <Input
                        inputProps={{
                          ...field,
                        
                        //   readOnly: type !== "new" && type !== "duplicate",
                        //   disabled: type !== "new" && type !== "duplicate",
                        }}
                        label={'اسم العميل'}
                        // customClass={
                        //   type !== "new" && type !== "duplicate"
                        //     ? "bg-[#f3f3f3]"
                        //     : ""
                        // }
                       
                      />
                    )}
                  />
                  {errors.clientName &&
                    errors.clientName.type === "required" && <ValidateError />}
                </div>
              </div>
            </div>
              <div className="w-full flex-1 flex gap-4">
             
              
              <div className="flex flex-1 gap-2">
                <div className="w-full">
                  <Controller
                    name="price"
                    rules={{ required: true }}
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
                        label={'السعر'}
                        title={CURRENCY()}
                        // customClass={
                        //   type !== "new" && type !== "duplicate"
                        //     ? "bg-[#f3f3f3]"
                        //     : ""
                        // }
                       
                      />
                    )}
                  />
                  {errors.price &&
                    errors.price.type === "required" && <ValidateError />}
                </div>
              </div>
               <div className="flex flex-1 gap-2">
                <div className="w-full">
                  <Controller
                    name="gramage"
                    rules={{ required: true }}
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
                        label={'جراماج'}
                        title="Kg"
                        // customClass={
                        //   type !== "new" && type !== "duplicate"
                        //     ? "bg-[#f3f3f3]"
                        //     : ""
                        // }
                       
                      />
                    )}
                  />
                  {errors.gramage &&
                    errors.gramage.type === "required" && <ValidateError />}
                </div>
              </div>
               <div className="flex flex-1 gap-2">
                <div className="w-full">
                  <Controller
                    name="storage"
                    rules={{ required: true }}
                    control={control}
                    render={({ field }) => (
                      <Input
                        inputProps={{
                          ...field,
                         
                        //   readOnly: type !== "new" && type !== "duplicate",
                        //   disabled: type !== "new" && type !== "duplicate",
                        }}
                        label={'المستودع'}
                       
                        // customClass={
                        //   type !== "new" && type !== "duplicate"
                        //     ? "bg-[#f3f3f3]"
                        //     : ""
                        // }
                       
                      />
                    )}
                  />
                  {errors.storage &&
                    errors.storage.type === "required" && <ValidateError />}
                </div>
              </div>
            </div>
            <div className="w-full flex-1 flex gap-4">
             
              <div className="flex flex-1 gap-2">
                <div className="w-full">
                 <Controller
          name="width"
          control={control}
          rules={{ required: true }}
          render={({ field }) => <Input label="عرض" inputProps={{
            ...field,
             type: "number",
                          onWheel: (e) => {
                            e.preventDefault();
                            //@ts-ignore
                            e.target.blur();
                          },
        }}
        title="M" />}
        />
        {errors.width && <ValidateError />}
                </div>
              </div>
              <div className="flex flex-1 gap-2">
                <div className="w-full">
                  <Controller
                    name="length"
                    rules={{ required: true }}
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
                        label={'طول'}
                        title="M"
                        // customClass={
                        //   type !== "new" && type !== "duplicate"
                        //     ? "bg-[#f3f3f3]"
                        //     : ""
                        // }
                       
                      />
                    )}
                  />
                  {errors.length &&
                    errors.length.type === "required" && <ValidateError />}
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
                          onWheel: (e) => {
                            e.preventDefault();
                            //@ts-ignore
                            e.target.blur();
                          },
                        //   readOnly: type !== "new" && type !== "duplicate",
                        //   disabled: type !== "new" && type !== "duplicate",
                        }}
                        label={'وزن'}
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
            </div>
             <div className="w-full flex-1 flex gap-4">
             
              
              <div className="flex flex-1 gap-2">
                
              </div>
              
            </div>
           
        </div>
         <h3 className="font-bold text-base text-primary dark:text-white">Invoice info</h3>
           <div className="w-full flex-1 flex gap-4">
             
              
              <div className="flex flex-1 gap-2">
                <div className="w-full">
                   <Controller
          name="invoiceDate"
          control={control}
          render={({ field }) => <DateInput name="invoiceDate" title="تاريخ الايصال" ar={true} dateInputProps={{ ...field }}
          placeHolder="date" handleChangeEvent={(e) => {
                      setValue("invoiceDate", e.replace("Sept", "Sep"));
                   

                      
                      trigger("invoiceDate");
                    }} isDisabled={type === 'view'}/>}
        />
                  {errors.invoiceDate &&
                    errors.invoiceDate.type === "required" && <ValidateError />}
                </div>
              </div>
              <div className="flex flex-1 gap-2">
                <div className="w-full">
                  <Controller
                    name="invoiceNumber"
                    rules={{ required: true }}
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
                        label={'رقم الايصال'}
                        
                        // customClass={
                        //   type !== "new" && type !== "duplicate"
                        //     ? "bg-[#f3f3f3]"
                        //     : ""
                        // }
                       
                      />
                    )}
                  />
                  {errors.invoiceNumber &&
                    errors.invoiceNumber.type === "required" && <ValidateError />}
                </div>
              </div>
              
            </div>
             <h3 className="font-bold text-base text-primary dark:text-white">Delivery info</h3>
           <div className="w-full flex-1 flex gap-4">
             
              
              <div className="flex flex-1 gap-2">
                <div className="w-full">
                   <Controller
          name="deliveryDate"
          control={control}
          render={({ field }) => <DateInput name="deliveryDate" title="تاريخ التسليم" ar={true}  dateInputProps={{ ...field }}
          placeHolder="date" handleChangeEvent={(e) => {
                      setValue("deliveryDate", e.replace("Sept", "Sep"));
                   

                      
                      trigger("deliveryDate");
                    }} isDisabled={type === 'view'} />}
        />
                  {errors.deliveryDate &&
                    errors.deliveryDate.type === "required" && <ValidateError />}
                </div>
              </div>
              <div className="flex flex-1 gap-2">
                <div className="w-full">
                  <Controller
                    name="deliveryNumber"
                    rules={{ required: true }}
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
                        label={'رقم فاتورة التسليم'}
                        
                        // customClass={
                        //   type !== "new" && type !== "duplicate"
                        //     ? "bg-[#f3f3f3]"
                        //     : ""
                        // }
                       
                      />
                    )}
                  />
                  {errors.deliveryNumber &&
                    errors.deliveryNumber.type === "required" && <ValidateError />}
                </div>
              </div>
              
            </div>
            {data?.data?.frazaDelivery?.deliveryDate && <>
              <h3 className="font-bold text-base text-primary dark:text-white">Fraza Delivery info</h3>
           <div className="w-full flex-1 flex gap-4">
             
              
              <div className="flex flex-1 gap-2">
                <div className="w-full">
                   <Controller
          name="frazaDelivery.deliveryDate"
          control={control}
          rules={{required:false}}
          render={({ field }) => <DateInput name="frazaDelivery.deliveryDate" title="تاريخ تسليم الفرازة" ar={true}  dateInputProps={{ ...field }} isRequired={false}
          placeHolder="date" handleChangeEvent={(e) => {
                      setValue("frazaDelivery.deliveryDate", e.replace("Sept", "Sep"));
                   

                      
                      trigger("frazaDelivery.deliveryDate");
                    }} isDisabled={type === 'view'} />}
        />
                  {errors?.frazaDelivery?.deliveryDate &&
                    errors?.frazaDelivery.deliveryDate.type === "required" && <ValidateError />}
                </div>
              </div>
              <div className="flex flex-1 gap-2">
                <div className="w-full">
                  <Controller
                    name="frazaDelivery.deliveredWeight"
                    rules={{ required: false }}
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
                        label={'الوزن المسلم للفرازة'}
                        
                        // customClass={
                        //   type !== "new" && type !== "duplicate"
                        //     ? "bg-[#f3f3f3]"
                        //     : ""
                        // }
                       
                      />
                    )}
                  />
                  {errors?.frazaDelivery?.deliveredWeight &&
                    errors?.frazaDelivery?.deliveredWeight.type === "required" && <ValidateError />}
                </div>
              </div>
              
            </div>
            </>}
           
             {data?.data?.qsasaDelivery?.deliveryDate && <>
              <h3 className="font-bold text-base text-primary dark:text-white">qsassa Delivery info</h3>
           <div className="w-full flex-1 flex gap-4">
             
              
              <div className="flex flex-1 gap-2">
                <div className="w-full">
                   <Controller
          name="qsasaDelivery.deliveryDate"
          control={control}
          rules={{required:false}}
          render={({ field }) => <DateInput name="qsasaDelivery.deliveryDate" title="تاريخ تسليم القصاصة" ar={true}  dateInputProps={{ ...field }} isRequired={false}
          placeHolder="date" handleChangeEvent={(e) => {
                      setValue("qsasaDelivery.deliveryDate", e.replace("Sept", "Sep"));
                   

                      
                      trigger("qsasaDelivery.deliveryDate");
                    }} isDisabled={type === 'view'} />}
        />
                  {errors?.qsasaDelivery?.deliveryDate &&
                    errors?.qsasaDelivery.deliveryDate.type === "required" && <ValidateError />}
                </div>
              </div>
              <div className="flex flex-1 gap-2">
                <div className="w-full">
                  <Controller
                    name="qsasaDelivery.deliveredWeight"
                    rules={{ required: false }}
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
                        label={'الوزن المسلم للقصاصة'}
                        
                        // customClass={
                        //   type !== "new" && type !== "duplicate"
                        //     ? "bg-[#f3f3f3]"
                        //     : ""
                        // }
                       
                      />
                    )}
                  />
                  {errors?.qsasaDelivery?.deliveredWeight &&
                    errors?.qsasaDelivery?.deliveredWeight.type === "required" && <ValidateError />}
                </div>
              </div>
              
            </div>
            </>}
            {data?.data?.returnStore?.returnDate && <>
              <h3 className="font-bold text-base text-primary dark:text-white">store return info</h3>
           <div className="w-full flex-1 flex gap-4">
             
              
              <div className="flex flex-1 gap-2">
                <div className="w-full">
                   <Controller
          name="returnStore.returnDate"
          control={control}
          rules={{required:false}}
          render={({ field }) => <DateInput name="returnStore.returnDate" title="تاريخ الارجاع للمخزن" ar={true}  dateInputProps={{ ...field }} isRequired={false}
          placeHolder="date" handleChangeEvent={(e) => {
                      setValue("returnStore.returnDate", e.replace("Sept", "Sep"));
                   

                      
                      trigger("returnStore.returnDate");
                    }} isDisabled={type === 'view'} />}
        />
                  {errors?.returnStore?.returnDate &&
                    errors?.returnStore.returnDate.type === "required" && <ValidateError />}
                </div>
              </div>
              <div className="flex flex-1 gap-2">
                <div className="w-full">
                  <Controller
                    name="returnStore.returnedWeight"
                    rules={{ required: false }}
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
                        label={'الوزن المسلم للمخزن'}
                        
                        // customClass={
                        //   type !== "new" && type !== "duplicate"
                        //     ? "bg-[#f3f3f3]"
                        //     : ""
                        // }
                       
                      />
                    )}
                  />
                  {errors?.returnStore?.returnedWeight &&
                    errors?.returnStore?.returnedWeight.type === "required" && <ValidateError />}
                </div>
              </div>
              
            </div>
            </>}
        {/* <Controller
          name="orderNumber"
          control={control}
          rules={{ required: true }}
          render={({ field }) => <Input label="Order Number" inputProps={field} />}
        />
        {errors.orderNumber && <ValidateError />}

        <Controller
          name="orderID"
          control={control}
          render={({ field }) => <Input label="Order ID" inputProps={field} />}
        />

        <Controller
          name="orderDate"
          control={control}
          render={({ field }) => <DateInput name="orderDate" title="Order Date"  dateInputProps={{ ...field }} handleChangeEvent={(e) => {
                      setValue("orderDate", e.replace("Sept", "Sep"));
                   

                      
                      trigger("orderDate");
                    }} />}
        />

        <Controller
          name="price"
          control={control}
          render={({ field }) => (
            <Input label="Price" inputProps={{ ...field, type: "number" }} title="$" />
          )}
        />

        <Controller
          name="status"
          control={control}
          render={({ field }) => (
            <div className="flex flex-col gap-2">
              <label>Status</label>
              {statusOptions.map((option) => (
                <RadioInput
                  key={option}
                  value={option}
                  label={option}
                  checked={field.value === option}
                  onChange={field.onChange}
                />
              ))}
            </div>
          )}
        />

        {/* Repeat Inputs as needed for all fields... */}

        {/* <div className="flex flex-col gap-2">
          <label>Stages</label>
          {fields.map((field, index) => (
            <div key={field.id} className="flex items-center gap-2">
              <Controller
                name={`stages.${index}.name`}
                control={control}
                render={({ field }) => (
                  <select {...field} className="border p-2 rounded">
                    {stageOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                )}
              />
              <Controller
                name={`stages.${index}.timestamp`}
                control={control}
                render={({ field }) => <DateInput name="`stages.${index}.timestamp`" title="Order Date"   dateInputProps={{ ...field }} handleChangeEvent={(e) => {
                      setValue(`stages.${index}.timestamp`, e.replace("Sept", "Sep"));
                   

                      
                      trigger(`stages.${index}.timestamp`);
                    }} />}
              />
              <button type="button" onClick={() => remove(index)} className="text-red-500">
                Delete
              </button>
            </div>
          ))}
          <button type="button" onClick={() => append({ name: "Created" })} className="text-blue-500">
            Add Stage
          </button>
        </div>  */}
      </div>

      <div className="flex gap-4 justify-end pt-5">
        {type === 'view' ?<div className="flex gap-16 justify-end items-center w-[70%] ml-auto mr-0">
          <Button
            customeStyle="text-red-500 p-2 border border-primaryRed rounded-full w-[200px]"
            text={"close"}
            type="reset"
            width="150px"
            onClick={(e) => {
              e.preventDefault();

              removeAnimation && removeAnimation();
            }}
          />

         
        </div>: <div className="flex gap-16 justify-end items-center w-[70%] ml-auto mr-0 mobile:pb-[70px]">
          <Button
            customeStyle="text-red-500"
            text={"cancel"}
            type="reset"
            width="150px"
            onClick={(e) => {
              e.preventDefault();

              removeAnimation && removeAnimation();
            }}
          />

          <Button
            customeStyle="bg-primary text-white dark:text-primary dark:bg-primaryYellow p-3 px-2 rounded-full w-[200px]"
            text={"save"}
            type="submit"
            width="150px"
          />
        </div>}
      </div>
    </form>
    </div>
    
  );
};

export default OrderForm;