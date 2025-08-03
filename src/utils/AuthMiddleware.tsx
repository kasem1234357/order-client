import { Middleware } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";

export const authMiddleware: Middleware =
  (storeAPI) => (next) => (action: any) => {
    if (action.type.endsWith("/rejected")) {
      const error = action.payload;
      // Check if the error status is 401
      if (error?.status === 401) {
        // Redirect to the login page
        localStorage.clear();
        window.location.href = "/login";
      }
    }

    return next(action);
  };
