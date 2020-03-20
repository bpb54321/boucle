import { createSlice } from "@reduxjs/toolkit";

const clipsSlice = createSlice({
  name: "clips",
  initialState: {
    clipIds: []
  },
  reducers: {
    clipAdded: (state, action) => {
      state.push(action.payload);
    },
    clipIdsFetched: (state, action) => {
      state.clipIds = action.payload;
    }
  }
});

export const clipsReducer = clipsSlice.reducer;

export const { clipAdded, clipIdsFetched } = clipsSlice.actions;
