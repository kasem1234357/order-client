import { createSlice } from "@reduxjs/toolkit";
import { controlState } from "../intialStates/shared";
import { controls_booking_actions, controls_layout_actions } from "../actions/controls";

const controlSlice = createSlice({
  name: "control",
  initialState: {
     ...controlState
  },
  reducers: {
    ...controls_layout_actions,
  }
})
export const {openShareModel,setInviteLink,closeShareModel,updatePathQueue,closeSideBar,openSideBar } = controlSlice.actions
export default controlSlice.reducer