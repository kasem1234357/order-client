
import React from 'react'
import NotificationsIcon from '../assets/icons/NotificationsIcon'
import ImageIcon from '../components/global/ImageIcon'
import CalendarIcon from '../assets/icons/CalendarIcon'
import NavBarProfile from '../layouts/NavBarProfile'
import usePreNavigation from '../hooks/usePreNavigation'
import { useNavigate } from 'react-router-dom'

type Props = {}

function BottomNav({}: Props) {
    const { onCancel, onSuccess, CustomNavigate } = usePreNavigation(null, {
      isCustom: true,
    });
    const navigate = useNavigate()
  return (
    <>
      
      <div className='inverted-border-radius w-full fixed bottom-0 p-3 rounded-tl-sm bg-primary h-[80px] flex justify-between items-center px-6 z-50'>
        <div className='flex flex-col text-white justify-center items-center gap-2' onClick={()=>{
                navigate('/notification')
            }}>
            <div className='w-[25px] h-[25px]  ' >
                <ImageIcon
                  className=" stroke-white text-white fill-white "
                  Icon={NotificationsIcon}
                  width={20}
                  height={20}
                />
            </div>
             
                <p className='font-light'>Notification</p>
        </div>
        <div className='flex flex-col text-white justify-center items-center gap-2' onClick={()=>{
                navigate('/chat')
            }}>
            <div className='w-[25px] h-[25px] ' >
                <ImageIcon
                  className=" stroke-white text-white fill-white "
                  Icon={CalendarIcon}
                  width={20}
                  height={20}
                />
            </div>
             
                <p className='font-light'>Messages</p>
        </div>
         <div className='flex flex-col text-white justify-center items-center gap-2 z-[100] cursor-pointer'>
                        <NavBarProfile/>
        </div>
      </div>
    </>
   
  )
}

export default BottomNav