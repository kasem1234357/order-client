import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "../intialStates/user/index";
import { notification_Actions_Layout } from "../actions/notifications";
import { system_layout_actions } from "../actions/systemEvent";
import { controls_layout_actions } from "../actions/controls";
export type UserSliceType = {
  user: {
    timeFormat: any;
    status: string;
    clubs: {}[];
    selectedClub: number;
    id: string;
    notification: boolean;
    darkMode: boolean;
    auth: boolean;
    loading: boolean;
    error: null;
  };
  lang: string;
  currentPremission: any;
  timeFormat: number;
  stage: string;
  dictionary: any;
  status: string;
  clubs: {}[];
  selectedClub: number;
  id: string;
  notification: boolean;
  darkMode: boolean;
  auth: boolean;
  loading: boolean;
  error: null;
};
export const userSlice = createSlice({
  name: "user",
  initialState,
  //@ts-ignore
  reducers: {
    ...notification_Actions_Layout,
    ...controls_layout_actions,
    ...system_layout_actions,
  },
});
export const getStatus = (state: UserSliceType) => state.user.status;
export const {
  selectClub,
  setUser,
  setStage,
  setStatus,
  setClubs,
  setDictonary,
  addClub,
  setTimeFormat,
  setLang,
  changePremission,
  setPremission
  // setId,
  // setNotification,
  // setDarkMode,
  // setAuth,
  // setLoading,
  // setError
} = userSlice.actions;
export default userSlice.reducer;
