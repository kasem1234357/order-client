import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { checkPath } from "../utils/utils";
import { log } from "node:console";
import { FORM_ROUTES } from "../constants";
type NavigationHandler = (url: string) => Promise<boolean> | boolean;
type Options = {
  isCustom?: boolean;
  onSuccess?: () => void;
  onError?: () => void;
  onCancel?: () => void;
}
const usePreNavigation = (handler?: NavigationHandler|null,options?:Options) => {
  const navigate = useNavigate();
  const [nextPath, setNextPath] = useState<string | null>(null);
  const onSuccess = (path?:string)=>{
    if(options && options.onSuccess){
      options.onSuccess()
     
      
    }
    if(nextPath ){

      navigate(path?path:nextPath);
    }else if(path){
        navigate(path);
    }
  }
  const onCancel = ()=>{
    if(options && options.onCancel){
      options.onCancel()
      
      
    }
    setNextPath(null);
  }
  const CustomNavigate = (path: string) => {
    setNextPath(path);
  }
  useEffect(() => {
    if (nextPath && !options?.isCustom&&handler) {
      (async () => {
        const shouldProceed =await handler(nextPath);
        if (shouldProceed) {
          navigate(nextPath);
        }
        setNextPath(null);
      })();
    }
  }, [nextPath,navigate,  handler,options]);
 
  return ({
     CustomNavigate,
     onCancel,
     onSuccess
  })
};

export default usePreNavigation;
