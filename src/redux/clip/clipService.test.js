import clipService from "redux/clip/clipService";
import axios from "axios";
import { fakeClipBuilder, fakeClipsBuilder } from "redux/clip/fakeBuilders";

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

jest.mock("axios");

describe("clipService", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe("getClips", () => {
    test("should return the clips it gets from the server", async () => {
      // Arrange
      const numFakeClips = 2;
      const fakeClips = fakeClipsBuilder(numFakeClips);

      axios.get.mockImplementation(route => {
        if (route === `${apiBaseUrl}/clips`) {
          return Promise.resolve({
            data: fakeClips
          });
        }
      });

      // Act
      const gottenClips = await clipService.getClips();

      // Assert
      expect(gottenClips).toStrictEqual(fakeClips);
    });
  });

  describe("getClipById", () => {
    test("should return the clip at the specified id", async () => {
      // Arrange
      const clipId = 1;
      const fakeClip = fakeClipBuilder({
        overrides: {
          id: clipId
        }
      });
      axios.get.mockImplementation(route => {
        if (route === `${apiBaseUrl}/clips/${clipId}`) {
          return Promise.resolve({
            data: fakeClip
          });
        }
      });

      // Act
      const gotClip = await clipService.getClipById(clipId);

      // Assert
      expect(gotClip).toStrictEqual(fakeClip);
    });
  });

  describe("updateClip", () => {
    test("should call axios PUT at the appropriate url with appropriate body", async () => {
      // Arrange
      const clip = fakeClipBuilder();

      // Act
      await clipService.updateClip(clip);

      // Assert
      expect(axios.put).toHaveBeenCalledWith(
        `${apiBaseUrl}/clips/${clip.id}`,
        clip
      );
    });
  });
});
