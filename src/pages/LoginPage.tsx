import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import Input from '../components/global/Input'
import ValidateError from '../components/global/ValidateError'
import Button from '../components/global/Button'
import { useLoginMutation } from '../lib/redux/services/sections/Auth'
import { toast } from 'react-toastify'
import { toastMessage } from '../utils/utils'
import { useNavigate } from 'react-router-dom'

type Props = {}

function LoginPage({}: Props) {
  const {control,handleSubmit,formState:{errors},reset} = useForm({
    defaultValues:{
      email:'',
      password:'',
    }
  })
  const [login] = useLoginMutation()
  const navigate = useNavigate()
  const onSubmit = async(data:any)=>{
    try {
        await toast.promise(login(data).unwrap(),toastMessage()).then(res =>{
          console.log(res);
          localStorage.setItem('access_token',res.data.data.token)
          localStorage.setItem('userInfo',JSON.stringify(res.data.data))
          
            navigate('/')
        })
    } catch (error) {
      
    }
  }
  return (
    <div className='w-full h-full flex justify-center items-center bg-white min-h-screen'>
      <form  className='p-5 shadow-md rounded-md bg-white min-w-[320px] flex flex-col justify-center items-center gap-8 border border-primary' onSubmit={handleSubmit(onSubmit)}>
        <h1 className='font-bold text-lg '>Login</h1>
         <div className="gap-4 flex flex-col items-center ">
           <div className="flex-1 min-w-[250px]">
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
                      </div>
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