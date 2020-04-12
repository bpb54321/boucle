import { combineReducers } from "redux";
import { clipsReducer } from "redux/clips/clipsSlice";
import { clipReducer } from "redux/clip/clipSlice";

export const rootReducer = combineReducers({
  clipsSlice: clipsReducer,
  clipSlice: clipReducer
});
