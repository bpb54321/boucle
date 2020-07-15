import Chance from "chance";
import clipBuilder from "./clipBuilder";

const chance = new Chance();

describe("clipBuilder", () => {
  test(
    "should build a new clip with the correct structure when passed the clip " +
      "parameters",
    async () => {
      // Arrange
      const startTime = chance.integer({ min: 0 });
      const endTime = chance.integer({ min: startTime });
      const transcription = chance.sentence();

      // Act
      const clip = clipBuilder(startTime, endTime, transcription);

      // Assert
      expect(clip).toStrictEqual({
        startTime,
        endTime,
        transcription
      });
    }
  );
});
