import { clipIdsFetched } from "redux/clips/clipsSlice";
import { fetchClipIds } from "redux/clips/clipsThunks";
import clipService from "redux/clip/clipService";
import { fakeClipIdsBuilder } from "redux/clip/fakeBuilders";

let dispatch = jest.fn();

jest.mock("redux/clip/clipService");

const clipIdsFetchedAction = Symbol("clip ids fetched action");
jest.mock("redux/clips/clipsSlice", () => {
  return {
    __esModule: true,
    clipIdsFetched: jest.fn()
  };
});

describe("clipsThunks", () => {
  beforeEach(() => {
    dispatch.mockName("dispatch");
    clipIdsFetched
      .mockName("clipIdsFetched")
      .mockReturnValue(clipIdsFetchedAction);
  });

  describe("fetchClipIds", () => {
    test("should fetch clip ids from the service dispatch clipIdsFetch", async () => {
      // Arrange
      const numberClipIds = 2;
      const clipIds = fakeClipIdsBuilder(numberClipIds);
      clipService.getClipIds.mockResolvedValue(clipIds);

      // Act
      await fetchClipIds()(dispatch);

      // Assert
      expect(clipIdsFetched).toHaveBeenCalledWith(clipIds);
      expect(dispatch).toHaveBeenCalledWith(clipIdsFetchedAction);
    });
  });
});
