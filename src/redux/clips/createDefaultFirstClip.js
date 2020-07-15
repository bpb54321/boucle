import clipBuilder from "./clipBuilder";

const createDefaultFirstClip = () => {
  const startTime = 0;
  const endTime = 5;
  const transcription = "";
  return clipBuilder(startTime, endTime, transcription);
};

export default createDefaultFirstClip;
