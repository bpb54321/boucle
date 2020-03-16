import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { rootReducer } from "redux/rootReducer";

export const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk],
  devTools: true
});
