import clipService from "redux/clip/clipService";
import axios from "axios";
import { fakeClipBuilder, fakeClipIdsBuilder } from "redux/clip/fakeBuilders";

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

jest.mock("axios");

describe("clipService", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe("getClipIds", () => {
    test("should return the clip ids it gets from the server", async () => {
      // Arrange
      const numFakeClipIds = 2;
      const fakeClipIds = fakeClipIdsBuilder(numFakeClipIds);

      axios.get.mockImplementation(route => {
        if (route === `${apiBaseUrl}/clips`) {
          return Promise.resolve({
            data: fakeClipIds
          });
        }
      });

      // Act
      const gottenClipIds = await clipService.getClipIds();

      // Assert
      expect(gottenClipIds).toStrictEqual(fakeClipIds);
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
});
