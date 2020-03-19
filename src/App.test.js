import React from "react";
import App from "App.js";
import { renderWithRedux } from "renderWithRedux";
import userEvent from "@testing-library/user-event";
import { waitFor } from "@testing-library/dom";

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

  test("should set new clip start and end time defaults when the user clicks Add Clip when at least one other clip exists", async () => {
    // Arrange
    const { getByTestId } = renderWithRedux(<App />);
    const firstClipStartTime = 1;
    const firstClipEndTime = 3;

    // Act
    userEvent.click(getByTestId("new-clip-button"));
    await userEvent.type(
      getByTestId("loop-start-time"),
      firstClipStartTime.toString()
    );
    await userEvent.type(
      getByTestId("loop-end-time"),
      firstClipEndTime.toString()
    );

    userEvent.click(getByTestId("new-clip-button"));

    // Assert
    await waitFor(() => {
      expect(getByTestId("loop-start-time")).toHaveValue(firstClipEndTime);
    });

    const secondClipStartTime = getByTestId("loop-start-time").value;
    const defaultClipDuration = 3;
    const expectedSecondClipEndTime =
      parseInt(secondClipStartTime) + defaultClipDuration;

    expect(getByTestId("loop-end-time")).toHaveValue(expectedSecondClipEndTime);
  });

  test("should set new clip start and end time defaults when the user clicks Add Clip when at least one other clip exists", async () => {
    // Arrange
    const { getByTestId } = renderWithRedux(<App />);
    const firstClipTranscription = "This is the first clip transcription";

    // Act
    userEvent.click(getByTestId("new-clip-button"));

    await userEvent.type(
      getByTestId("transcription-input"),
      firstClipTranscription
    );

    userEvent.click(getByTestId("new-clip-button"));

    // Assert
    await waitFor(() => {
      expect(getByTestId("transcription-input")).toHaveValue("");
    });
  });
});
