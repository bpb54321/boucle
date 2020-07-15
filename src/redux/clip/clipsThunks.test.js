import { clipsFetched, clipAdded } from "redux/clips/clipsSlice";
import { clipChanged } from "redux/clip/clipSlice";
import { fetchClips, addClip } from "redux/clips/clipsThunks";
import clipService from "redux/clip/clipService";
import fakeClipBuilder from "redux/clips/fakeClipBuilder";
import fakeClipsBuilder from "redux/clips/fakeClipsBuilder";

let dispatch = jest.fn();

jest.mock("redux/clip/clipService");

const clipsFetchedAction = Symbol("clips fetched action");
const clipAddedAction = Symbol("clip added action");
jest.mock("redux/clips/clipsSlice");

const clipChangedAction = Symbol("clip changed action");
jest.mock("redux/clip/clipSlice");

describe("clipsThunks", () => {
  beforeEach(() => {
    jest.resetAllMocks();
    dispatch.mockName("dispatch");
    clipsFetched.mockName("clipsFetched").mockReturnValue(clipsFetchedAction);
    clipAdded.mockName("clipAdded").mockReturnValue(clipAddedAction);
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
    test("should dispatch clipChanged with the first clip of the clips if there are one or more clips in the response from the server", async () => {
      // Arrange
      const numberClipIds = 1;
      const clips = fakeClipsBuilder(numberClipIds);
      clipService.getClips.mockResolvedValue(clips);

      // Act
      await fetchClips()(dispatch);

      // Assert
      expect(clipChanged).toHaveBeenCalledWith(clips[0]);
      expect(dispatch).toHaveBeenCalledWith(clipChangedAction);
    });

    test("should not dispatch clipChanged if there are 0 clips returned from the server", async () => {
      // Arrange
      const numberClips = 0;
      const clips = fakeClipsBuilder(numberClips);
      clipService.getClips.mockResolvedValue(clips);

      // Act
      await fetchClips()(dispatch);

      // Assert
      expect(clipChanged).not.toHaveBeenCalled();
      expect(dispatch).not.toHaveBeenCalledWith(clipChangedAction);
    });
  });

  describe("addClip", () => {
    test("should dispatch clipAdded with the provided clip", async () => {
      // Arrange
      const clip = fakeClipBuilder();

      // Act
      await addClip(clip)(dispatch);

      // Assert
      expect(clipAdded).toHaveBeenCalledWith(clip);
      expect(dispatch).toHaveBeenCalledWith(clipAddedAction);
    });
    test("should dispatch clipChanged with the provided clip", async () => {
      // Arrange
      const clip = fakeClipBuilder();

      // Act
      await addClip(clip)(dispatch);

      // Assert
      expect(clipChanged).toHaveBeenCalledWith(clip);
      expect(dispatch).toHaveBeenCalledWith(clipChangedAction);
    });
  });
});
