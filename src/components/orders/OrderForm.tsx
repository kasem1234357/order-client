import { useForm, Controller, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Input from "../global/Input";
import DateInput from "../global/DateInput";
import ValidateError from "../global/ValidateError";
import Button from "../global/Button";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { toastMessage } from "../../utils/utils";
import RadioInput from "../global/RadioInput";
import { CURRENCY } from "../../constants";
import { useCreateOrderMutation, useEditOrderMutation, useGetAllClientQuery, useGetAllMaterialQuery, useGetAllMaterialSizeQuery, useGetAllStorageQuery, useGetOrderByIdQuery } from "../../lib/redux/services/Api";
import Loader from "../skeletons/Loader";
import { useSelector } from "react-redux";
import SelectBox from "../global/SelectBox";
import Modal from "../global/Modal";
import ClientModal from "../global/ClientModal";
import StorageModal from "../global/StorageModal";
import generatePDF from 'react-to-pdf';
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
  //orderID: z.string().min(1),

  //createdBy: z.string().min(1),
  price: z.coerce.number().min(0),
  materialType:z.string().min(1).optional(),
  //@ts-ignore
  status: z.enum(statusOptions),
  weight: z.coerce.number().min(0),
  numberOfBoxes: z.coerce.number().min(0).optional(),
  materialResourceType:z.string().min(1).optional(),
  gramage: z.coerce.number().min(0),
  length: z.coerce.number().min(0),
  width: z.coerce.number().min(0),
  clientName: z.string().min(1),
  invoiceNumber: z.string().min(1),
  invoiceDate: z.string(),
  deliveryNumber: z.string().min(1),
  deliveryDate: z.string(),
  dimensionsRecord: z.string().optional(),
  finalWeight:z.coerce.number().min(0).optional(),
  finalNumberOfBoxes:z.coerce.number().min(0).optional(),
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
  type?: "new" | "edit" | "add player" | "duplicate" | "view"|'edit-all'  ;
  rowData?: Partial<OrderFormType>;
  tableId?:string
};
  const defaultData: OrderFormType = {
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
const OrderForm = ({ removeAnimation, type = "new", rowData ,tableId}: Props) => {
  const [createOrder] = useCreateOrderMutation()
  const [editOrder] = useEditOrderMutation()
  const [openModal,setOpenModal]=useState(false)
  const [modalType,setModalType] = useState('clients')
  const targetRef = useRef();
  const role = useSelector((state:any)=>state.user?.user?.role?.currentRole)
    const {
    control,
    handleSubmit,
    reset,
    setValue,
    trigger,
    watch,
    formState: { errors },
  } = useForm<OrderFormType>({
    //@ts-ignore
    disabled:type === 'view',
    defaultValues: defaultData,
  });
  console.log(role);
  const {data:materialData} = useGetAllMaterialQuery({
    storage:watch('storage'),
    materialResourceType:watch('materialResourceType'),
    materialType:watch('materialType'),
    width:watch('width') == 0?"":watch('width'),
    gramage:watch('gramage') == 0?"":watch('gramage'),
    length:watch('length') == 0?"":watch('length'),
    
  })
  const {data,isFetching,isLoading,isSuccess} = useGetOrderByIdQuery({
    id:tableId
  },{
     skip:!tableId || tableId ===''
  })



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
        createOrder({data,materialId:materialData?.data?.materials[0]?._id,}).unwrap(),
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
  const gramageValue  = watch('gramage')
  const lengthValue  = watch('length')
  const widthValue  = watch('width')
  const returenedWeight =(data?.data?.frazaReturn?.returnedWeight) + (data?.data?.qsasaReturn?.returnedWeight) + (data?.data?.returnStore?.returnedWeight)
  const finalWeightWithReturn = (watch('finalWeight') || 0) + (data?.data?.frazaReturn?.returnedWeight) + (data?.data?.qsasaReturn?.returnedWeight) + (data?.data?.returnStore?.returnedWeight)
  const turnOffSelect = ()=>{
     if( gramageValue === 0){
      return true
     }
     return false
  }
  if(isLoading || isFetching){
   return <div className="w-full h-full flex flex-col justify-center items-center">
        <Loader />
      </div>
  }

  return (
  //  @ts-ignore
    <div className="w-full px-6 py-8 flex flex-col gap-4 dark:bg-primary" ref={targetRef}>
         <h3 className="font-bold text-lg text-primary dark:text-white">
           Order Info
      </h3>
      {/* @ts-ignore */}
    <form onSubmit={handleSubmit(onSubmit)} >
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-8 pb-7 border-b border-b-primary border-dotted">
          <div className="w-full flex-1 flex gap-4">
             
              <div className="flex flex-1 gap-2">
                <div className="w-full flex-1 mobile:min-w-[300px]">
                  <label className="block text-sm mb-2 text-primary dark:text-white">
                    اسم العميل
                    <span className="text-red-500">*</span>
                  </label>
                  <Controller
                    name={`clientName`}
                    control={control}
                    rules={{ required: false }}
                    render={({ field }) => (
                      <SelectBox
                        field={field}
                        isCustomOption={true}
                        setValue={setValue}
                        HasMenu={true}
                        menuActionProps={{
                          hasAddPlayerBtn:true,
                          addLabel:'اضافة مستخدم جديد',
                          onClick:()=>{
                              setOpenModal(true)
                              setModalType('clients')
                          }
                        }}
                        labelKey="clientName"
                        optionValueKey="clientName"
                        
                        requestFn={useGetAllClientQuery}
                        
                        
                        
                        name={`clientName`}
                        onChange={(selected: {
                          id: number;
                          name: string;
                          price: number;
                        }) => {
                          
                          // @ts-ignore only
                          return field.onChange(selected ? selected.clientName : null);
                        }}
                      />
                    )}
                  />
                </div>
              </div>
            </div>
              <div className="w-full flex-1 flex gap-4 print:flex-col">
             
              
              <div className="flex flex-1 gap-2">
                <div className="w-full">
                  <Controller
                    name="price"
                    rules={{ required: (!role ||!role?.fieldsPermissions?.includes('price')) }}
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
                   <label className="block text-sm mb-2 text-primary dark:text-white">
                    جراماج
                    <span className="text-red-500">*</span>
                  </label>
                  <Controller
                    name={`gramage`}
                    control={control}
                    rules={{ required: false }}
                    render={({ field }) => (
                      <SelectBox
                        field={field}
                        isCustomOption={false}
                        setValue={setValue}
                        labelKey="gramage"
                        optionValueKey="gramage"
                        extraParams={{
                          material:'gramage'
                        }}
                        requestFn={useGetAllMaterialSizeQuery}
                        
                        
                        
                        name={`gramage`}
                        onChange={(selected: {
                          id: number;
                          name: string;
                          price: number;
                        }) => {
                            //@ts-ignore
                          setValue('storage',selected.storage)
                          // @ts-ignore only
                          return field.onChange(selected ? selected.gramage : null);
                        }}
                      />
                    )}
                  />
                  {errors.gramage &&
                    errors.gramage.type === "required" && <ValidateError />}
                </div>
              </div>
               <div className="flex flex-1 gap-2">
                 <div className="w-full flex-1 mobile:min-w-[300px]">
                  <label className="block text-sm mb-2 text-primary dark:text-white">
                    اسم المستودع
                   
                  </label>
                  <Controller
                    name={`storage`}
                    control={control}
                    rules={{ required: false }}
                    render={({ field }) => (
                      <SelectBox
                        field={field}
                         isCustomOption={true}
                        setValue={setValue}
                        HasMenu={true}
                        menuActionProps={{
                          hasAddPlayerBtn:true,
                          addLabel:'اضافة مخزن جديد',
                          onClick:()=>{
                              setOpenModal(true)
                              setModalType('storage')
                          }
                        }}
                        labelKey="storage"
                        optionValueKey="storage"
                        
                        requestFn={useGetAllStorageQuery}
                        
                        
                        
                        name={`storage`}
                        onChange={(selected: {
                          id: number;
                          name: string;
                          price: number;
                        }) => {
                          
                          // @ts-ignore only
                          return field.onChange(selected ? selected.storage : null);
                        }}
                      />
                    )}
                  />
                </div>
             
              </div>
            </div>
            <div className="w-full flex-1 flex gap-4 flex-col print:hidden">
              <h3 className="font-bold text-lg text-primary dark:text-white cursor-pointer">Open material list</h3>
              <div className="w-full bg-[#f3f3f3] min-h-[150px]  border-dashed border-primary border-2 max-h-[200px] overflow-y-auto customScroll">
                <div className="bg-white border-b border-[#f2f2f2] flex gap-2">
                  <div className="flex-1 grid place-content-center p-2"><p>اسم المادة</p></div>
                  <div className="flex-1 grid place-content-center p-2"><p>مصدر المادة</p></div>
                  <div className="flex-1 grid place-content-center p-2"><p>جراماج</p></div>
                  <div className="flex-1 grid place-content-center p-2"><p>الطول</p></div>
                  <div className="flex-1 grid place-content-center p-2"><p>العرض</p></div>
                  <div className="flex-1 grid place-content-center p-2"><p>الوزن</p></div>
                  <div className="flex-1 grid place-content-center p-2"><p>نوع المادة</p></div>
                  <div className="flex-1 grid place-content-center p-2"><p>المخزن</p></div>
                </div>
                {/*  {
                "_id": "68baf1ea976b44f261eee7af",
                "name": "خشب 2",
                "invoiceNumber": 5,
                "materialResourceType": "اوردر",
                "length": 4,
                "width": 8,
                "gramage": 9,
                "materialType": "رول",
                "storage": "صلاح الدين"
            }, */}
                {materialData?.data?.materials?.map((material:any)=>(
                  <div className="cursor-pointer border-b border-[#f2f2f2] flex gap-2 hover:bg-[#fbfbfb]" onClick={()=>{
                    setValue('gramage',material.gramage)
                    setValue('width',material.width)
                    setValue('length',material.length)
                    setValue('materialResourceType',material.materialResourceType)
                    setValue('materialType',material.materialType)
                    setValue('storage',material.storage)
                  }}>
                  <div className="flex-1 grid place-content-center p-2"><p>{material.name} </p></div>
                  <div className="flex-1 grid place-content-center p-2"><p> {material.materialResourceType}</p></div>
                  <div className="flex-1 grid place-content-center p-2"><p>{material.gramage}</p></div>
                  <div className="flex-1 grid place-content-center p-2"><p>{material.length}</p></div>
                  <div className="flex-1 grid place-content-center p-2"><p>{material.width}</p></div>
                   <div className="flex-1 grid place-content-center p-2"><p>{material.weight}</p></div>
                  <div className="flex-1 grid place-content-center p-2"><p> {material.materialType}</p></div>
                  <div className="flex-1 grid place-content-center p-2"><p>{material.storage}</p></div>
                </div>
                ))}
              </div>
            </div>
            <div className="w-full flex-1 flex gap-4 ">
               <div className="flex-1 flex h-full items-center min-w-[250px]">
                    <Controller
                      name="materialType"
                      control={control}
                      rules={{ required: "gender is required" }}
                      render={({ field }) => (
                        <div className="flex flex-row items-center gap-8 pt-7">
                          <label className=" font-bold text-primary dark:text-white whitespace-nowrap">
                            نوع المواد
                          </label>
                          <RadioInput
                            value="رول"
                            label="رول"
                            
                            labelStyle="text-primary dark:text-white"
                            checked={field.value === "رول"}
                            onChange={field.onChange}
                          />
                          <RadioInput
                            value="دغما"
                            label="دغما"
                       
                            labelStyle="text-primary dark:text-white"
                            checked={field.value === "دغما"}
                            onChange={field.onChange}
                          />
                          <RadioInput
                            value="باكيت"
                            label="باكيت"
                            
                            labelStyle="text-primary dark:text-white"
                            checked={field.value === "باكيت"}
                            onChange={field.onChange}
                          />
                        </div>
                      )}
                    />
                    {errors.materialType && errors.materialType.type === "required" && (
                      <ValidateError />
                    )}
                  </div>
                   <div className="flex-1 flex h-full items-center min-w-[250px]">
                    <Controller
                      name="materialResourceType"
                      control={control}
                      rules={{ required: "gender is required" }}
                      render={({ field }) => (
                        <div className="flex flex-row items-center gap-8 pt-7">
                          <label className=" font-bold text-primary dark:text-white whitespace-nowrap">
                            مصدر المواد
                          </label>
                          <RadioInput
                            value="ستوك"
                            label="ستوك"
                            
                            labelStyle="text-primary dark:text-white"
                            checked={field.value === "ستوك"}
                            onChange={field.onChange}
                          />
                          <RadioInput
                            value="اوردر"
                            label="اوردر"
                       
                            labelStyle="text-primary dark:text-white"
                            checked={field.value === "اوردر"}
                            onChange={field.onChange}
                          />
                         
                        </div>
                      )}
                    />
                    {errors.materialResourceType && errors.materialResourceType.type === "required" && (
                      <ValidateError />
                    )}
                  </div>
                  <div className="w-full flex-1">
                      <Controller
                        name="numberOfBoxes"
                        control={control}
                       
                        render={({ field }) => (
                          <Input
                            label="عدد الاطباق"
                            isRequired={false}
                            inputProps={{
                              ...field,
                             
                              className:
                                "block w-full p-2 bg-gray-800 border border-gray-700 rounded-md",
                              type: "number",
                              onWheel: (e) => {
                                e.preventDefault();
                                //@ts-ignore
                                e.target.blur();
                              },
                              step: 0,
                            }}
                            
                          />
                        )}
                      />
                      {/* @ts-ignore */}
                     
                    </div>
            </div>
            <div className="w-full flex-1 flex gap-4 print:flex-col">
             
              <div className="flex flex-1 gap-2">
                <div className="w-full">
                   <label className="block text-sm mb-2 text-primary dark:text-white">
                    عرض
                    <span className="text-red-500">*</span>
                  </label>
                 <Controller
          name="width"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
             <SelectBox
                        field={field}
                        isCustomOption={false}
                        setValue={setValue}
                        labelKey="width"
                        optionValueKey="width"
                        turnOff={turnOffSelect()}
                       extraParams={{
                          material:'width',
                          length:lengthValue === 0?'':lengthValue,
                          gramage:gramageValue===0?"":gramageValue
                        }}
                        selectedObject={{
                          //@ts-ignore
                         width:watch('width')
                         }}
                        dependOn={[
                          gramageValue,
                          watch('length')
                        ]}
                        requestFn={useGetAllMaterialSizeQuery}
                        
                        name={`width`}
                        onChange={(selected: {
                          id: number;
                          name: string;
                          price: number;
                        }) => {
                        
                          // @ts-ignore only
                          return field.onChange(selected ? selected.width : null);
                        }}
                      />
          )}
        />
        {errors.width && <ValidateError />}
                </div>
              </div>
              <div className="flex flex-1 gap-2">
                <div className="w-full">
                   <label className="block text-sm mb-2 text-primary dark:text-white">
                    طول
                    <span className="text-red-500">*</span>
                  </label>
                  <Controller
                    name="length"
                    rules={{ required: true }}
                    control={control}
                    render={({ field }) => (
                         <SelectBox
                        field={field}
                        isCustomOption={false}
                        setValue={setValue}
                        labelKey="length"
                        optionValueKey="length"
                         turnOff={turnOffSelect()}
                         selectedObject={{
                          //@ts-ignore
                         length:watch('length')
                         }}
                         extraParams={{
                          material:'length',
                          width:widthValue ===0?'':widthValue,
                          gramage:gramageValue ===0?"":gramageValue
                        }}
                        dependOn={[
                          gramageValue,
                          watch('width')
                        ]}
                        
                        requestFn={useGetAllMaterialSizeQuery}
                        
                        
                        
                        name={`length`}
                        onChange={(selected: {
                          id: number;
                          name: string;
                          price: number;
                        }) => {
                          
                          // @ts-ignore only
                          return field.onChange(selected ? selected.length : null);
                        }}
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
             <div className="w-full flex-1 flex gap-4 print:hidden">
             
              
              <div className="flex flex-1 gap-2">
                
              </div>
              
            </div>
           
        </div>
         <h3 className="font-bold text-base text-primary dark:text-white print:hidden">Invoice info</h3>
           <div className="w-full flex-1 flex gap-4 print:hidden">
             
              
              <div className="flex flex-1 gap-2 print:hidden">
                <div className="w-full">
                   <Controller
          name="invoiceDate"
          control={control}
          render={({ field }) => <DateInput name="invoiceDate" title="تاريخ الايصال" ar={true} dateInputProps={{ ...field }}
          isRequired={ (!role ||!role?.fieldsPermissions?.includes('invoiceDate')) }
          placeHolder="date" handleChangeEvent={(e) => {
                      setValue("invoiceDate", e.replace("Sept", "Sep"));
                   

                      
                      trigger("invoiceDate");
                    }} isDisabled={type === 'view'}/>}
        />
                  {errors.invoiceDate &&
                    errors.invoiceDate.type === "required" && <ValidateError />}
                </div>
              </div>
              <div className="flex flex-1 gap-2 print:hidden">
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
             <h3 className="font-bold text-base text-primary dark:text-white print:hidden">Delivery info</h3>
           <div className="w-full flex-1 flex gap-4 print:hidden">
             
              
              <div className="flex flex-1 gap-2 print:hidden">
                <div className="w-full">
                   <Controller
          name="deliveryDate"
          control={control}
          render={({ field }) => <DateInput name="deliveryDate" title="تاريخ التسليم" ar={true}  dateInputProps={{ ...field }}
          isRequired={ (!role ||!role?.fieldsPermissions?.includes('deliveryDate')) }
          placeHolder="date" handleChangeEvent={(e) => {
                      setValue("deliveryDate", e.replace("Sept", "Sep"));
                   

                      
                      trigger("deliveryDate");
                    }} isDisabled={type === 'view'} />}
        />
                  {errors.deliveryDate &&
                    errors.deliveryDate.type === "required" && <ValidateError />}
                </div>
              </div>
              <div className="flex flex-1 gap-2 print:hidden">
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
              <h3 className="font-bold text-base text-primary dark:text-white print:hidden">Fraza Delivery info</h3>
           <div className="w-full flex-1 flex gap-4 print:hidden">
             
              
              <div className="flex flex-1 gap-2 print:hidden">
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
              <div className="flex flex-1 gap-2 print:hidden">
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
              <h3 className="font-bold text-base text-primary dark:text-white print:hidden">qsassa Delivery info</h3>
           <div className="w-full flex-1 flex gap-4 print:hidden">
             
              
              <div className="flex flex-1 gap-2 print:hidden">
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
              <div className="flex flex-1 gap-2 print:hidden">
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
              <h3 className="font-bold text-base text-primary dark:text-white print:hidden">store return info</h3>
           <div className="w-full flex-1 flex gap-4 print:hidden">
             
              
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
             {data?.data?.finalWeight && <>
              <h3 className="font-bold text-base text-primary dark:text-white print:hidden">بيانات التسليم ومعدل الهدر</h3>
           <div className="w-full flex-1 flex gap-4 print:hidden">
             
              
              <div className="flex flex-1 gap-2 print:hidden">
                <div className="w-full">
                  <Controller
                    name="weight"
                    rules={{ required: false }}
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
                        label={ 'الوزن البدائي'}
                        title="kg"
                        // customClass={
                        //   type !== "new" && type !== "duplicate"
                        //     ? "bg-[#f3f3f3]"
                        //     : ""
                        // }
                       
                      />
                    )}
                  />
                  {errors?.weight &&
                    errors?.weight?.type === "required" && <ValidateError />}
                </div>
              </div>
              
              <div className="flex flex-1 gap-2 print:hidden">
                <div className="w-full">
                  <Controller
                    name="finalWeight"
                    rules={{ required: false }}
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
                        label={ ' الوزن النهائي المسلم للعميل'}
                        title="kg"
                        // customClass={
                        //   type !== "new" && type !== "duplicate"
                        //     ? "bg-[#f3f3f3]"
                        //     : ""
                        // }
                       
                      />
                    )}
                  />
                  {errors?.finalWeight &&
                    errors?.finalWeight?.type === "required" && <ValidateError />}
                </div>
              </div>
               <div className="flex flex-1 gap-2 print:hidden">
                <div className="w-full">
                    <Input
                        inputProps={{
                          
                         type: "number",
                         readOnly:true,
                         value:returenedWeight,
                          onWheel: (e) => {
                            e.preventDefault();
                            //@ts-ignore
                            e.target.blur();
                          },
                        //   readOnly: type !== "new" && type !== "duplicate",
                        //   disabled: type !== "new" && type !== "duplicate",
                        }}
                        title="kg"
                        label={ ' الوزن المرتجع'}
                        
                        // customClass={
                        //   type !== "new" && type !== "duplicate"
                        //     ? "bg-[#f3f3f3]"
                        //     : ""
                        // }
                       
                      />
                </div>
              </div>
              <div className="flex flex-1 gap-2 print:hidden">
                <div className="w-full">
                    <Input
                        inputProps={{
                          
                         type: "number",
                         readOnly:true,
                         value:(((watch('weight') - (finalWeightWithReturn))/watch('weight'))*100).toFixed(2),
                          onWheel: (e) => {
                            e.preventDefault();
                            //@ts-ignore
                            e.target.blur();
                          },
                        //   readOnly: type !== "new" && type !== "duplicate",
                        //   disabled: type !== "new" && type !== "duplicate",
                        }}
                        label={ 'نسبة الهدر'}
                        title="%"
                        // customClass={
                        //   type !== "new" && type !== "duplicate"
                        //     ? "bg-[#f3f3f3]"
                        //     : ""
                        // }
                       
                      />
                </div>
              </div>
              
            </div>
            </>}
               {/* {data?.data?.finalNumberOfBoxes !==0 && data?.data?.numberOfBoxes !==0 && <>
              <h3 className="font-bold text-base text-primary dark:text-white">بيانات التسليم ومعدل الهدر</h3>
           <div className="w-full flex-1 flex gap-4">
             
              
              <div className="flex flex-1 gap-2">
                <div className="w-full">
                  <Controller
                    name="numberOfBoxes"
                    rules={{ required: false }}
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
                        label={ 'عدد الاطباق البدائي'}
                        
                        // customClass={
                        //   type !== "new" && type !== "duplicate"
                        //     ? "bg-[#f3f3f3]"
                        //     : ""
                        // }
                       
                      />
                    )}
                  />
                  {errors?.numberOfBoxes &&
                    errors?.numberOfBoxes?.type === "required" && <ValidateError />}
                </div>
              </div>
              <div className="flex flex-1 gap-2">
                <div className="w-full">
                  <Controller
                    name="finalNumberOfBoxes"
                    rules={{ required: false }}
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
                        label={ ' عدد الاطباق النهائي المسلم للعميل'}
                        
                        // customClass={
                        //   type !== "new" && type !== "duplicate"
                        //     ? "bg-[#f3f3f3]"
                        //     : ""
                        // }
                       
                      />
                    )}
                  />
                  {errors?.finalNumberOfBoxes &&
                    errors?.finalNumberOfBoxes?.type === "required" && <ValidateError />}
                </div>
              </div>
              <div className="flex flex-1 gap-2">
                <div className="w-full">
                    <Input
                        inputProps={{
                          
                         type: "number",
                         readOnly:true,
                         value:(((watch('numberOfBoxes')! - (watch('finalNumberOfBoxes')|| 0))/watch('numberOfBoxes')!)*100).toFixed(2),
                          onWheel: (e) => {
                            e.preventDefault();
                            //@ts-ignore
                            e.target.blur();
                          },
                        //   readOnly: type !== "new" && type !== "duplicate",
                        //   disabled: type !== "new" && type !== "duplicate",
                        }}
                        label={ 'نسبة الهدر'}
                        
                        // customClass={
                        //   type !== "new" && type !== "duplicate"
                        //     ? "bg-[#f3f3f3]"
                        //     : ""
                        // }
                       
                      />
                </div>
              </div>
              
            </div>
            </>} */}
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

      <div className="flex gap-4 justify-end pt-5 print:hidden">
        {type === 'view' ?<div className="flex gap-16 justify-end items-center w-[70%] ml-auto mr-0 print:hidden">
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
           <Button
            
            customeStyle="bg-primary text-white dark:text-primary dark:bg-primaryYellow p-3 px-2 rounded-full w-[200px] print:hidden"
            text={"print"}
            type="submit"
            width="150px"
            onClick={(e)=>{
              e.preventDefault()
              window.print();
            }}
          />
         
        </div>: <div className="flex gap-16 justify-end items-center w-[70%] ml-auto mr-0 mobile:pb-[70px] print:hidden">
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
            customeStyle="bg-primary text-white dark:text-primary dark:bg-primaryYellow p-3 px-2 rounded-full w-[200px] print:hidden"
            text={"save"}
            type="submit"
            width="150px"
          />
          
        </div>}
      </div>
    </form>
   {openModal && <Modal portal={true} isOpen={openModal} onClose={()=>{
    setOpenModal(false)
   }}>
         {modalType === 'clients'? <ClientModal label="انشاء عميل جديد"  />:<StorageModal label="انشاء مخزن جديد"/>}
    </Modal>}
    </div>
    
  );
};

export default OrderForm;