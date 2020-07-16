import { createAction } from "@reduxjs/toolkit";

export const clipAdded = createAction("clips/clipAdded");
export const currentClipIndexIncremented = createAction("clips/currentClipIndexIncremented");
export const currentClipIndexDecremented = createAction("clips/currentClipIndexDecremented");