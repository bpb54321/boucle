import React from "react";
import App from "App.js";
import { renderWithRedux } from "renderWithRedux";
import userEvent from "@testing-library/user-event";
import { waitFor } from "@testing-library/dom";
import { fakeClipIdsBuilder, fakeClipBuilder } from "redux/clip/fakeBuilders";
import clipService from "redux/clip/clipService";

jest.mock("redux/clip/clipService");

describe("App", () => {
  beforeEach(() => {
    jest.resetAllMocks();
    window.lastAction = "";
  });

  test("should not display a clip edit form if no clips have yet been created for the media document", async () => {
    // Arrange
    const emptyClipIds = [];
    clipService.getClipIds.mockResolvedValue(emptyClipIds);

    // Act
    const { queryByTestId, getByTestId } = renderWithRedux(<App />);

    // Wait for the app to finish rerendering
    await waitFor(() => {
      expect(getByTestId("app")).toHaveAttribute(
        "data-last-action",
        "clip ids fetched"
      );
    });

    // Assert
    const clipStartTimeInput = queryByTestId("loop-start-time");
    expect(clipStartTimeInput).not.toBeInTheDocument();
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
    clipService.getClipById.mockImplementation(id => {
      if (id === clipIds[0]) {
        return Promise.resolve(clip);
      }
    });

    // Act
    const { findByTestId } = renderWithRedux(<App />);
    const clipStartTimeInput = await findByTestId("loop-start-time");
    const clipEndTimeInput = await findByTestId("loop-end-time");
    const clipTranscriptionInput = await findByTestId("transcription-input");

    // Assert
    await waitFor(() => expect(clipStartTimeInput).toHaveValue(clip.startTime));
    expect(clipEndTimeInput).toHaveValue(clip.endTime);
    expect(clipTranscriptionInput).toHaveValue(clip.transcription);
  });

  test("given there are no existing clips, when user clicks the New Clip button, should display an edit form for a new clip", async () => {
    // Arrange
    const emptyClipIds = [];
    clipService.getClipIds.mockResolvedValue(emptyClipIds);

    // Act
    const { getByTestId, queryByTestId } = renderWithRedux(<App />);

    // Assert
    expect(queryByTestId("clip-edit-form")).not.toBeInTheDocument();

    // Act
    userEvent.click(getByTestId("new-clip-button"));

    // Assert
    expect(getByTestId("clip-edit-form")).toBeInTheDocument();
  });

  test("should set new clip start and end time defaults when the user clicks Add Clip when at least one other clip exists", async () => {
    // Arrange
    const emptyClipIds = [];
    clipService.getClipIds.mockResolvedValue(emptyClipIds);

    // Act
    const { getByTestId } = renderWithRedux(<App />);

    await waitFor(() => {
      expect(getByTestId("app")).toHaveAttribute(
        "data-last-action",
        "clip ids fetched"
      );
    });

    userEvent.click(getByTestId("new-clip-button"));

    const startTimeInput = getByTestId("loop-start-time");
    const firstClipStartTime = 2;
    await userEvent.type(startTimeInput, firstClipStartTime.toString());

    const endTimeInput = getByTestId("loop-end-time");
    const firstClipEndTime = 3;
    await userEvent.type(endTimeInput, firstClipEndTime.toString());

    await waitFor(() => {
      expect(getByTestId("loop-end-time")).toHaveValue(firstClipEndTime);
    });

    userEvent.click(getByTestId("new-clip-button"));

    // Assert
    const expectedSecondClipStartTime = firstClipEndTime;
    await waitFor(() => {
      expect(getByTestId("loop-start-time")).toHaveValue(
        expectedSecondClipStartTime
      );
    });

    const defaultClipDuration = 3;
    const expectedSecondClipEndTime =
      expectedSecondClipStartTime + defaultClipDuration;

    expect(getByTestId("loop-end-time")).toHaveValue(expectedSecondClipEndTime);
  });

  test("should set new clip transcription default when the user clicks Add Clip when at least one other clip exists", async () => {
    // Arrange
    const emptyClipIds = [];
    clipService.getClipIds.mockResolvedValue(emptyClipIds);

    // Act
    const { getByTestId } = renderWithRedux(<App />);

    await waitFor(() => {
      expect(getByTestId("app")).toHaveAttribute(
        "data-last-action",
        "clip ids fetched"
      );
    });

    userEvent.click(getByTestId("new-clip-button"));

    const firstClipTranscription = "This is the first clip transcription";
    await userEvent.type(
      getByTestId("transcription-input"),
      firstClipTranscription,
      { allAtOnce: true }
    );

    userEvent.click(getByTestId("new-clip-button"));

    // Assert
    const defaultNewClipTranscription = "";
    await waitFor(() => {
      expect(getByTestId("transcription-input")).toHaveValue(
        defaultNewClipTranscription
      );
    });
  });
});
