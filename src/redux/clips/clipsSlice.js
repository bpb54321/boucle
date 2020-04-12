import { createSlice } from "@reduxjs/toolkit";

const clipsSlice = createSlice({
  name: "clipsSlice",
  initialState: {
    clips: [],
    currentClipIndex: 0
  },
  reducers: {
    clipAdded: (state, action) => {
      state.clips.push(action.payload);
      state.currentClipIndex = state.clips.length - 1;
    },
    clipsFetched: (state, action) => {
      state.clips = action.payload;
    }
  }
});

export const clipsReducer = clipsSlice.reducer;

export const { clipAdded, clipsFetched } = clipsSlice.actions;
