import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: "",
};

export const questionOneSlice = createSlice({
  name: "questionOne",
  initialState,
  reducers: {
    addProvince: (state, action) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addProvince } = questionOneSlice.actions;

export default questionOneSlice.reducer;
