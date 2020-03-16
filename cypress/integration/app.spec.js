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

  it("when the loop has been played, the subsequent pause has the same length as the loop", () => {
    // Arrange
    const timeTolerance = 0.25;
    const minLoopDuration = 4;
    const loopDurationScaleFactor = 10;
    const startTimeScaleFactor = 10;
    const loopDuration =
      Math.floor(Math.random() * loopDurationScaleFactor) + minLoopDuration;
    const cypressTimeout = (loopDuration / 4) * 1000;
    const startTimeInputValue = Math.floor(
      Math.random() * startTimeScaleFactor
    );
    const endTimeInputValue = startTimeInputValue + loopDuration;

    cy.visit("/");

    cy.findByTestId("loop-start-time").type(startTimeInputValue);
    cy.findByTestId("loop-end-time").type(endTimeInputValue);
    cy.findByTestId("start-loop-button").click();

    cy.log(`Wait for loop to play, then pause`);
    cy.wait(loopDuration * 1000);
    cy.findByTestId("audio-player", { timeout: cypressTimeout }).should(
      $audioEl => {
        expect($audioEl[0].paused).to.equal(
          true,
          "expect audio player to be paused"
        );
      }
    );

    cy.log(`Expect audio player to still be paused after 1/3 of loop duration`);
    cy.wait((loopDuration / 3) * 1000);
    cy.findByTestId("audio-player").then($audioEl => {
      expect($audioEl[0].paused).to.equal(
        true,
        "expect audio player to be paused"
      );
    });

    cy.log(`Expect audio player to still be paused after 2/3 of loop duration`);
    cy.wait((loopDuration / 3) * 1000);
    cy.findByTestId("audio-player").then($audioEl => {
      expect($audioEl[0].paused).to.equal(
        true,
        "expect audio player to be paused"
      );
    });

    cy.log(`finish waiting the rest of the loop duration`);
    cy.wait((loopDuration / 3) * 1000);

    cy.log(
      `Expect audio player to start playing again now that pause should be over`
    );
    cy.findByTestId("audio-player", { timeout: cypressTimeout }).should(
      $audioEl => {
        expect($audioEl[0].paused).to.equal(
          false,
          "expect audio player to not be paused"
        );
      }
    );
  });

  it('when the user presses stop, the loop stops playing', function () {
    
  });

  it('when the user presses start after pressing stop, the loop plays again', function () {
    
  });

  
});
