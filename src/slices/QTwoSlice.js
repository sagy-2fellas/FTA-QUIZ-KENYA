import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: "",
};

export const questionTwoSlice = createSlice({
  name: "questionTwo",
  initialState,
  reducers: {
    addFamiliar: (state, action) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addFamiliar } = questionTwoSlice.actions;

export default questionTwoSlice.reducer;
