import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { Api } from "./services/Api";
import userReducer from "./slices/userSlice";
import leagueReducer from "./slices/leagueSlice";
import cartReducer from "./slices/cartSlice";
import formReducer from "./slices/formSlice";
import bookingReducer from "./slices/bookingSlices";
import controlReducer from './slices/controlSlice'
import { authMiddleware } from "../../utils/AuthMiddleware";

export const store = configureStore({
  reducer: {
    [Api.reducerPath]: Api.reducer,
    user: userReducer,
    booking: bookingReducer,
    cart: cartReducer,
    league: leagueReducer,
    form: formReducer,
    control: controlReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(Api.middleware).concat(authMiddleware),
});
//export type AppStore = ReturnType<unknown>;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

setupListeners(store.dispatch);
