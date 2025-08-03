
import { useSelector } from 'react-redux';
import { UserSliceType } from '../../lib/redux/slices/userSlice';
import profile_placeholder from "../../assets/images/user_placeholder.png";
import { useGetOrderHistoryQuery } from '../../lib/redux/services/Api';
import Loader from '../skeletons/Loader';

import LongRightArrowIcon from '../../assets/icons/LongRightAroowIcon';
import { cn } from '../../utils/utils';
import { useEffect, useState } from 'react';


type Props = {
  orderId:string
}

function OrderHistory({orderId}: Props) {
   const [historyLogs,setHistoryLogs] = useState<any>([])
      const {
        data,
        isLoading,
        isError: bookingIsError,
        error,
        refetch,
        isSuccess,
        isFetching,
      } = useGetOrderHistoryQuery(
        { id: orderId },
        
      );
      useEffect(()=>{
             if(data?.data && isSuccess){
              const groupedLogs: any[] = [];

data?.data.forEach((item: any) => {
  const existingGroup = groupedLogs.find(group => group.date === item.date);

  if (existingGroup) {
    existingGroup.lines.push(item);
  } else {
    groupedLogs.push({
      date: item.date,
      lines: [item]
    });
  }
});

setHistoryLogs(groupedLogs);

              
             }
      },[data,isSuccess])
      useEffect(()=>{
           console.log(historyLogs);
           
      },[historyLogs])
        if (bookingIsError) {
           <div>error</div>
        }
        if (isLoading || isFetching) {
          return (
            <div className="w-full h-full flex flex-col justify-center items-center">
              <Loader />
            </div>
          );
        }
  return (
    <div className='p-2 pl-5 pt-5'>
      {historyLogs?.map((item:any)=>{
        return (
          <div>
            <div className='flex gap-4 mb-2'>
               <span className='p-1 rounded-3xl bg-[#f3f3f3] px-3'>{item.date}</span>
            </div>
            {item?.lines.map((logItem:any)=>{
              return (
                 <div className='flex flex-col gap-2  pl-5'>
              <div className='flex gap-2 items-center  pt-2'>
                <img src={logItem.user?.img || profile_placeholder} alt="" className='w-[40px] h-[40px] rounded-full' loading='lazy' />
                <h3 className='font-bold'>{logItem.name}</h3>
                <span className='text-sm text-[#cfcfcf]'> - {logItem.time}</span>
              </div>
               <ul className='pt-2'>
                 {logItem?.method === 'write' ? logItem?.logs?.map((lineItem:any,index:number)=>(
                  <>
                  
                   <li className={cn('flex gap-3 pl-14 relative pb-8 flex-wrap',(index === logItem?.lines?.length-1) && 'pb-2')}>
                    <i className='absolute w-[25px] h-[25px] rounded-full bg-[#f3f3f3] left-[5px] p-2 flex'>
                      <i className='w-full h-full rounded-full bg-primary'></i>
                    </i>
                    {index <logItem?.lines?.length-1 && <i className='absolute w-[3px] h-[calc(100%-35px)] rounded-sm bg-primary left-[16px]  top-[30px]'>

                    </i>}
                    <span>{(typeof(lineItem.oldValue) === 'object'?lineItem.oldValue?.name:lineItem.oldValue) || "' '"}</span>
                     <LongRightArrowIcon width={'25px'}/>
                    <p>{(typeof(lineItem.newValue) === 'object'?lineItem.newValue?.name:lineItem.newValue) || "' '"} <span className='pl-1'>({lineItem.field})</span></p>
                    {lineItem?.note &&<p className='text-[#868181]'>{lineItem?.note}</p>}
                  </li>
                  
                  </>
                 
            )):<li className='flex gap-3 pl-14 relative pb-4'>
                    <i className='absolute w-[25px] h-[25px] rounded-full bg-[#f3f3f3] left-[5px] p-2 flex'>
                      <i className='w-full h-full rounded-full bg-primary'></i>
                    </i>
                      <p>{logItem?.logs[0]?.msg}</p>

                 
                    
                  </li>}
            </ul>
             </div>
              )
            })}
            
           
          </div>
        )
      })}
    </div>
  )
}
export default OrderHistory