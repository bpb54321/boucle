import { createAction } from "@reduxjs/toolkit";

export const clipAdded = createAction("clips/clipAdded");
export const currentClipIndexChanged = createAction("clips/currentClipIndexChanged");