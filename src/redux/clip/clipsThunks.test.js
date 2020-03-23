import { clipIdsFetched } from "redux/clips/clipsSlice";
import { clipChanged } from "redux/clip/clipSlice";
import { fetchClipIdsAndFirstClip } from "redux/clips/clipsThunks";
import clipService from "redux/clip/clipService";
import { fakeClipBuilder, fakeClipIdsBuilder } from "redux/clip/fakeBuilders";

let dispatch = jest.fn();

jest.mock("redux/clip/clipService");

const clipIdsFetchedAction = Symbol("clip ids fetched action");
jest.mock("redux/clips/clipsSlice", () => {
  return {
    __esModule: true,
    clipIdsFetched: jest.fn()
  };
});

const clipChangedAction = Symbol("clip changed action");
jest.mock("redux/clip/clipSlice", () => {
  return {
    __esModule: true,
    clipChanged: jest.fn()
  };
});

describe("clipsThunks", () => {
  beforeEach(() => {
    jest.resetAllMocks();
    dispatch.mockName("dispatch");
    clipIdsFetched
      .mockName("clipIdsFetched")
      .mockReturnValue(clipIdsFetchedAction);
    clipChanged.mockName("clipChanged").mockReturnValue(clipChangedAction);
  });

  describe("fetchClipIdsAndFirstClip", () => {
    test("should fetch clip ids from the service and dispatch clipIdsFetch", async () => {
      // Arrange
      const numberClipIds = 2;
      const clipIds = fakeClipIdsBuilder(numberClipIds);
      clipService.getClipIds.mockResolvedValue(clipIds);

      // Act
      await fetchClipIdsAndFirstClip()(dispatch);

      // Assert
      expect(clipIdsFetched).toHaveBeenCalledWith(clipIds);
      expect(dispatch).toHaveBeenCalledWith(clipIdsFetchedAction);
    });

    test("should fetch the clip with the first id in clip ids if clip ids has a length greater than 0", async () => {
      // Arrange
      const numberClipIds = 2;
      const clipIds = fakeClipIdsBuilder(numberClipIds);
      const clip = fakeClipBuilder({
        overrides: {
          id: clipIds[0]
        }
      });
      clipService.getClipIds.mockResolvedValue(clipIds);
      clipService.getClipById.mockImplementation(id => {
        if (id === clipIds[0]) {
          return Promise.resolve(clip);
        }
      });

      // Act
      await fetchClipIdsAndFirstClip()(dispatch);

      // Assert
      expect(clipChanged).toHaveBeenCalledWith(clip);
      expect(dispatch).toHaveBeenCalledWith(clipChangedAction);
    });

    test("should not fetch any clips if there are no clip ids", async () => {
      // Arrange
      const numberClipIds = 0;
      const clipIds = fakeClipIdsBuilder(numberClipIds);
      clipService.getClipIds.mockResolvedValue(clipIds);

      // Act
      await fetchClipIdsAndFirstClip()(dispatch);

      // Assert
      expect(clipService.getClipById).not.toHaveBeenCalled();
      expect(clipChanged).not.toHaveBeenCalled();
    });
  });
});
