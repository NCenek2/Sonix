import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
  name: "count",
  initialState: {
    count: 0,
  },
  reducers: {
    increment: (state, action) => {
      state.count++;
    },
    decrement: (state, action) => {
      state.count--;
    },
    reset: (state, action) => {
      state.count = 0;
    },
  },
});

export const { increment, reset, decrement } = counterSlice.actions;

export default counterSlice.reducer;
