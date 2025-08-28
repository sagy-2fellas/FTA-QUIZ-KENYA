import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: "",
};

export const questionEightSlice = createSlice({
  name: "questionEight",
  initialState,
  reducers: {
    addConsumer: (state, action) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addConsumer } = questionEightSlice.actions;

export default questionEightSlice.reducer;
