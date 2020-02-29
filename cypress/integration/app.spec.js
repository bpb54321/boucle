describe("App", () => {
  it("plays an infinite number of loops when user presses start, with pause in between", () => {
    // Arrange
    const pauseTimeBetweenLoops = 1;
    const timeTolerance = 0.25;
    const startTimeInputValue = 5;
    const endTimeInputValue = 6;

    cy.visit("/");

    cy.findByTestId("loop-start-time").type(startTimeInputValue);
    cy.findByTestId("loop-end-time").type(endTimeInputValue);
    cy.findByTestId("start-loop-button").click();

    cy.log("Expect audio player to be set to start time then played");
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

    cy.log(`Expect audio player to be paused at end time`);
    cy.findByTestId("audio-player").should($audioEl => {
      const audioEl = $audioEl.get(0);
      expect(audioEl.currentTime).to.be.closeTo(
        endTimeInputValue,
        timeTolerance,
        "expect audio player to be at end time"
      );
      expect(audioEl.paused).to.equal(true, "expect audio player to be paused");
    });

    cy.findByTestId("audio-player").should($audioEl => {
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
  });
});
