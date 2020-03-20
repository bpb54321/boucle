import React from "react";
import App from "App.js";
import { renderWithRedux } from "renderWithRedux";
import userEvent from "@testing-library/user-event";
import { waitFor, wait } from "@testing-library/dom";
import { render } from "@testing-library/react";
import { fakeClipIdsBuilder, fakeClipBuilder } from "redux/clip/fakeBuilders";
import clipService from "redux/clip/clipService";

jest.mock("redux/clip/clipService");

describe("App", () => {
  test("should not display a clip edit form by default", async () => {
    // Act
    const { queryByTestId } = renderWithRedux(<App />);

    // Assert
    expect(queryByTestId("clip-edit-form")).not.toBeInTheDocument();
  });

  test("should display the first clip of the media document when the app is loaded if there is at least one clip", async () => {
    // Arrange
    const numberClipIds = 1;
    const clipIds = fakeClipIdsBuilder(numberClipIds);
    const clip = fakeClipBuilder({
      overrides: {
        id: clipIds[0]
      }
    });

    clipService.getClipIds.mockResolvedValue(clipIds);
    clipService.getClipById.mockResolvedValue(clip);

    // Act
    const { findByTestId } = renderWithRedux(<App />);
    const clipStartTimeInput = await findByTestId("loop-start-time");
    const clipEndTimeInput = await findByTestId("loop-end-time");
    const clipTranscriptionInput = await findByTestId("transcription-input");

    // Assert
    await waitFor(() =>
      expect(clipStartTimeInput).toHaveValue(clip.startValue)
    );
    expect(clipEndTimeInput).toHaveValue(clip.endValue);
    expect(clipTranscriptionInput).toHaveValue(clip.transcription);
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
