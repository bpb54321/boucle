import { combineReducers } from "redux";
import { clipsReducer } from "redux/clips/clipsSlice";
import { clipReducer } from "redux/clip/clipSlice";
import clips from "redux/clips/clips";
import currentClipIndex from "./clips/currentClipIndex";

export const rootReducer = combineReducers({
  clipsSlice: clipsReducer,
  clipSlice: clipReducer,
  clips,
  currentClipIndex
});
