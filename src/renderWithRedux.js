import React from "react";
import { configureStore } from "@reduxjs/toolkit";
import { render } from "@testing-library/react";
import { rootReducer } from "redux/rootReducer";
import { Provider } from "react-redux";

export const renderWithRedux = (component, preloadedState) => {
  const store = configureStore({
    reducer: rootReducer,
    devTools: false,
    preloadedState
  });

  return render(<Provider store={store}>{component}</Provider>);
};
