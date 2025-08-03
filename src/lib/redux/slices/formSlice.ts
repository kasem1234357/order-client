import { createSlice } from "@reduxjs/toolkit";
type formSliceType = {
  isDirty: boolean;
};
const formSlice = createSlice({
  name: "form",
  initialState: {
    isDirty: false,
  },
  reducers: {
    setFormIsDirty: (state: formSliceType, action: { payload: boolean }) => {
      state.isDirty = action.payload;
    },
  },
});

export const { setFormIsDirty } = formSlice.actions;

export default formSlice.reducer;
