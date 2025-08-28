import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: "",
};

export const questionSevenSlice = createSlice({
  name: "questionSeven",
  initialState,
  reducers: {
    addDecide: (state, action) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addDecide } = questionSevenSlice.actions;

export default questionSevenSlice.reducer;
