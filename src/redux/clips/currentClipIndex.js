import { createReducer } from "@reduxjs/toolkit";
import {
  currentClipIndexDecremented,
  currentClipIndexIncremented
} from "../actions";

const currentClipIndex = createReducer(0, {
  [currentClipIndexIncremented]: state => {
    return state + 1;
  },
  [currentClipIndexDecremented]: state => {
    return state - 1;
  }
});

export default currentClipIndex;
