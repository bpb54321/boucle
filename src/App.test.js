import React from "react";
import App from "App.js";
import { renderWithRedux } from "renderWithRedux";
import userEvent from "@testing-library/user-event";
import { waitFor } from "@testing-library/dom";
import fakeClipsBuilder from "redux/clips/fakeClipsBuilder";
import clipService from "redux/clip/clipService";
import { DEFAULT_CLIP_DURATION } from "./constants";

jest.mock("redux/clip/clipService");

describe("App", () => {
  beforeEach(() => {
    jest.resetAllMocks();
    window.lastAction = "";
  });

  test("should not display a clip edit form if no clips have yet been created for the media document", async () => {
    // Act
    const { queryByTestId } = renderWithRedux(<App />);

    // Assert
    const clipStartTimeInput = queryByTestId("clip-edit-form");
    expect(clipStartTimeInput).not.toBeInTheDocument();
  });

  test(
    "given there are no existing clips, when user clicks the New Clip button, should display an edit form " +
      "for a new clip",
    async () => {
      // Arrange
      const emptyClipArray = [];
      clipService.getClips.mockResolvedValue(emptyClipArray);

      // Act
      const { getByTestId, queryByTestId } = renderWithRedux(<App />);

      // Assert
      expect(queryByTestId("clip-edit-form")).not.toBeInTheDocument();

      // Act
      userEvent.click(getByTestId("new-clip-button"));

      // Assert
      expect(getByTestId("clip-edit-form")).toBeInTheDocument();
    }
  );

  test("should set new clip start and end time defaults when the user clicks Add Clip given at least one other clip exists", async () => {
    // Arrange
    const numberOfExistingClips = 1;
    const clips = fakeClipsBuilder(numberOfExistingClips);
    const preloadedState = {
      clips
    };

    // Act
    const { getByTestId } = renderWithRedux(<App />, preloadedState);

    const firstClipEndTime = clips[0].endTime;
    await waitFor(() => {
      expect(getByTestId("loop-end-time")).toHaveValue(firstClipEndTime);
    });

    userEvent.click(getByTestId("new-clip-button"));

    // Assert
    const secondClipStartTimeInput = getByTestId("loop-start-time");
    await waitFor(() => {
      expect(secondClipStartTimeInput).toHaveValue(firstClipEndTime);
    });

    const expectedSecondClipEndTime =
      parseInt(secondClipStartTimeInput.value) + DEFAULT_CLIP_DURATION;

    expect(getByTestId("loop-end-time")).toHaveValue(expectedSecondClipEndTime);
  });

  test("should set new clip transcription default when the user clicks Add Clip when at least one other clip exists", async () => {
    // Arrange
    const numberOfExistingClips = 1;
    const clips = fakeClipsBuilder(numberOfExistingClips);
    clipService.getClips.mockResolvedValue(clips);
    const existingClip = clips[0];
    const defaultNewClipTranscription = "";

    // Assert
    expect(existingClip.transcription).not.toBe(defaultNewClipTranscription);

    // Act
    const { getByTestId, findByTestId } = renderWithRedux(<App />);

    // Assert
    const transcriptionInput = await findByTestId("transcription-input");
    expect(transcriptionInput).toHaveValue(existingClip.transcription);

    // Act
    userEvent.click(getByTestId("new-clip-button"));

    // Assert
    await waitFor(() => {
      expect(getByTestId("transcription-input")).toHaveValue(
        defaultNewClipTranscription
      );
    });
  });

  test("when user presses forward button, he should be taken to the next clip", async () => {
    // Arrange
    const numberOfExistingClips = 2;
    const clips = fakeClipsBuilder(numberOfExistingClips);
    clipService.getClips.mockResolvedValue(clips);

    // Act
    const { findByTestId, findByText } = renderWithRedux(<App />);

    const clipStartTimeInput = await findByTestId("loop-start-time");
    const clipEndTimeInput = await findByTestId("loop-end-time");
    const clipTranscriptionInput = await findByTestId("transcription-input");

    await waitFor(() =>
      expect(clipStartTimeInput).toHaveValue(clips[0].startTime)
    );

    const nextButton = await findByText("Next");
    userEvent.click(nextButton);

    // Assert
    await waitFor(() =>
      expect(clipStartTimeInput).toHaveValue(clips[1].startTime)
    );

    expect(clipEndTimeInput).toHaveValue(clips[1].endTime);
    expect(clipTranscriptionInput).toHaveValue(clips[1].transcription);
  });

  test("when user presses back button, he should be taken to the previous clip", async () => {
    // Arrange
    const numberOfExistingClips = 2;
    const clips = fakeClipsBuilder(numberOfExistingClips);
    clipService.getClips.mockResolvedValue(clips);

    // Act
    const { findByTestId, findByText } = renderWithRedux(<App />);

    const clipStartTimeInput = await findByTestId("loop-start-time");
    const clipEndTimeInput = await findByTestId("loop-end-time");
    const clipTranscriptionInput = await findByTestId("transcription-input");

    await waitFor(() =>
      expect(clipStartTimeInput).toHaveValue(clips[0].startTime)
    );

    const nextButton = await findByText("Next");
    userEvent.click(nextButton);

    // Assert
    await waitFor(() =>
      expect(clipStartTimeInput).toHaveValue(clips[1].startTime)
    );
    await waitFor(() => expect(clipEndTimeInput).toHaveValue(clips[1].endTime));
    await waitFor(() => {
      expect(clipTranscriptionInput).toHaveValue(clips[1].transcription);
    });

    const previousButton = await findByText("Previous");
    userEvent.click(previousButton);

    await waitFor(() =>
      expect(clipStartTimeInput).toHaveValue(clips[0].startTime)
    );
    await waitFor(() => {
      expect(clipEndTimeInput).toHaveValue(clips[0].endTime);
    });
    await waitFor(() => {
      expect(clipTranscriptionInput).toHaveValue(clips[0].transcription);
    });
  });

  test("when user edits clip, clip change is persisted in state", async () => {
    // Arrange
    const numberOfExistingClips = 2;
    const clips = fakeClipsBuilder(numberOfExistingClips);
    clipService.getClips.mockResolvedValue(clips);

    // Act
    const { findByTestId, findByText } = renderWithRedux(<App />);

    const clipStartTimeInput = await findByTestId("loop-start-time");
    const clipEndTimeInput = await findByTestId("loop-end-time");
    const clipTranscriptionInput = await findByTestId("transcription-input");

    await waitFor(() =>
      expect(clipStartTimeInput).toHaveValue(clips[0].startTime)
    );

    const newFirstClipStartTime = clips[0].startTime + 1;
    const newFirstClipEndTime = clips[0].endTime + 1;
    const newFirstClipTranscription = clips[0].transcription + "!";

    await userEvent.type(clipStartTimeInput, String(newFirstClipStartTime));
    await userEvent.type(clipEndTimeInput, String(newFirstClipEndTime));
    await userEvent.type(clipTranscriptionInput, newFirstClipTranscription);

    const nextButton = await findByText("Next");
    userEvent.click(nextButton);

    const previousButton = await findByText("Previous");
    userEvent.click(previousButton);

    // Assert
    await waitFor(() => {
      expect(clipStartTimeInput).toHaveValue(newFirstClipStartTime);
    });
    await waitFor(() =>
      expect(clipEndTimeInput).toHaveValue(newFirstClipEndTime)
    );
    await waitFor(() => {
      expect(clipTranscriptionInput).toHaveValue(newFirstClipTranscription);
    });
  });
});
