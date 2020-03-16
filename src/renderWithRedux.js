import React from "react";
import { configureStore } from "@reduxjs/toolkit";
import { render } from "@testing-library/react";
import thunk from "redux-thunk";
import { rootReducer } from "redux/rootReducer";
import { Provider } from "react-redux";

export const renderWithRedux = component => {
  const store = configureStore({
    reducer: rootReducer,
    middleware: [thunk]
  });

  return {
    ...render(<Provider store={store}>{component}</Provider>),
    store
  };
};
