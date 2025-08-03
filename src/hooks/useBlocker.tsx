import { useEffect } from "react";

const useBlocker = (disabled?:boolean) => {
    useEffect(() => {
        let isModified = false;
          
          
        const handleBackButton = (event: PopStateEvent) => {
            
            
          if (!isModified && !disabled ) {
            
            // First back button press
            const confirmLeave = window.confirm("Are you sure you want to go back?");
            
            if (!confirmLeave) {
              // Prevent navigation by adding a new history entry
              isModified = true;
              window.history.pushState(null, "", window.location.href);
            } else {
              // Allow navigation by going back one more step
              window.history.go(-1);
            }
          } else {
            // Reset flag for subsequent navigation
            isModified = false;
          }
        };
    
        const handleBeforeUnload = (event: BeforeUnloadEvent) => {
          if (true && !disabled) { // Add your condition here
            event.preventDefault();
            event.returnValue = "Are you sure you want to leave without saving?";
          }
        };
    
        // Add initial history entry
        window.history.pushState(null, "", window.location.href);
    
        // Add event listeners
        window.addEventListener("popstate", handleBackButton);
        window.addEventListener("beforeunload", handleBeforeUnload);
    
        return () => {
          // Cleanup
          window.removeEventListener("popstate", handleBackButton);
          window.removeEventListener("beforeunload", handleBeforeUnload);
          
          // Reset history on unmount
          if (isModified ) {
            window.history.go(-1);
          }
        };
    }, []);
}
export default useBlocker