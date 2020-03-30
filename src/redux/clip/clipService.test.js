import clipService from "redux/clip/clipService";
import axios from "axios";
import { fakeClipIdsBuilder } from "redux/clip/fakeBuilders";

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

jest.mock("axios");

let fakeClipIds;

describe("clipService", () => {
  beforeEach(() => {
    const numFakeClipIds = 2;
    fakeClipIds = fakeClipIdsBuilder(2);

    axios.get.mockImplementation(route => {
      if (route === `${apiBaseUrl}/clips`) {
        return Promise.resolve(fakeClipIds);
      }
    });
  });

  describe("getClipIds", () => {
    test("should return the clip ids it gets from the server", async () => {
      // Act
      const gottenClipIds = await clipService.getClipIds();

      // Assert
      expect(gottenClipIds).toStrictEqual(fakeClipIds);
    });
  });
});
