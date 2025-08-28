import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: "",
};

export const questionThreeSlice = createSlice({
  name: "questionThree",
  initialState,
  reducers: {
    addCoffee: (state, action) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addCoffee } = questionThreeSlice.actions;

export default questionThreeSlice.reducer;
