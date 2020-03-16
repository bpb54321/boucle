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
      for (let [key, newValue] of Object.entries(action.payload)) {
        state[key] = newValue;
      }
    }
  }
});

export const clipReducer = clipSlice.reducer;

export const { clipChanged } = clipSlice.actions;
