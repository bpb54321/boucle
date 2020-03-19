describe("Mvp user journey", () => {
  it("should allow a user to create new clips", function() {
    // The user opens the app
    cy.visit("/");

    // No clip editing forms are currently visible
    cy.findByTestId("clip-edit-form").should("not.be.visible");

    // The user presses the New Clip button
    cy.findByTestId("new-clip-button").click();

    // A form appears with fields for clip start time, end time, and transcription.
    cy.findByTestId("clip-edit-form").should($clipEditForm => {
      return expect($clipEditForm, "Expect clip edit form to be visible").to.be
        .visible;
    });

    // Clip start time defaults to 0, and end time defaults to 5 seconds in
    const startTimeInputValue = 0;
    const endTimeInputValue = 5;
    cy.findByTestId("loop-start-time").should(
      "have.value",
      startTimeInputValue.toString()
    );
    cy.findByTestId("loop-end-time").should(
      "have.value",
      endTimeInputValue.toString()
    );

    // The user presses Loop, which starts the audio looping between the clip start and end time, with a pause in-between.
    const timeTolerance = 0.25;
    cy.findByTestId("start-loop-button").click();
    cy.findByTestId("audio-player").should($audioEl => {
      const audioEl = $audioEl.get(0);
      expect(audioEl.currentTime).to.be.closeTo(
        startTimeInputValue,
        timeTolerance,
        "expect audio player to be set to start time"
      );
      expect(audioEl.paused).to.equal(
        false,
        "expect audio player to not be paused"
      );
    });
    cy.findByTestId("audio-player", { timeout: 10000 }).should($audioEl => {
      const audioEl = $audioEl.get(0);
      expect(audioEl.currentTime).to.be.closeTo(
        endTimeInputValue,
        timeTolerance,
        "expect audio player to be at end time"
      );
      expect(audioEl.paused).to.equal(true, "expect audio player to be paused");
    });
    cy.findByTestId("audio-player", { timeout: 10000 }).should($audioEl => {
      const audioEl = $audioEl.get(0);
      expect(audioEl.currentTime).to.be.closeTo(
        startTimeInputValue,
        timeTolerance,
        "expect audio player to be reset to start time"
      );
      expect(audioEl.paused).to.equal(
        false,
        "expect audio player to not be paused"
      );
    });

    // The user adjusts the start and end time to correspond to a short phrase or utterance in the clip.
    const newStartTimeInputValue = 1;
    const newEndTimeInputValue = 4;
    cy.findByTestId("loop-start-time").type(
      `{selectAll}{backspace}${newStartTimeInputValue}`
    );
    cy.findByTestId("loop-end-time").type(
      `{selectAll}{backspace}${newEndTimeInputValue}`
    );

    // The loop adjusts its start and end time according to the clip start and end time.
    cy.findByTestId("audio-player", { timeout: 10000 }).should($audioEl => {
      const audioEl = $audioEl.get(0);
      expect(audioEl.currentTime).to.be.closeTo(
        newStartTimeInputValue,
        timeTolerance,
        "expect audio player to be set to start time"
      );
      expect(audioEl.paused).to.equal(
        false,
        "expect audio player to not be paused"
      );
    });
    cy.findByTestId("audio-player", { timeout: 10000 }).should($audioEl => {
      const audioEl = $audioEl.get(0);
      expect(audioEl.currentTime).to.be.closeTo(
        newEndTimeInputValue,
        timeTolerance,
        "expect audio player to be at end time"
      );
      expect(audioEl.paused).to.equal(true, "expect audio player to be paused");
    });
    cy.findByTestId("audio-player", { timeout: 10000 }).should($audioEl => {
      const audioEl = $audioEl.get(0);
      expect(audioEl.currentTime).to.be.closeTo(
        newStartTimeInputValue,
        timeTolerance,
        "expect audio player to be reset to start time"
      );
      expect(audioEl.paused).to.equal(
        false,
        "expect audio player to not be paused"
      );
    });

    // Once the user is happy with the start and end time, the user writes the transcription in the transcription field, editing the text as needed.
    const transcription = "This is my transcription.";
    cy.findByTestId("transcription-input").type(transcription);

    // Once the transcription is finished, the user presses the Add Clip button again.
    cy.findByTestId("new-clip-button").click();

    // The user is now shown a new form where start time is equal to the end time of
    // the previous clip, the end time of this clip equals the new start time plus
    // three seconds, and the transcription field is empty.
    const secondClipDefaultStartTime = newEndTimeInputValue;
    cy.findByTestId("loop-start-time").should($startTimeInput => {
      expect(
        $startTimeInput,
        "expect loop start time to have a value equal to the previous clip end time"
      ).to.have.value(secondClipDefaultStartTime);
    });
    const defaultNewClipLength = 3;
    const secondClipDefaultEndTime =
      secondClipDefaultStartTime + defaultNewClipLength;
    cy.findByTestId("loop-end-time").should($startTimeInput => {
      expect(
        $startTimeInput,
        "expect loop end time to have a value equal to start time + 3 sec"
      ).to.have.value(newEndTimeInputValue);
    });

    /*

   
   
   
   
   
   The user adjusts the fields of this clip as needed.
   
   The user navigates back to the previous clip to adjust the transcription.
   
   The user quits and re-opens the app, and the data is still there. The clip with the 
   lowest start time is displayed first.
   */
  });
});
