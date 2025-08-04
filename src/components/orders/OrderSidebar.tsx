import React, { useEffect, useState } from "react";
//import PrivateCoachingForm from "./PrivateCoachingForm";
import { cn } from "../../utils/utils";
import OrderForm from "./OrderForm";
import OrderHistory from "./OrderHistory";
import { useSelector } from "react-redux";
//import BookingHistory from "../../booking/BookingHistory";

type Props = {
  removeAnimation?: () => void;
  id?: number;
  type?: "new" | "edit" | "add player" | "duplicate" | "view"|'edit-all';
  tableId?: string;
  rowData?: any;
  openSuccessModal?: (props: any) => void;
  setOpenModal:React.Dispatch<React.SetStateAction<boolean>>
      selectedCalenderSlot:any,
      setSelectedCalenderSlot:any,
     
};
function OrderSidebar({
  removeAnimation,
  id,
  type = "new",
  tableId,
  rowData,
  openSuccessModal,
  setOpenModal,selectedCalenderSlot,setSelectedCalenderSlot
}: Props) {
  const [actionType, setActionType] = useState<
    "new" | "edit" | "add player" | "duplicate" | "view"|'edit-all'
  >("new");
   const [pageType, setPageType] = useState<"details" | "history">("details");
     const isAdmin = useSelector((state:any)=>state.user?.user?.currentUser?.isAdmin)
  useEffect(() => {
    setActionType(type);
  }, [type, tableId]);

  return (
    <>
     { (type !== 'new' && type !== 'duplicate' && isAdmin)&& <ul className="flex
            gap-[16px]
            pt-[40px] px-[20px]
            border-b-[2px]
            border-[#f3f3f3]
            ">
              <li className={cn("py-[5px] px-[10px] cursor-pointer ",pageType === 'details'&& 'bg-primary text-white rounded-md  -m-[1px]')} onClick={()=>{
                 setPageType('details')
              }}>Edit Details</li>
              <li className={cn("py-[5px] px-[10px] cursor-pointer",pageType === 'history'&& 'bg-primary text-white rounded-md  -m-[1px]')} onClick={()=>{
                 setPageType('history')
              }}>Order history</li>
            </ul>}
            {
              pageType === 'history'&& <OrderHistory orderId={tableId!}/>
            }
          { pageType === 'details'&& <OrderForm removeAnimation={removeAnimation } tableId={tableId} type={type}/>}
   {/* {pageType === 'details'&& <PrivateCoachingForm
      type={actionType}
      setActionType={setActionType}
      removeAnimation={removeAnimation}
      bookingId={tableId}
      openSuccessModal={openSuccessModal}
      setOpenModal={setOpenModal} selectedCalenderSlot={selectedCalenderSlot} setSelectedCalenderSlot={setSelectedCalenderSlot}
    />} */}
     {/* {
        pageType === 'history'&& <BookingHistory bookingId={tableId!}/>
      } */}
    </>
  );
}

export default OrderSidebar;
