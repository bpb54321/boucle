import React from "react";
import App from "./App";
import { renderWithRedux } from "renderWithRedux";
import userEvent from "@testing-library/user-event";

describe("App", () => {
  test("should not display a clip edit form by default", async () => {
    // Act
    const { queryByTestId } = renderWithRedux(<App />);

    // Assert
    expect(queryByTestId("clip-edit-form")).not.toBeInTheDocument();
  });

  test("should display an edit form for a new clip when user clicks the New Clip button ", async () => {
    // Act
    const { getByTestId } = renderWithRedux(<App />);
    userEvent.click(getByTestId("new-clip-button"));
    // Assert
    expect(getByTestId("clip-edit-form")).toBeInTheDocument();
  });
});
