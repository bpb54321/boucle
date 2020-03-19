import { combineReducers } from "redux";
import { clipReducer } from "redux/clip/clipSlice";
import { clipsReducer } from "redux/clips/clipsSlice";

export const rootReducer = combineReducers({
  clip: clipReducer,
  clips: clipsReducer
});
