import { useForm, useFieldArray, Controller } from "react-hook-form";
import Input from "../global/Input";
import CheckBox from "../global/CheckBox";
import RadioInput from "../global/RadioInput";
import { routes } from "../../config/routesConfig";
import Button from "../global/Button";
import { cn, toastMessage } from "../../utils/utils";
import { toast } from "react-toastify";
import {
  useCreateRoleMutation,
  useEditRoleMutation,
  useGetRoleByIdQuery,
} from "../../lib/redux/services/Api";
import { useEffect } from "react";

import { DictionaryType } from "../../types";
import { useGetDictionary } from "../../hooks/useGetDictionary";
import { useViewport } from "../../hooks/useViewport";
import { fieldsNames } from "../../constants";

type Props = {
  removeAnimation?: () => void;
  roleId?: string | number;
  type?: "new" | "edit"|'view';
  clubId?: string | number;
  rowData?: any;
};

function ClubsRolesContent({
  removeAnimation,
  roleId,
  type,
  clubId,
  rowData,
}: Props) {
  const { inputs, shared, clubs, navbar }: DictionaryType = useGetDictionary();
  const [createRole] = useCreateRoleMutation();
  const [editRole] = useEditRoleMutation();
  const {isLandscapeOrientation,isMobile} = useViewport()
  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
    isSuccess,
    isFetching,
    currentData,
  } = useGetRoleByIdQuery({id:roleId}, {
    skip: !roleId,
  });

  const defaultData = {
    name: "",
    status: "Active",
    fieldsNames:[],
    permissions: [
      ...routes
        .filter((route) => route.isMainPage)
        .map((route) => {
          return {
            section: route.tag,
            title: route.title,
            read: true,
            create: false,
            write: false,
            delete: false,
            icon: route.icon,
          };
        }),
    ],
  };
  const test = (data: any) => {
    console.log(data?.data);
    
    const mergePermissions = (currentPermissions: any) => {
      return defaultData.permissions.map((item) => {
        const permission = currentPermissions.find(
          (p: { section: string }) => p.section === item.section
        );
        return permission ? { ...item, ...permission } : item;
      });
    };

    return {
      name: data?.data?.Roles?.name,
      status: data?.data?.Roles?.status,
      fieldsNames:data?.data?.Roles?.fieldsPermissions || [],
      permissions: mergePermissions(data?.data?.Roles?.sectionPermissions),
    };
  };

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
    trigger,
    getValues,
    watch,
  } = useForm({
    disabled:type === 'view',
    defaultValues: defaultData,
  });
  const fieldsValue = watch('fieldsNames')
  const { fields } = useFieldArray({
    control,
    name: "permissions",
  });

  useEffect(() => {
    if (data) {
      reset(test(data));
    }
  }, [data,isSuccess]);
  const onSubmit = async (data: any) => {
    try {
      if (type === "new") {
        await toast.promise(
          createRole({ data, id: clubId }).unwrap(),
          toastMessage()
        );
      } else {
        await toast.promise(
          editRole({ data, id: roleId }).unwrap(),
          toastMessage()
        );
      }

      reset(defaultData);
      removeAnimation && removeAnimation();
    } catch (error) {}
    // Navigate based on the action
  };
  if (isLoading || isFetching) {
    return <div>loading</div>;
  }
  const updateFieldData = (fieldName: string, value: any) => {
   

     //@ts-ignore
    setValue(fieldName, value);
    //@ts-ignore
    
    //@ts-ignore
    trigger(fieldName); // Optional: Trigger validation for the field
  };

  const selectAll = (type:string) =>{
    const isAllTrue = getValues(`permissions`).every((item)=>{
      //@ts-ignore
      return item[type]
    })
    
    setValue(`permissions`,getValues(`permissions`).map((item)=>{
          return {
            ...item,
            //@ts-ignore
            [type]: isAllTrue?false:true
          }
    

    }))
  }

  return (
    !isLoading &&
    !isFetching && (
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-6 text-white dark:bg-primary flex flex-col gap-6  justify-between text-start"
      >
        <div className="flex flex-col gap-6 ">
          <div className="flex gap-6 justify-center items-center mobile:flex-wrap mobile:gap-2">
            <div className="flex-1 min-w-[250px]">
              <Controller
                name="name"
                control={control}
                rules={{ required: shared.this_filed_is_required }}
                render={({ field }) => (
                  <Input
                    label={inputs.name}
                    inputProps={{
                      ...field,
                      className:
                        "block w-full p-2 bg-gray-800 border border-gray-700 rounded-md",
                     readOnly:type === 'view'
                    }}
                    customClass={type === 'view'?"bg-[#f2f2f2]":''}
                  />
                )}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Status */}
            <div className="flex-1 pt-5 mobile:pt-2">
              <Controller
                name="status"
                control={control}
                render={({ field }) => (
                  <div className="flex flex-row items-center gap-8">
                    <label className=" font-bold text-primary dark:text-white">
                      {inputs.status}
                    </label>
                    <RadioInput
                      value="Active"
                      label={inputs.active}
                      isDisabled={type === 'view'}
                      checked={field.value === "Active"}
                      onChange={field.onChange}
                    />
                    <RadioInput
                      value="Inactive"
                      label={inputs.not_active}
                        isDisabled={type === 'view'}
                      checked={field.value === "Inactive"}
                      onChange={field.onChange}
                    />
                  </div>
                )}
              />
            </div>
          </div>

          <div className="overflow-x-auto flex flex-col gap-4  overflow-hidden customScroll">
            <h3 className="text-lg font-bold text-primary dark:text-white ">
              {clubs.permissions}
            </h3>
            <table className="min-w-full  overflow-y-auto border-collapse border border-gray-300 rounded-lg">
              <thead className="sticky top-0 z-10 ">
                <tr className="table w-full table-fixed">
                  <th className="p-2 text-primary dark:text-white font-normal text-center"></th>
                  <th className="p-2 text-primary dark:text-white font-normal text-center cursor-pointer" onClick={()=>{
                    if(type === 'view'){
                        return
                      }
                    selectAll("read")
                  }}>
                    {inputs.read}
                  </th>
                  <th className="p-2 text-primary dark:text-white font-normal text-center cursor-pointer"  onClick={()=>{
                    if(type === 'view'){
                        return
                      }
                    selectAll("create")
                  }}>
                    {inputs.create}
                  </th>
                  <th className="p-2 text-primary dark:text-white font-normal text-center cursor-pointer" onClick={()=>{
                    if(type === 'view'){
                        return
                      }
                    selectAll("write")
                    }}>
                    {inputs.write}
                  </th>
                  <th className="p-2 text-primary dark:text-white font-normal text-center cursor-pointer" onClick={()=>{
                    if(type === 'view'){
                        return
                      }
                    selectAll("delete")
                    }}>
                    {inputs.delete}
                  </th>
                </tr>
              </thead>
              <tbody className={cn(" block customScroll  w-full max-h-[calc(100dvh-330px)] overflow-y-auto",isLandscapeOrientation() && isMobile && 'max-h-[calc(100dvw-330px)]')}>
                {fields.map((field, index) => (
                  <tr key={field.id} className="table w-full table-fixed">
                    <td className="p-2 py-3 text-primary dark:text-white text-sm flex gap-2 items-center cursor-pointer" onClick={()=>{
                      if(type === 'view'){
                        return
                      }
                      const items = watch(`permissions.${index}`)
                      
                      //@ts-ignore
                      if(items.read || items.create || items.write || items.delete){
                        setValue(`permissions.${index}.read`,false)
                        setValue(`permissions.${index}.create`,false)
                        setValue(`permissions.${index}.write`,false)
                        setValue(`permissions.${index}.delete`,false)
                      }else{
                        setValue(`permissions.${index}.read`,true)
                        setValue(`permissions.${index}.create`,true)
                        setValue(`permissions.${index}.write`,true)
                        setValue(`permissions.${index}.delete`,true)
                       
                      }
                       
                    }}>
                      {field?.icon && field?.icon(28, 28)}
                      {/* @ts-ignore */}
                      {navbar[field.title] || field.section}
                      {/* {field.section} */}
                    </td>
                    {/* @ts-ignore */}

                    {["read", "create", "write", "delete"].map(
                      (permission, index2) => {
                        return(
                          <td key={permission+field.section} className="p-2 py-3 text-center ">
                            <Controller
                              //@ts-ignore
                              name={`permissions.${index}.${permission}`}
                              control={control}
                              render={({ field }) => {

                                return (
                                  <>
                                    <CheckBox
                                      customClassName="w-4 h-5  mx-auto border-2 border-gray-700 "
                                      {...field}
                                      isDisabled={type === 'view'}
                                      checkboxProps={{
                                        name: `permissions.${index}.${permission}`,
                                        //@ts-ignore
                                        checked: field.value,
                                      }}
                                      trigger={updateFieldData}
                                      isCustom={true}
                                    />
                                  </>
                                );
                              }}
                            />
                          </td>
                        )
                       }
                      )}
                          
                       
                      
                    
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
           <div className="overflow-x-auto flex flex-col gap-4  overflow-hidden customScroll">
            <h3 className="text-lg font-bold text-primary dark:text-white ">
              Allow Fields
            </h3>
            <table className="min-w-full  overflow-y-auto border-collapse border border-gray-300 rounded-lg">
              <thead className="sticky top-0 z-10 ">
                <tr className="table w-full table-fixed">
                  <th className=" text-primary dark:text-white font-normal text-center "></th>
                  <th className=" text-primary dark:text-white font-normal text-center cursor-pointer" >
                  
                  </th>
                 
                </tr>
              </thead>
              <tbody className={cn(" block customScroll  w-full max-h-[calc(100dvh-330px)] overflow-y-auto",isLandscapeOrientation() && isMobile && 'max-h-[calc(100dvw-330px)]')}>
                {fieldsNames.map((fieldItem, index) => (
                  <tr key={fieldItem.tag} className="table w-full table-fixed">
                    <td className="p-2 py-3 text-primary dark:text-white  flex gap-2 items-center cursor-pointer text-lg" 
                    // onClick={()=>{
                    //   if(type === 'view'){
                    //     return
                    //   }
                    //   const items = watch(`permissions.${index}`)
                      
                    //   //@ts-ignore
                    //   if(items.read || items.create || items.write || items.delete){
                    //     setValue(`permissions.${index}.read`,false)
                    //     setValue(`permissions.${index}.create`,false)
                    //     setValue(`permissions.${index}.write`,false)
                    //     setValue(`permissions.${index}.delete`,false)
                    //   }else{
                    //     setValue(`permissions.${index}.read`,true)
                    //     setValue(`permissions.${index}.create`,true)
                    //     setValue(`permissions.${index}.write`,true)
                    //     setValue(`permissions.${index}.delete`,true)
                       
                    //   }
                       
                    // }}
                    >
                      
                      {/* @ts-ignore */}
                      
                      {fieldItem.fieldName}
                    </td>
                    {/* @ts-ignore */}

                    {["read"].map(
                      (permission, index2) => {
                        return(
                          <td key={fieldItem.tag+'read'} className="p-2 py-3 text-center ">
                            <Controller
                              //@ts-ignore
                              name={'fields'}
                              control={control}
                              render={({ field }) => {

                                return (
                                  <>
                                    <CheckBox
                                      customClassName="w-4 h-5  mx-auto border-2 border-gray-700 "
                                      {...field}
                                      
                                      isDisabled={type === 'view'}
                                      checkboxProps={{
                                        name: `fields`,
                                        //@ts-ignore
                                        
                                        checked:fieldsValue?.includes(fieldItem.tag),
                                       
                                      }}
                                      trigger={()=>{
                                          console.log(fieldItem.tag);
                                          console.log(getValues());
                                          console.log(getValues('fieldsNames'));
                                          
                                          
                                          
                                          //@ts-ignore
                                          if(!fieldsValue.includes(fieldItem.tag)){
                                            console.log('hi');
                                            
                                            //@ts-ignore
                                               setValue('fieldsNames',[...fieldsValue,fieldItem.tag])
                                          }else{
                                             //@ts-ignore
                                               setValue('fieldsNames',fieldsValue.filter(item =>item !== fieldItem.tag))
                                          }

                                        }}
                                      isCustom={true}

                                    />
                                  </>
                                );
                              }}
                            />
                          </td>
                        )
                       }
                      )}
                          
                       
                      
                    
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      {type === 'view' ?<div className="flex gap-16 justify-end items-center w-[70%] ml-auto mr-0">
          <Button
            customeStyle="text-red-500 p-2 border border-primaryRed rounded-full w-[200px]"
            text={shared.close}
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
            text={shared.cancel}
            type="reset"
            width="150px"
            onClick={(e) => {
              e.preventDefault();

              removeAnimation && removeAnimation();
            }}
          />

          <Button
            customeStyle="bg-primary text-white dark:text-primary dark:bg-primaryYellow p-3 px-2 rounded-full w-[200px]"
            text={shared.save}
            type="submit"
            width="150px"
          />
        </div>}
        {/* Name */}
      </form>
    )
  );
}

export default ClubsRolesContent;
