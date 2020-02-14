import React from "react";
import { render } from "@testing-library/react";
import App from "./App";
import userEvent from "@testing-library/user-event";
import "./HTMLMediaElementMock";

describe("App", () => {
  test("allows you to play one iteration of a loop", async () => {
    jest.useFakeTimers();
    // Arrange
    const mediaDuration = 10;
    const randomStartTime = Math.floor(Math.random() * mediaDuration);
    window.HTMLMediaElement.prototype.duration = mediaDuration;
    const startTimeInputValue = randomStartTime;
    const endTimeInputValue = startTimeInputValue + 1;
    const loopLength = endTimeInputValue - startTimeInputValue;

    const playSpy = jest
      .spyOn(window.HTMLMediaElement.prototype, "play")
      .mockName("play");
    const fastSeekSpy = jest
      .spyOn(window.HTMLMediaElement.prototype, "fastSeek")
      .mockName("fastSeek");
    const pauseSpy = jest
      .spyOn(window.HTMLMediaElement.prototype, "pause")
      .mockName("pause");

    // Act
    const { findByTestId, findByLabelText, findByText } = render(<App />);

    const audioPlayer = await findByTestId("audio-player");
    const loopStartTimeElement = await findByLabelText(/loop start time/i);
    const loopEndTimeElement = await findByLabelText(/loop end time/i);
    const startLoopButton = await findByText(/start loop/i);

    await userEvent.type(loopStartTimeElement, String(startTimeInputValue));
    await userEvent.type(loopEndTimeElement, String(endTimeInputValue));
    await userEvent.click(startLoopButton);

    // Assert
    expect(fastSeekSpy).toHaveBeenCalledTimes(1);
    expect(fastSeekSpy).toHaveBeenCalledWith(startTimeInputValue);
    expect(playSpy).toHaveBeenCalledTimes(1);

    // Act
    jest.runAllTimers();

    // Assert
    expect(pauseSpy).toHaveBeenCalledTimes(1);
    expect(audioPlayer.currentTime).toBeCloseTo(endTimeInputValue, 0);
  });
});
