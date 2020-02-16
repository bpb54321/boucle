import React from "react";
import { render, wait } from "@testing-library/react";
import App from "./App";
import userEvent from "@testing-library/user-event";
import "./HTMLMediaElementMock";
import { act } from "react-dom/test-utils";

describe("App", () => {
  let mediaDuration;
  let playSpy;
  let pauseSpy;
  let mediaDefaultStartTime;
  let mockTimeIncrement;

  beforeEach(() => {
    jest.useFakeTimers();
    // console.log(`after useFakeTimers`);
    // console.log(jest.getTimerCount());
    jest.resetAllMocks();
    // console.log(`after reset all mocks`);
    // console.log(jest.getTimerCount());

    jest.clearAllTimers();
    // console.log(`after clear all timers`);
    // console.log(jest.getTimerCount());

    mediaDuration = 60;
    window.HTMLMediaElement.prototype.duration = mediaDuration;

    mediaDefaultStartTime = 0;
    window.HTMLMediaElement.prototype.currentTime = mediaDefaultStartTime;

    // HTMLMediaElement will dispatch timeupdate with this time frequency
    mockTimeIncrement = 0.5;
    window.HTMLMediaElement.prototype.mockTimeIncrement = mockTimeIncrement; // seconds

    playSpy = jest
      .spyOn(window.HTMLMediaElement.prototype, "play")
      .mockName("play");
    pauseSpy = jest
      .spyOn(window.HTMLMediaElement.prototype, "pause")
      .mockName("pause");
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
    expect(playSpy).toHaveBeenCalledTimes(1);

    // Act
    for (let timerStep = 0; timerStep < numTimerStepsInLoop; timerStep++) {
      jest.runOnlyPendingTimers();
    }

    // Assert
    expect(audioPlayer.currentTime).toBeCloseTo(endTimeInputValue, 0);
    expect(pauseSpy).toHaveBeenCalledTimes(1);

    // Act
    // Run the timer that is run at the end of the pause
    jest.runOnlyPendingTimers();

    expect(audioPlayer.currentTime).toBeCloseTo(startTimeInputValue, 0);
    expect(playSpy).toHaveBeenCalledTimes(2);

    // Act
    for (let timerStep = 0; timerStep < numTimerStepsInLoop; timerStep++) {
      jest.runOnlyPendingTimers();
    }

    // Assert
    expect(audioPlayer.currentTime).toBeCloseTo(endTimeInputValue, 0);
    expect(pauseSpy).toHaveBeenCalledTimes(2);

    // Etc
  });

  test.only("stops the loop when the user presses stop", async () => {
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
    expect(playSpy).toHaveBeenCalledTimes(1);

    // Act
    for (let timerStep = 0; timerStep < numTimerStepsInLoop; timerStep++) {
      console.log(`timerStep ${timerStep}`);
      jest.runOnlyPendingTimers();
    }

    // Assert
    expect(audioPlayer.currentTime).toBeCloseTo(endTimeInputValue, 0);
    expect(pauseSpy).toHaveBeenCalledTimes(1);

    // Act

    // Press stop button during the pause
    await act(async () => {
      await userEvent.click(stopLoopButton);
    });

    // Wait for isStopped state to update
    // await wait();

    // Execute the callback that is called at the end of the pause
    jest.runOnlyPendingTimers();

    // Players should still be at the last time, which is the end of the loop
    expect(audioPlayer.currentTime).toBeCloseTo(endTimeInputValue, 0);

    // Expect that play spy has not been called again
    expect(playSpy).toHaveBeenCalledTimes(1);

    // Act
    // Run pending timers again for good measure - there shouldn't be any callbacks to execute
    for (let timerStep = 0; timerStep < numTimerStepsInLoop; timerStep++) {
      jest.runOnlyPendingTimers();
    }

    // Assert
    expect(audioPlayer.currentTime).toBeCloseTo(endTimeInputValue, 0);
    expect(pauseSpy).toHaveBeenCalledTimes(2);
    expect(playSpy).toHaveBeenCalledTimes(1);
  });
});
