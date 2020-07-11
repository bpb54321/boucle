import { createAction, createSlice } from "@reduxjs/toolkit";

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
    },
    clipIndexChanged: (state, action) => {
      state.currentClipIndex = action.payload;
    },
    clipUpdated: (state, action) => {
      state.clips[action.payload.clipIndexToUpdate] = action.payload.clip;
    }
  }
});

export const clipsReducer = clipsSlice.reducer;

export const {
  clipsFetched,
  clipIndexChanged,
  clipUpdated
} = clipsSlice.actions;

export const clipAdded = createAction("clip/added");
