import { createSlice } from "@reduxjs/toolkit";

const clipsSlice = createSlice({
  name: "clips",
  initialState: {
    clipIds: []
  },
  reducers: {
    clipIdAdded: (state, action) => {
      state.clipIds.push(action.payload);
    },
    clipIdsFetched: (state, action) => {
      state.clipIds = action.payload;
    }
  }
});

export const clipsReducer = clipsSlice.reducer;

export const { clipIdAdded, clipIdsFetched } = clipsSlice.actions;
