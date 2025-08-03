import { useEffect, useState } from 'react';

export function useIsIOS() {
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    //@ts-ignore
    const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    setIsIOS(iOS);
  }, []);

  return {isIOS};
}