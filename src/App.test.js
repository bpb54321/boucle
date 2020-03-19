import React from "react";
import App from "./App";
import { renderWithRedux } from "renderWithRedux";
import userEvent from "@testing-library/user-event";
import { getByTestId } from "@testing-library/dom";

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

  test(
    "should change the start time input value to the previous clip end " +
      "time input value when the user clicks Add Clip when at least one other clip exists",
    () => {
      // Arrange
      const { getByTestId } = renderWithRedux(<App />);

      // Act
      userEvent.click(getByTestId("new-clip-button"));
      const firstClipEndTime = getByTestId("loop-end-time").value;

      userEvent.click(getByTestId("new-clip-button"));

      // Assert
      expect(getByTestId("loop-start-time")).toHaveValue(
        parseInt(firstClipEndTime)
      );
    }
  );
});
