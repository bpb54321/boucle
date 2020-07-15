import fakeClipBuilder from "./fakeClipBuilder";

const fakeClipsBuilder = numberOfClips => {
  const fakeClips = [];
  for (let i = 0; i < numberOfClips; i++) {
    fakeClips.push(fakeClipBuilder());
  }
  return fakeClips;
};
export default fakeClipsBuilder;
