import React from 'react';
import { render, wait } from '@testing-library/react';
import App from './App';
import userEvent from "@testing-library/user-event";

describe('App', () => {
  test('allows you to set a loop start and end', async () => {
    const startTime = '5';
    const endTime = '6';
    
    const { findByTestId, findByLabelText, findByText } = render(<App />);
    const audioPlayer = await findByTestId('audio-player');
    console.log(audioPlayer);
    // audioPlayer.play = jest.fn().mockName('audioPlayer.play');
    jest.spyOn(audioPlayer.play);
    // audioPlayer.fastSeek = jest.fn().mockName('audioPlayer.fastSeek');
    jest.spyOn(audioPlayer.fastSeek);
    // audioPlayer.pause = jest.fn().mockName('audioPlayer.pause');
    jest.spyOn(audioPlayer.pause);
    
    const loopStartTimeElement = await findByLabelText(/loop start time/i);
    const loopEndTimeElement = await findByLabelText(/loop end time/i);

    const startLoopButton = await findByText(/start loop/i);
    
    await userEvent.type(loopStartTimeElement, startTime);
    await userEvent.type(loopEndTimeElement, endTime);
    await userEvent.click(startLoopButton);
    await wait(() => {
      expect(audioPlayer.fastSeek).toHaveBeenCalledTimes(1);
      expect(audioPlayer.fastSeek).toHaveBeenCalledWith(startTime);
    });
    await wait(() => {
      expect(audioPlayer.play).toHaveBeenCalledTimes(1);
    });
    
    await wait(() => {
      expect(audioPlayer.pause).toHaveBeenCalledTimes(1);
    });
    
    expect(audioPlayer.currentTime).toBeCloseTo(endTime, 1);
  });

  
});

