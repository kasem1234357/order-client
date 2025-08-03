import React, { useEffect, useState } from "react";
//import PrivateCoachingForm from "./PrivateCoachingForm";
import { cn } from "../../utils/utils";
import ClubsRolesContent from "./ClubsRolesContent";
//import BookingHistory from "../../booking/BookingHistory";

type Props = {
  removeAnimation?: () => void;
  id?: number;
  type?: "new" | "edit" | "view";
  tableId?: number;
  rowData?: any;
  openSuccessModal?: (props: any) => void;
  setOpenModal:React.Dispatch<React.SetStateAction<boolean>>
      selectedCalenderSlot:any,
      setSelectedCalenderSlot:any,
     
};
function RolesSidebar({
  removeAnimation,
  id,
  type = "new",
  tableId,
  rowData,
  openSuccessModal,
  setOpenModal,selectedCalenderSlot,setSelectedCalenderSlot
}: Props) {
  const [actionType, setActionType] = useState<
    "new" | "edit"  | "view"
  >("new");
  useEffect(() => {
    setActionType(type);
  }, [type, tableId]);

  return (
    <>
    
            <ClubsRolesContent roleId={tableId} type={actionType}  removeAnimation={removeAnimation} />
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

export default RolesSidebar;
