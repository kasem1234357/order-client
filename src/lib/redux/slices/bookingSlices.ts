import { createSlice } from "@reduxjs/toolkit";
import { bookingInitialState } from "../intialStates/user";
import { controls_booking_actions } from "../actions/controls";

const bookingSlice = createSlice({
  name: "booking",
  initialState: {
     ...bookingInitialState
  },
  reducers: {
    ...controls_booking_actions,
  }
})
export const { openCalender, setBookingId } = bookingSlice.actions
export default bookingSlice.reducer