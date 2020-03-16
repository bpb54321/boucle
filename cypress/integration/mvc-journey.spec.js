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
    cy.findByTestId("loop-start-time").should("have.value", "0");
    cy.findByTestId("loop-end-time").should("have.value", "5");

    /*
   
   
   
   The user presses Loop, which starts the audio looping between the clip start and end time, with a pause in-between.
   
   The user adjusts the start and end time to correspond to a short phrase or utterance in the clip.  The loop adjusts its start and end time according to the clip start and end time.
   
   Once the user is happy with the start and end time, the user writes the transcription in the transcription field, editing the text as needed.
   
   Once the transcription is finished, the user presses the New Clip button again. 
   
   The user is now shown a new form where start time is equal to the end time of the previous clip, the end time of this clip equals the new start time plus three seconds, and the transcription field is empty.
   
   The user adjusts the fields of this clip as needed.
   
   The user navigates back to the previous clip to adjust the transcription.
   
   The user quits and re-opens the app, and the data is still there. The clip with the 
   lowest start time is displayed first.
   
   
   */
  });
});
