import { RefObject, useCallback, useEffect } from "react";

type EventType = 'mousedown' | 'mouseup' | 'click' | 'touchstart';
type OutsideClickHandler = (event: Event) => void;

const useOutsideClick = (
  refs: RefObject<HTMLElement> | RefObject<HTMLElement>[],
  handler: OutsideClickHandler,
  eventType: EventType = 'mousedown',
  reset?: boolean
) => {

      const listener = (event: Event) => {
      const target = event.target as Node | null;
      if (!target || !target.isConnected) return;

      const isOutside = Array.isArray(refs)
        ? refs.every(ref => ref.current && !ref.current.contains(target))
        : refs.current && !refs.current.contains(target);

      if (isOutside) {
        handler(event);
      }
    };
      const currentCallBack = useCallback(listener,[])
  useEffect(() => {
    if (reset) return;
   


    window.addEventListener(eventType, currentCallBack);

    return () => {
      window.removeEventListener(eventType, currentCallBack);
    };
  }, [refs,currentCallBack,  eventType, reset]);
};

export default useOutsideClick;
