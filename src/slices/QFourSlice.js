import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: "",
};

export const questionFourSlice = createSlice({
  name: "questionFour",
  initialState,
  reducers: {
    addTea: (state, action) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addTea } = questionFourSlice.actions;

export default questionFourSlice.reducer;
