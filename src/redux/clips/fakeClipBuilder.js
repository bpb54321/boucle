import Chance from "chance";
import clipBuilder from "./clipBuilder";

const chance = new Chance();

const fakeClipBuilder = () => {
  const maxTime = 200;
  const startTime = chance.integer({ min: 0, max: maxTime });
  const endTime = chance.integer({ min: startTime, max: maxTime });
  const transcription = chance.sentence();
  return clipBuilder(startTime, endTime, transcription);
};
export default fakeClipBuilder;
