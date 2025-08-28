import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  shoppingListRefined: [],
};

export const questionSixSliceRefined = createSlice({
  name: "questionSixRefined",
  initialState,
  reducers: {
    goFTShopping: (state, action) => {
      state.shoppingListRefined = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { goFTShopping } = questionSixSliceRefined.actions;

export default questionSixSliceRefined.reducer;
