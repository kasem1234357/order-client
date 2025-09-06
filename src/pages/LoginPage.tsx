import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import Input from '../components/global/Input'
import ValidateError from '../components/global/ValidateError'
import Button from '../components/global/Button'
import { useLoginMutation } from '../lib/redux/services/sections/Auth'
import { toast } from 'react-toastify'
import { toastMessage } from '../utils/utils'
import { useNavigate } from 'react-router-dom'
import bg from '../assets/icons/bg.svg'
import CheckBox from '../components/global/CheckBox'

type Props = {}

function LoginPage({}: Props) {
  const [isAdmin,setIsAdmin] = useState(false)
  const {control,handleSubmit,formState:{errors},reset} = useForm({
    defaultValues:{
      email:'',
      password:'',
      name:""
    }
  })
  const [login] = useLoginMutation()
  const navigate = useNavigate()
  const onSubmit = async(data:any)=>{
    try {
        await toast.promise(login({data,isAdmin}).unwrap(),toastMessage()).then(res =>{
          console.log(res);
          localStorage.setItem('access_token',res.data.data.token)
          localStorage.setItem('userInfo',JSON.stringify(res.data.data))
          
            navigate('/')
        })
    } catch (error) {
      
    }
  }
  return (
    <div className='w-full h-full flex justify-center items-center bg-white min-h-screen relative'>
      <img src={bg} alt="" className='w-full h-full inset-0 absolute object-cover z-10' />
      <form  className='p-5 shadow-md rounded-md bg-white min-w-[320px] flex flex-col justify-center items-center gap-8 border border-secondary z-20' onSubmit={handleSubmit(onSubmit)}>
        <h1 className='font-bold text-lg '>Login</h1>
         <div className="gap-4 flex flex-col items-center ">
           {isAdmin ?<div className="flex-1 min-w-[250px]">
                        <Controller
                          name="email"
                          control={control}
                          rules={{ required: true }}
                          render={({ field }) => (
                            <Input
                              label={'email'}
                            
                              inputProps={{
                                ...field,
                                  type:'email',
                                className:
                                  "block w-full p-2 bg-gray-800 border border-gray-700 rounded-md",
                               
                              }}
                             
                            />
                          )}
                        />
                        {errors.email && (
                          <ValidateError/>
                        )}
                      </div>:<div className="flex-1 min-w-[250px]">
                        <Controller
                          name="name"
                          control={control}
                          rules={{ required: true }}
                          render={({ field }) => (
                            <Input
                              label={'name'}
                            
                              inputProps={{
                                ...field,
                                  
                                className:
                                  "block w-full p-2 bg-gray-800 border border-gray-700 rounded-md",
                               
                              }}
                             
                            />
                          )}
                        />
                        {errors.name && (
                          <ValidateError/>
                        )}
                      </div>}
                        <div className="flex-1 min-w-[250px]">
                        <Controller
                          name="password"
                          control={control}
                          rules={{ required: true }}
                          render={({ field }) => (
                            <Input
                              label={'password'}
                              inputProps={{
                                ...field,
                                type:'password',
                                className:
                                  "block w-full p-2 bg-gray-800 border border-gray-700 rounded-md",
                               
                              }}
                             
                            />
                          )}
                        />
                        {errors.password && (
                          <ValidateError/>
                        )}
                      </div>
                       <div className="flex gap-2">
                        <CheckBox
                          customClassName="w-4 h-5  mx-auto border-2 border-gray-700 text-lg "
                          customeCheckBoxClass="z-30 "
                          checkboxProps={{
                            name: "isAdmin",
                            checked: isAdmin,
                          }}
                          isCustom={true}
                          label="تسجيل الدخول ك ادمن"
                          labelStyle="text-lg"
                          trigger={() => {
                            setIsAdmin((prev) => !prev);
                          }}
                        />
                      </div>
                      <p className='cursor-pointer' onClick={()=>{
                        navigate('/register')
                      }}>create account</p>
         </div>
         <div className="flex gap-16 justify-between items-center w-full ml-auto mr-0 mobile:pb-[70px]">
          <Button
            customeStyle="text-red-500"
            text={'reset'}
            type="reset"
            width="150px"
            onClick={(e) => {
              e.preventDefault();
              reset()
               
            }}
          />

          <Button
            customeStyle="bg-primary text-white dark:text-primary dark:bg-primaryYellow p-3 px-8 rounded-full w-fit "
            text={'save'}
            type="submit"
            width="150px"
          />
        </div>
         
      </form>
    </div>
  )
}

export default LoginPage