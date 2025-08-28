import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  shoppingList: [],
};

export const questionSixSlice = createSlice({
  name: "questionSix",
  initialState,
  reducers: {
    goShopping: (state, action) => {
      state.shoppingList = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { goShopping } = questionSixSlice.actions;

export default questionSixSlice.reducer;
