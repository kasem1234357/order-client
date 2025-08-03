import { useEffect, useState } from "react";

function clipBoardSupported(successCb?:()=>void,failedCb?:()=>void) {
    if (navigator.clipboard) {
      console.log("clipboard is supported by this browser :)");
      successCb && successCb()
      return true
    } else {
      console.log("clipboard is NOT supported by this browser :(");
      failedCb && failedCb()
      return false
    }
  }
  const useClipBoard = ()=>{
    const [isPremmisionAllow,setIsPremmisionAllow]=useState(true)
    const [coppedText,setCoppedText] = useState('')
    const copyText =(text:string,callback:()=>void)=>{
        if(navigator.clipboard){
            navigator.clipboard.readText()
            navigator.clipboard.writeText(text)
            setCoppedText(text)
            callback && callback()
        }
        
    }
    const readTextFn = (callback?:(text:string)=>void)=>{
        if(navigator.clipboard){
            const textCopped = navigator.clipboard.readText().then((text)=>{
                callback && callback(text)
                return text
                })
            return textCopped
        }
    }
    const isClibBoardEmpty = ()=>{
    
        if(navigator.clipboard){
            return navigator.clipboard.readText().then((text : string)=>{
                return text.length === 0
                })
    }
  }
  useEffect(()=>{
    clipBoardSupported()&& setIsPremmisionAllow(true)
  },[])
    // clipBoardSupported()&& setIsPremmisionAllow(true)
    //@ts-ignore


    return{
        isPremmisionAllow,
        clipBoardSupported,
        coppedText,
        copyText,
        readTextFn,
         isClibBoardEmpty
    }
  }
  export default useClipBoard