import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: "",
};

export const questionFiveSlice = createSlice({
  name: "questionFive",
  initialState,
  reducers: {
    addFlower: (state, action) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addFlower } = questionFiveSlice.actions;

export default questionFiveSlice.reducer;
