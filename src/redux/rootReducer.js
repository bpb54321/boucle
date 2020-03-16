import { combineReducers } from "redux";
import { clipReducer } from "redux/clip/clipSlice";

export const rootReducer = combineReducers({
  clip: clipReducer
});
