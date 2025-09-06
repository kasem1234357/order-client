import React, { useEffect, useState } from "react";
import UserForm from "./UserForm";

type Props = {
  removeAnimation?: () => void;
  id?: number;
  type?: "new" | "edit" | "add player" | "duplicate" | "view"|'edit-all';
  tableId?: string;
};
function UserSidebar({
  removeAnimation,
  id,
  type = "new",
  tableId,

}: Props) {
  const [actionType, setActionType] = useState<
    "new" | "edit" | "add player" | "duplicate" | "view"|'edit-all'
  >("new");

  useEffect(() => {
    setActionType(type);
  }, [type, tableId]);

  return (
    <>

           <UserForm removeAnimation={removeAnimation } tableId={tableId} type={type}/> 
    </>
  );
}

export default UserSidebar;
