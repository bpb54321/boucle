import { clipsFetched } from "redux/clips/clipsSlice";
import { clipChanged } from "redux/clip/clipSlice";
import { fetchClips } from "redux/clips/clipsThunks";
import clipService from "redux/clip/clipService";
import { fakeClipsBuilder } from "redux/clip/fakeBuilders";

let dispatch = jest.fn();

jest.mock("redux/clip/clipService");

const clipsFetchedAction = Symbol("clips fetched action");
jest.mock("redux/clips/clipsSlice", () => {
  return {
    __esModule: true,
    clipsFetched: jest.fn()
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
    clipsFetched.mockName("clipsFetched").mockReturnValue(clipsFetchedAction);
    clipChanged.mockName("clipChanged").mockReturnValue(clipChangedAction);
  });

  describe("fetchClips", () => {
    test("should fetch clips from the service and dispatch clipsFetched", async () => {
      // Arrange
      const numberClipIds = 2;
      const clips = fakeClipsBuilder(numberClipIds);
      clipService.getClips.mockResolvedValue(clips);

      // Act
      await fetchClips()(dispatch);

      // Assert
      expect(clipsFetched).toHaveBeenCalledWith(clips);
      expect(dispatch).toHaveBeenCalledWith(clipsFetchedAction);
    });
  });
});
