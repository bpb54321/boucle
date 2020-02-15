import React from "react";
import { render } from "@testing-library/react";
import App from "./App";
import userEvent from "@testing-library/user-event";
import "./HTMLMediaElementMock";

describe("App", () => {
  let mediaDuration;
  let playSpy;
  let pauseSpy;
  let mediaDefaultStartTime;

  beforeEach(() => {
    jest.useFakeTimers();
    jest.resetAllMocks();

    mediaDuration = 10;
    window.HTMLMediaElement.prototype.duration = mediaDuration;

    mediaDefaultStartTime = 0;
    window.HTMLMediaElement.prototype.currentTime = mediaDefaultStartTime;

    // HTMLMediaElement will dispatch timeupdate with this time frequency
    window.HTMLMediaElement.prototype.mockTimeIncrement = 0.5; // seconds

    playSpy = jest
      .spyOn(window.HTMLMediaElement.prototype, "play")
      .mockName("play");
    pauseSpy = jest
      .spyOn(window.HTMLMediaElement.prototype, "pause")
      .mockName("pause");
  });

  test("plays an infinite number of loops when user presses start", async () => {
    // Arrange
    const randomStartTime = Math.floor(Math.random() * mediaDuration);
    const loopDuration = 1;
    const startTimeInputValue = randomStartTime;
    const endTimeInputValue = startTimeInputValue + loopDuration;
    const expectedLoopDuration = endTimeInputValue - startTimeInputValue;

    // Act
    const { findByTestId, findByLabelText, findByText } = render(<App />);

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
    // Simulate the audio being played
    jest.advanceTimersByTime(expectedLoopDuration * 1000);

    // Assert
    expect(pauseSpy).toHaveBeenCalledTimes(1);
    expect(audioPlayer.currentTime).toBeCloseTo(endTimeInputValue, 0);
  });
});
