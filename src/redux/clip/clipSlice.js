import { createSlice } from "@reduxjs/toolkit";

const clipSlice = createSlice({
  name: "clip",
  initialState: {
    startTime: 0,
    endTime: 0,
    transcription: ""
  },
  reducers: {
    clipChanged: (state, action) => {
      return action.payload;
    }
  }
});

export const clipReducer = clipSlice.reducer;

export const { clipChanged } = clipSlice.actions;
