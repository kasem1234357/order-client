import { Dispatch, SetStateAction, useRef, useState } from "react";
import DropDownBox from "../custom/DropDownBox/DropDownBox";
import { useNavigate } from "react-router-dom";
import useOutsideClick from "../../hooks/useOutsideClick";
import {
  useActivateUserMutation,
  useActivationRoleMutation,
  useCreateInviteCodeMutation,
} from "../../lib/redux/services/Api";
import { generateMenu } from "../../utils/MenuGenerator";
import { ordersMenu, rolesMenu } from "../../config/menuConfig";
import { toastMessage } from "../../utils/utils";
import { toast } from "react-toastify";
import deactivateIcon from "../../assets/icons/DELETE __ DARK Red.svg";
import ModalButton from "../global/ModalButton";
import pricingGreen from "../../assets/icons/pricingGreen.svg";
import ActionModal from "../global/ActionModal";
import { useGetDictionary } from "../../hooks/useGetDictionary";
import { DictionaryType } from "../../types";
import ImageIcon from "../global/ImageIcon";
import MenuIcon from "../../assets/icons/MenuIcon";
import useClipBoard from "../../hooks/useClipBoard";
const Controll = ({
  row,
  tag,
  setRow,
  setActionType,
  setSidebarOpen,

  setIsModelTriggered,
  setRowId
}: {
  row: any;
  setActionType:any;
  tag: string;
  setRow: React.Dispatch<any>;
  setSidebarOpen: Dispatch<SetStateAction<boolean>>;
  clubId: number;
  setRowId:any
  setIsModelTriggered: Dispatch<SetStateAction<boolean>>;
}) => {
  const navigate = useNavigate();
  const { clubs, shared }: DictionaryType = useGetDictionary();
  const [openModel, setOpenModel] = useState<boolean>(false);
  const tdRef = useRef<HTMLTableCellElement>(null);
  const [createCode] = useCreateInviteCodeMutation()
    const {copyText} = useClipBoard()
   const generate = ()=>{
  const capitals ="ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  const numbers = "1234567890"
  const letters ="abcdefghijklmnopqrstuvwxyz"
  const sympols ="~!@#$%^&*()_+{[}]:<>?|/"
  const keys = capitals+numbers+letters+sympols

  let randomKey = ""
  for(let i=0;i<27;i++){
   randomKey += keys[Math.floor(Math.random()*keys.length)]
  }
  return randomKey
 }
  useOutsideClick(tdRef, () => {
    setOpenModel(false);
    setIsModelTriggered(false);
  });
  const menu = generateMenu(
   rolesMenu,
    {
      edit: {
        isAsync: false,
        params: {},
        cb: (props) => {
          setRow(row);
          setRowId(row._id)
          setActionType('edit')
          setSidebarOpen(true);
          setOpenModel(false);
        },
      },

      delete: {
        isAsync: true,
        params: {},
        cb: async (props) => {
          // try {
          //     const responseData = await toast.promise(
          //         deletePriceList({ id: row.id}).unwrap(),
          //         toastMessage()
          //     );
          // } catch (error) {
          //
          // }
        },
      },
      inviteCodeAction:{
        isAsync:true,
        cb:async()=>{
          const code = generate()
              try {
                await toast.promise(createCode({
                  roleId:row._id,
                  code:code
                }).unwrap().then((res:any)=>{
                  copyText(code,()=>{
                    toast.success('code copied in clipboard')
                  })
                }),toastMessage())
              } catch (error) {
                
              }
        },
        params:{}
      }
    },
   
  );
  return (
    <>
      <button
        //@ts-ignore
        // ref={tdRef}
        className="flex gap-2 items-center  p-2 rounded-md "
        onClick={() => {
          setOpenModel((prev) => !prev);
          setIsModelTriggered((prev) => !prev);
        }}
      >
        <ImageIcon Icon={MenuIcon} width={24} className="cursor-pointer z-10" />
      </button>
      {/* @ts-ignore */}
      <div ref={tdRef}>
        {openModel && menu && (
          <DropDownBox
            dropDownConfig={menu}
            title=""
            closeDropDown={() => {}}
            className=" absolute top-10 right-[20px]   w-max dark:bg-primary"
          />
        )}
      </div>
    </>
  );
};
export default Controll;