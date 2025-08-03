import { createSlice,  } from "@reduxjs/toolkit";
import { notification_Actions_Layout } from "../actions/notifications";
import { system_layout_actions } from "../actions/systemEvent";
import { controls_layout_actions } from "../actions/controls";
import { forms_layout_actions } from "../actions/form";

export const leagueSlice = createSlice({
  name: "league",
  initialState:{league:{}},
  //@ts-ignore
  reducers: {
    ...forms_layout_actions,
  },

});
export const {
  addLeagueInfo,
  reset
} = leagueSlice.actions;

export default leagueSlice.reducer;

