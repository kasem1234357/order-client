import { useRef, useEffect, useCallback } from 'react';

/**
 * useDebounceCallback - Debounces a callback function
 * @param callback The function to debounce
 * @param delay The debounce delay in milliseconds
 * @returns A debounced version of the callback
 */
export function useDebounceCallback<T extends (...args: any[]) => void>(
  callback: T,
  delay: number
): (...args: Parameters<T>) => void {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Store the latest callback in a ref to avoid closure issues
  const callbackRef = useRef<T>(callback);
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  const debouncedCallback = useCallback((...args: Parameters<T>) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      callbackRef.current(...args);
    }, delay);
  }, [delay]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return debouncedCallback;
}
