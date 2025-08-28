import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: "",
};

export const chocolateConsumerSlice = createSlice({
  name: "chocolateConsumer",
  initialState,
  reducers: {
    addChocolate: (state, action) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addChocolate } = chocolateConsumerSlice.actions;

export default chocolateConsumerSlice.reducer;
