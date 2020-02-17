import "./HTMLMediaElementMock";
import React from "react";
import { render, wait } from "@testing-library/react";
import App from "./App";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";

describe("App", () => {
  let mediaDuration;
  let mediaDefaultStartTime;
  let mockTimeIncrement;

  beforeEach(() => {
    jest.useFakeTimers();
    jest.clearAllMocks();
    jest.clearAllTimers();

    mediaDuration = 60;
    window.HTMLMediaElement.prototype.duration = mediaDuration;

    mediaDefaultStartTime = 0;
    window.HTMLMediaElement.prototype.currentTime = mediaDefaultStartTime;

    // HTMLMediaElement will dispatch timeupdate with this time frequency
    mockTimeIncrement = 0.5;
    window.HTMLMediaElement.prototype.mockTimeIncrement = mockTimeIncrement; // seconds

    // HTMLMediaElement play and pause functions are mocked
  });

  test("plays an infinite number of loops when user presses start, with pause in between", async () => {
    // Arrange
    const randomStartTime = Math.floor(Math.random() * (mediaDuration / 2));
    const loopDuration = 2;
    const pauseTimeBetweenLoops = 1;
    const startTimeInputValue = randomStartTime;
    const endTimeInputValue = startTimeInputValue + loopDuration;

    // Used for calculated how many timers to run to simulate the player loop period
    const numTimerStepsInLoop = loopDuration / mockTimeIncrement;

    // Act
    const { findByTestId, findByLabelText, findByText } = render(
      <App pauseTimeBetweenLoops={pauseTimeBetweenLoops} />
    );

    const audioPlayer = await findByTestId("audio-player");
    const loopStartTimeElement = await findByLabelText(/loop start time/i);
    const loopEndTimeElement = await findByLabelText(/loop end time/i);
    const startLoopButton = await findByText(/start loop/i);

    // Assert
    expect(audioPlayer.currentTime).toBeCloseTo(mediaDefaultStartTime, 0);

    // Act
    await userEvent.type(loopStartTimeElement, String(startTimeInputValue));
    await userEvent.type(loopEndTimeElement, String(endTimeInputValue));
    await userEvent.click(startLoopButton);

    // Assert
    expect(audioPlayer.currentTime).toBeCloseTo(startTimeInputValue, 0);
    expect(audioPlayer.play).toHaveBeenCalledTimes(1);

    // Act
    for (let timerStep = 0; timerStep < numTimerStepsInLoop; timerStep++) {
      jest.runOnlyPendingTimers();
    }

    // Assert
    expect(audioPlayer.currentTime).toBeCloseTo(endTimeInputValue, 0);
    expect(audioPlayer.pause).toHaveBeenCalledTimes(1);

    // Act
    // Run the timer that is run at the end of the pause
    act(() => {
      jest.runOnlyPendingTimers();
    });

    expect(audioPlayer.currentTime).toBeCloseTo(startTimeInputValue, 0);
    expect(audioPlayer.play).toHaveBeenCalledTimes(2);

    // Act
    for (let timerStep = 0; timerStep < numTimerStepsInLoop; timerStep++) {
      jest.runOnlyPendingTimers();
    }

    // Assert
    expect(audioPlayer.currentTime).toBeCloseTo(endTimeInputValue, 0);
    expect(audioPlayer.pause).toHaveBeenCalledTimes(2);

    // Etc
  });

  test("stops the loop when the user presses stop", async () => {
    // Arrange
    const randomStartTime = Math.floor(Math.random() * (mediaDuration / 2));
    const loopDuration = 2;
    const pauseTimeBetweenLoops = 1;
    const startTimeInputValue = randomStartTime;
    const endTimeInputValue = startTimeInputValue + loopDuration;

    // Used for calculated how many timers to run to simulate the player loop period
    const numTimerStepsInLoop = loopDuration / mockTimeIncrement;

    // Act
    const { findByTestId, findByLabelText, findByText } = render(
      <App pauseTimeBetweenLoops={pauseTimeBetweenLoops} />
    );

    const audioPlayer = await findByTestId("audio-player");
    const loopStartTimeElement = await findByLabelText(/loop start time/i);
    const loopEndTimeElement = await findByLabelText(/loop end time/i);
    const startLoopButton = await findByText(/start loop/i);
    const stopLoopButton = await findByText(/stop loop/i);

    // Assert
    expect(audioPlayer.currentTime).toBeCloseTo(mediaDefaultStartTime, 0);

    // Act
    await userEvent.type(loopStartTimeElement, String(startTimeInputValue));
    await userEvent.type(loopEndTimeElement, String(endTimeInputValue));
    await userEvent.click(startLoopButton);

    // Assert
    expect(audioPlayer.currentTime).toBeCloseTo(startTimeInputValue, 0);
    expect(audioPlayer.play).toHaveBeenCalledTimes(1);

    // Act
    for (let timerStep = 0; timerStep < numTimerStepsInLoop; timerStep++) {
      jest.runOnlyPendingTimers();
    }

    // Assert
    expect(audioPlayer.currentTime).toBeCloseTo(endTimeInputValue, 0);
    expect(audioPlayer.pause).toHaveBeenCalledTimes(1);

    // Act

    // Press stop button during the pause
    await act(async () => {
      await userEvent.click(stopLoopButton);
    });

    // Execute the callback that is called at the end of the pause
    act(() => {
      jest.runOnlyPendingTimers();
    });

    // Players should still be at the last time, which is the end of the loop
    expect(audioPlayer.currentTime).toBeCloseTo(endTimeInputValue, 0);

    // Expect that play spy has not been called again
    expect(audioPlayer.play).toHaveBeenCalledTimes(1);

    // Act
    // Run pending timers again for good measure - there shouldn't be any callbacks to execute
    for (let timerStep = 0; timerStep < numTimerStepsInLoop; timerStep++) {
      jest.runOnlyPendingTimers();
    }

    // Assert
    expect(audioPlayer.currentTime).toBeCloseTo(endTimeInputValue, 0);
    expect(audioPlayer.pause).toHaveBeenCalledTimes(2);
    expect(audioPlayer.play).toHaveBeenCalledTimes(1);
  });
});
