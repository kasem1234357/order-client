import React, { useState } from 'react'
import ValidateError from '../global/ValidateError';
import { Controller, useForm } from 'react-hook-form';
import Input from '../global/Input';
import { useGetAllRolesNamesQuery, useGetAllStorageQuery } from '../../lib/redux/services/Api';
import SelectBox from '../global/SelectBox';
import Modal from '../global/Modal';
import ClientModal from '../global/ClientModal';
import StorageModal from '../global/StorageModal';
import StaticSelectBox from '../global/StaticSelectBox';
import Button from '../global/Button';
import { toastMessage } from '../../utils/utils';
import { toast } from 'react-toastify';
import { useCreateEmployeeMutation } from '../../lib/redux/services/sections/Auth';
type Props = {
  removeAnimation?: () => void;
  type?: "new" | "edit" | "add player" | "duplicate" | "view"|'edit-all'  ;
  rowData?: any;
  tableId?:string
};
type userType = {
    name:string,

    role:string,
    storage:string,
    stage:string,
    password:string
}
/*
      'Approved',
      'Fraza Delivered',
      'Qsasa Delivered',
      'Return Recorded',
      'Completed',
      "Cancelled"
      */
const stages = [
  {
    label:"موافقة الطلبات للبدأ بالعمل بها",
    value:"Approved"
  }, 
  {
   label:"مسؤول فرازة",
   value:"Fraza Delivered"
  },
  {
    label:"مسؤول قصاصة",
    value:"Qsasa Delivered"
  },
  {
    label:"مسؤول تسليم البضائع",
    value:"Completed"
  },
  {
    label:"مسؤول مخزن رئيسي",
    value:"Return Recorded"
  }
]
function UserForm({ removeAnimation, type = "new", rowData ,tableId}: Props) {
      const [openModal,setOpenModal]=useState(false)
      const [modalType,setModalType] = useState('storage')
      const [createEmployee] = useCreateEmployeeMutation()
    const defaultData:userType = {
        name:"",
        password:"",
        role:"",
        stage:"",
        storage:""

    }
    const { control,
    handleSubmit,
    reset,
    setValue,
    trigger,
    watch,
    formState: { errors },} = useForm<userType>({
        defaultValues:defaultData
    })
      const onSubmit = async (data: userType) => {
        
        
        try {
               await toast.promise(
            createEmployee({
              data:{
                ...data,
                //@ts-ignore
                storage:data.storage?.map(item =>item.storage),
                //@ts-ignore
                stage:data.stage?.map(item =>item.value),
              }
            }).unwrap(),
            toastMessage()
          );
          reset(defaultData);
          removeAnimation?.();
        } catch (error) {}
      };
  return (
    <div className="w-full px-6 py-8 flex flex-col gap-4 dark:bg-primary">
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-8">
                <div className='w-full flex-1 flex gap-4'>
                    <div className="flex flex-1 gap-2">
                                    <div className="w-full">
                                      <Controller
                                        name="name"
                                        rules={{ required:true}}
                                        control={control}
                                        render={({ field }) => (
                                          <Input
                                            inputProps={{
                                              ...field,
                                            }}
                                            label={'الاسم'}
 
                                          />
                                        )}
                                      />
                                      {errors.name &&
                                        errors.name.type === "required" && <ValidateError />}
                                    </div>
                                  </div>
                </div>
                <div className="w-full flex-1 gap-4 flex">
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
                                            
                                            
                                            isMulti={true}
                                            name={`storage`}
                                            onChange={(selected: {
                                              id: number;
                                              name: string;
                                              price: number;
                                            }) => {
                                         console.log(selected);
                                         
            field.onChange(selected); // Update form state with full objects
            //@ts-ignore
            setValue('storage', selected); // Sync with form state
            trigger('storage'); // Trigger validation
                                            }}
                                          />
                                        )}
                                      />
                                    </div>
                                 
                                  </div>
                </div>
                <div className='w-full flex-1 flex gap-4'>
                    <div className="flex flex-1 gap-2">
                                    <div className="w-full">
                                      <Controller
                                        name="password"
                                        rules={{ required:true}}
                                        control={control}
                                        render={({ field }) => (
                                          <Input
                                            inputProps={{
                                              ...field,
                                            }}
                                            label={'كلمة السر'}
 
                                          />
                                        )}
                                      />
                                      {errors.password &&
                                        errors.password.type === "required" && <ValidateError />}
                                    </div>
                                  </div>
                </div>
                <div className='w-full flex-1 flex gap-4'>
                   <div className="flex flex-1 gap-2">
                                  <div className="w-full flex-1 mobile:min-w-[300px]">
                                    <label className="block text-sm mb-2 text-primary dark:text-white">
                                       الصلاحيات
                                      <span className="text-red-500">*</span>
                                    </label>
                                    <Controller
                                      name={`role`}
                                      control={control}
                                      rules={{ required: false }}
                                      render={({ field }) => (
                                        <SelectBox
                                          field={field}
                                          isCustomOption={true}
                                          setValue={setValue}
                                          HasMenu={false}
                                          menuActionProps={{
                                           
                                          }}
                                          labelKey="name"
                                          optionValueKey="_id"
                                          
                                          requestFn={useGetAllRolesNamesQuery}
                                          
                                          
                                          
                                          name={`role`}
                                          onChange={(selected: {
                                            id: number;
                                            name: string;
                                            price: number;
                                          }) => {
                                            
                                            // @ts-ignore only
                                            return field.onChange(selected ? selected._id : null);
                                          }}
                                        />
                                      )}
                                    />
                                  </div>
                                </div>
                </div>
                <div className='w-full flex-1 flex gap-4'>
                   <div className="flex flex-1 gap-2">
                                  <div className="w-full flex-1 mobile:min-w-[300px]">
                                    <label className="block text-sm mb-2 text-primary dark:text-white">
                                       المرحلة المسؤول عنها
                                      <span className="text-red-500">*</span>
                                    </label>
                                    <Controller
                                      name={`stage`}
                                      control={control}
                                      rules={{ required: false }}
                                      render={({ field }) => (
                                        <StaticSelectBox
                                          field={field}
                                          isCustomOption={true}
                                          setValue={setValue}
                                          HasMenu={false}
                                          menuActionProps={{
                                           
                                          }}
                                          labelKey="label"
                                          optionValueKey="value"
                                          options={stages}
                                          requestFn={useGetAllRolesNamesQuery}
                                          
                                           isMulti={true}
                                          
                                          name={`stage`}
                                          onChange={(selected: {
                                            id: number;
                                            name: string;
                                            price: number;
                                          }) => {
                                           console.log(selected);
                                         
            field.onChange(selected); // Update form state with full objects
            //@ts-ignore
            setValue('stage', selected); // Sync with form state
            trigger('stage'); // Trigger validation
                                          }}
                                        />
                                      )}
                                    />
                                  </div>
                                </div>
                </div>
            </div>
            <div className="flex gap-16 justify-end items-center w-[70%] ml-auto mr-0 mobile:pb-[70px] pt-4">
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
                    </div>
        </form>
        {openModal && <Modal portal={true} isOpen={openModal} onClose={()=>{
            setOpenModal(false)
           }}>
                 {modalType === 'clients'? <ClientModal label="انشاء عميل جديد"  />:<StorageModal label="انشاء مخزن جديد"/>}
            </Modal>}
    </div>
  )
}

export default UserForm