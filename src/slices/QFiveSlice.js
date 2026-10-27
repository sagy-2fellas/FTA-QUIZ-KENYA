import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: "",
};

export const questionFiveSlice = createSlice({
  name: "questionFive",
  initialState,
  reducers: {
    addWine: (state, action) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addWine } = questionFiveSlice.actions;

export default questionFiveSlice.reducer;
