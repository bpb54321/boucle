import { ClipEditForm } from "components/ClipEditForm/ClipEditForm";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { fakeClipBuilder } from "redux/clip/fakeBuilders";
import userEvent from "@testing-library/user-event";
import { render } from "@testing-library/react";
import { waitFor } from "@testing-library/dom";
import { getClip } from "redux/clip/clipSelectors";
import { clipChanged } from "redux/clip/clipSlice";

const dispatch = jest.fn();
jest.mock("react-redux", () => {
  return {
    __esModule: true,
    useSelector: jest.fn(),
    useDispatch: jest.fn()
  };
});

jest.mock("redux/clip/clipSelectors", () => {
  return {
    __esModule: true,
    getClip: jest.fn()
  };
});

jest.mock("redux/clip/clipSlice", () => {
  return {
    __esModule: true,
    clipChanged: jest.fn()
  };
});

let clip;
const clipChangedReturnValue = Symbol("clip changed return value");

describe("ClipEditForm", () => {
  beforeEach(() => {
    jest.resetAllMocks();
    clip = fakeClipBuilder();
    getClip.mockReturnValue(clip);
    useSelector.mockImplementation(selector => selector());
    useDispatch.mockReturnValue(dispatch);
    clipChanged.mockReturnValue(clipChangedReturnValue);
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

  test("should dispatch changed clip start time when user changes start time", async () => {
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

  test("should dispatch changed clip transcription when user changes transcription", async () => {
    // Act
    const { getByTestId } = render(<ClipEditForm />);

    const transcriptionInput = getByTestId("transcription-input");

    const newTranscription = clip.transcription + " blah";

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

  test("should update local input values for start Time and end time even if user enters empty string", async () => {
    // Act
    const { getByTestId } = render(<ClipEditForm />);

    const startTimeInput = getByTestId("loop-start-time");
    const endTimeInput = getByTestId("loop-end-time");

    await userEvent.type(startTimeInput, "", {
      allAtOnce: true
    });
    await userEvent.type(endTimeInput, "", {
      allAtOnce: true
    });

    // Assert
    expect(startTimeInput).toHaveValue(null);
    expect(endTimeInput).toHaveValue(null);
  });
});
