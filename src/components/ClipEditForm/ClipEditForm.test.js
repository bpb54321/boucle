import React from "react";
import { ClipEditForm } from "components/ClipEditForm/ClipEditForm";
import { fakeClipBuilder } from "redux/clip/fakeBuilders";
import userEvent from "@testing-library/user-event";
import { render } from "@testing-library/react";
import { waitFor } from "@testing-library/dom";

describe("ClipEditForm", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test("should display clip properties of the clip passed to it", async () => {
    // Arrange
    const clip = fakeClipBuilder();

    // Act
    const { getByTestId } = render(<ClipEditForm clip={clip} />);
    const transcriptionInput = getByTestId("transcription-input");
    const startTimeInput = getByTestId("loop-start-time");
    const endTimeInput = getByTestId("loop-end-time");

    // Assert
    expect(transcriptionInput).toHaveValue(clip.transcription);
    expect(startTimeInput).toHaveValue(clip.startTime);
    expect(endTimeInput).toHaveValue(clip.endTime);
  });

  test("should update display of startTime, endTime, and transcription when the user updates these values", async () => {
    // Act
    const oldClip = fakeClipBuilder();
    const renderResult = render(<ClipEditForm clip={oldClip} />);
    const { getByTestId } = renderResult;

    const startTimeInput = getByTestId("loop-start-time");
    const endTimeInput = getByTestId("loop-end-time");
    const transcriptionInput = getByTestId("transcription-input");

    const newClip = fakeClipBuilder();

    await userEvent.type(startTimeInput, newClip.startTime, {
      allAtOnce: true
    });
    await userEvent.type(endTimeInput, newClip.endTime, {
      allAtOnce: true
    });
    await userEvent.type(transcriptionInput, newClip.transcription, {
      allAtOnce: true
    });

    // Assert
    await waitFor(() => expect(startTimeInput).toHaveValue(newClip.startTime));
    await waitFor(() => expect(endTimeInput).toHaveValue(newClip.endTime));
    await waitFor(() =>
      expect(transcriptionInput).toHaveValue(newClip.transcription)
    );
  });

  // test("should dispatch changed clip start time when user changes start time", async () => {
  //   // Act
  //   const { getByTestId } = render(<ClipEditForm />);
  //
  //   const startTimeInput = getByTestId("loop-start-time");
  //
  //   const newStartTime = clip.startTime + 1;
  //
  //   // Act
  //   await userEvent.type(startTimeInput, newStartTime, {
  //     allAtOnce: true
  //   });
  //
  //   // Assert
  //   expect(clipChanged).toHaveBeenCalledWith({
  //     ...clip,
  //     startTime: newStartTime
  //   });
  //   expect(dispatch).toHaveBeenCalledWith(clipChangedReturnValue);
  // });
  //
  // test("should dispatch changed clip end time when user changes end time", async () => {
  //   // Act
  //   const { getByTestId } = render(<ClipEditForm />);
  //
  //   const endTimeInput = getByTestId("loop-end-time");
  //
  //   const newEndTime = clip.endTime + 1;
  //
  //   // Act
  //   await userEvent.type(endTimeInput, newEndTime, {
  //     allAtOnce: true
  //   });
  //
  //   // Assert
  //   expect(clipChanged).toHaveBeenCalledWith({
  //     ...clip,
  //     endTime: newEndTime
  //   });
  //   expect(dispatch).toHaveBeenCalledWith(clipChangedReturnValue);
  // });
  //
  // test("should dispatch changed clip transcription when user changes transcription", async () => {
  //   // Act
  //   const { getByTestId } = render(<ClipEditForm />);
  //
  //   const transcriptionInput = getByTestId("transcription-input");
  //
  //   const newTranscription = clip.transcription + " blah";
  //
  //   // Act
  //   await userEvent.type(transcriptionInput, newTranscription, {
  //     allAtOnce: true
  //   });
  //
  //   // Assert
  //   expect(clipChanged).toHaveBeenCalledWith({
  //     ...clip,
  //     transcription: newTranscription
  //   });
  //   expect(dispatch).toHaveBeenCalledWith(clipChangedReturnValue);
  // });
});
