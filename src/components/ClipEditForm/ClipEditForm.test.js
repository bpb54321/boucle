import React from "react";
import { ClipEditForm } from "components/ClipEditForm/ClipEditForm";
import { clipChanged } from "redux/clip/clipSlice";
import { fakeClipBuilder } from "redux/clip/fakeBuilders";
import userEvent from "@testing-library/user-event";
import { render } from "@testing-library/react";
import { useSelector, useDispatch } from "react-redux";
import { getClip } from "redux/selectors";

jest.mock("react-redux");
jest.mock("redux/selectors");
jest.mock("redux/clip/clipSlice");

let dispatch = jest.fn();
let clipChangedReturnValue = Symbol("clip changed return value");
let clip;

describe("ClipEditForm", () => {
  beforeEach(() => {
    jest.resetAllMocks();
    useDispatch.mockReturnValue(dispatch);
    useSelector.mockImplementation(selector => selector());
    clip = fakeClipBuilder();
    getClip.mockName("getClip").mockReturnValue(clip);
    clipChanged.mockName("clipChanged").mockReturnValue(clipChangedReturnValue);
  });

  test("should display clip properties of the clip passed to it", async () => {
    // Act
    const { getByTestId } = render(<ClipEditForm />);
    const transcriptionInput = getByTestId("transcription-input");
    const startTimeInput = getByTestId("loop-start-time");
    const endTimeInput = getByTestId("loop-end-time");

    // Assert
    expect(transcriptionInput).toHaveValue(clip.transcription);
    expect(startTimeInput).toHaveValue(clip.startTime);
    expect(endTimeInput).toHaveValue(clip.endTime);
  });

  describe("When user enters an empty string in start time input", () => {
    let startTimeInput;
    let getByTestId;
    let queryByTestId;

    beforeEach(async () => {
      // Arrange
      const oldClip = fakeClipBuilder();
      getClip.mockReturnValue(oldClip);

      // Act
      const renderResult = render(<ClipEditForm />);
      ({ getByTestId, queryByTestId } = renderResult);

      startTimeInput = getByTestId("loop-start-time");
      const startTimeInvalidInputMessage = queryByTestId(
        "start-time-invalid-input"
      );

      // Assert
      expect(startTimeInvalidInputMessage).not.toBeInTheDocument();

      // Act
      await userEvent.type(startTimeInput, "", {
        allAtOnce: true
      });
    });

    test("input should display users invalid input", async () => {
      // Assert
      expect(startTimeInput).toHaveValue(null);
    });
    test("no actions should be dispatched", async () => {
      // Assert
      expect(dispatch).not.toHaveBeenCalled();
    });
    test("error message should be displayed", async () => {
      const startTimeInvalidInputMessage = getByTestId(
        "start-time-invalid-input"
      );
      expect(startTimeInvalidInputMessage).toBeInTheDocument();
    });
  });

  test("should dispatch changed clip start time when user changes start time", async () => {
    // Arrange
    const clip = fakeClipBuilder();
    getClip.mockReturnValue(clip);

    // Act
    const { getByTestId } = render(<ClipEditForm />);

    const startTimeInput = getByTestId("loop-start-time");

    const newStartTime = clip.startTime + 1;

    // Act
    await userEvent.type(startTimeInput, newStartTime, {
      allAtOnce: true
    });

    // Assert
    expect(clipChanged).toHaveBeenCalledWith({
      ...clip,
      startTime: newStartTime
    });
    expect(dispatch).toHaveBeenCalledWith(clipChangedReturnValue);
  });

  test("should dispatch changed clip end time when user changes end time", async () => {
    // Arrange
    const clip = fakeClipBuilder();
    getClip.mockReturnValue(clip);

    // Act
    const { getByTestId } = render(<ClipEditForm />);

    const endTimeInput = getByTestId("loop-end-time");

    const newEndTime = clip.endTime + 1;

    // Act
    await userEvent.type(endTimeInput, newEndTime, {
      allAtOnce: true
    });

    // Assert
    expect(clipChanged).toHaveBeenCalledWith({
      ...clip,
      endTime: newEndTime
    });
    expect(dispatch).toHaveBeenCalledWith(clipChangedReturnValue);
  });

  test("should dispatch changed clip transcription when user changes clip transcription", async () => {
    // Arrange
    const clip = fakeClipBuilder();
    getClip.mockReturnValue(clip);

    // Act
    const { getByTestId } = render(<ClipEditForm />);

    const transcriptionInput = getByTestId("transcription-input");

    const newTranscription = clip.transcription + "!";

    // Act
    await userEvent.type(transcriptionInput, newTranscription, {
      allAtOnce: true
    });

    // Assert
    expect(clipChanged).toHaveBeenCalledWith({
      ...clip,
      transcription: newTranscription
    });
    expect(dispatch).toHaveBeenCalledWith(clipChangedReturnValue);
  });
});
