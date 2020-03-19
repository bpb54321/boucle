import { createSlice } from "@reduxjs/toolkit";

const clipsSlice = createSlice({
  name: "clips",
  initialState: [],
  reducers: {
    clipAdded: (state, action) => {
      state.push(action.payload);
    }
  }
});

export const clipsReducer = clipsSlice.reducer;

export const { clipAdded } = clipsSlice.actions;
