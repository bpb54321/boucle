import { combineReducers } from "redux";
import { clipsReducer } from "redux/clips/clipsSlice";

export const rootReducer = combineReducers({
  clipsSlice: clipsReducer
});
