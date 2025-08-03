import { useEffect, useState, RefObject } from 'react';

type ScrollInfo = {
  verticalScroll: boolean;
  horizontalScroll: boolean;
  verticalScrollHeight:number
};

export function useScrollDetection<T extends HTMLElement>(ref: RefObject<T>,updateCallBack?:any): ScrollInfo {
  const [scrollInfo, setScrollInfo] = useState<ScrollInfo>({
    verticalScroll: false,
    horizontalScroll: false,
    verticalScrollHeight:0,
  });
 useEffect(()=>{
updateCallBack && updateCallBack({
     verticalScroll: false,
    horizontalScroll: false
})
 },[])
  useEffect(() => {
    if (!ref.current) return;

    let animationFrame: number | null = null;

    const updateScrollData = () => {
      if (animationFrame !== null) {
        cancelAnimationFrame(animationFrame);
      }

      animationFrame = requestAnimationFrame(() => {
        if (ref.current) {
          console.log(ref.current);
          
          setScrollInfo({
            verticalScroll: ref.current.scrollHeight > ref.current.clientHeight,
            horizontalScroll: ref.current.scrollWidth > ref.current.clientWidth,
            verticalScrollHeight:ref.current.scrollHeight
          });
          updateCallBack && updateCallBack({
            verticalScroll: ref.current.scrollHeight > ref.current.clientHeight,
            horizontalScroll: ref.current.scrollWidth > ref.current.clientWidth,
             verticalScrollHeight:ref.current.scrollHeight
          })
        }
      });
    };

    // Initial check
    updateScrollData();

    // Listen to window resize
    window.addEventListener('resize', updateScrollData);

    // Listen to element resize using ResizeObserver
    let resizeObserver: ResizeObserver | null = null;
    if ('ResizeObserver' in window) {
      resizeObserver = new ResizeObserver(updateScrollData);
      resizeObserver.observe(ref.current);
    }

    // Cleanup
    return () => {
      window.removeEventListener('resize', updateScrollData);
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
      if (animationFrame !== null) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [ref]);

  return scrollInfo;
}
