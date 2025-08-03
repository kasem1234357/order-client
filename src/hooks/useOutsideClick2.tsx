import { RefObject, useEffect } from "react";

type EventType = "mousedown" | "mouseup" | "click" | "touchstart";
type OutsideClickHandler = (event: Event) => void;

const useOutsideClick2 = (
  Ref: RefObject<HTMLElement> | RefObject<HTMLElement>[],
  handler: OutsideClickHandler,
  eventType: EventType = "mousedown",
  additionalContainers: (string | HTMLElement)[] = ["modal-root"] // allow dynamic portal roots
) => {
  useEffect(() => {
    const outsideClickHandler = (event: Event) => {
      const target = event.target as Node | null;
      if (!target || !target.isConnected) return;

      // Check dropdown refs
      const isOutsideDropdown = Array.isArray(Ref)
        ? Ref.every((r) => r.current && !r.current.contains(target))
        : Ref.current && !Ref.current.contains(target);

      // Check if clicked inside any allowed "portal roots" like modals
      const clickedInsidePortal = additionalContainers.some((container) => {
        const el =
          typeof container === "string"
            ? document.getElementById(container)
            : container;
        return el?.contains(target);
      });

      if (isOutsideDropdown && !clickedInsidePortal) {
        handler(event);
      }
    };

    window.addEventListener(eventType, outsideClickHandler);
    return () => {
      window.removeEventListener(eventType, outsideClickHandler);
    };
  }, [Ref, handler, eventType, additionalContainers]);
};

export default useOutsideClick2;
