import constants from './constants';

export const INITIAL_STATE = {
  history: [],
  download: [],
};

export function libraryReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    //sync
    case constants.ADD_HISTORY_STORY: {
      let history = [...state.history];
      let { payload: story } = action;

      if (story) {
        let index = history.findIndex((item) => (item.slug = story.slug));
        if (index !== -1) {
          history[index] = story;
        } else {
          history.push(story);
        }
      } else {
        return {
          ...state,
          addHistoryError: 'payload error',
        };
      }

      return {
        ...state,
        history,
      };
    }
    case constants.GET_DOWNLOAD_CHAPTER: {
      let { chapterId, slug } = action.payload || {};
      let { download } = state;
      let downloadedChapter;
      let getDownloadChapterError = null;
      if (chapterId && slug) {
        let downloadStory = download.find((item) => item.slug === slug);

        if (downloadStory && downloadStory.chapters) {
          downloadedChapter = downloadStory.chapters.find((item) => item.chapterId === chapterId);
        }
      }

      return {
        ...state,
        downloadedChapter,
        getDownloadChapterError: !downloadedChapter,
      };
    }
    //async
    case constants.DOWNLOAD_STORY: {
      return {
        ...state,
        downloadStoryLoading: true,
        downloadStorySuccess: false,
        downloadStoryError: null,
      };
    }
    case constants.DOWNLOAD_STORY_SUCCESS: {
      let download = [...state.download];
      let { story = {} } = action;
      story.chapters = story.chapters ? story.chapters.map((chap) => ({ ...chap, storySlug: story.slug })) : [];
      let index = download.findIndex((item) => item.slug === story.slug);

      if (index !== -1) {
        download[index] = story;
      } else {
        download.push(story);
      }

      return {
        ...state,
        downloadStoryLoading: false,
        downloadStorySuccess: true,
        downloadStoryError: null,
        download,
      };
    }

    case constants.DOWNLOAD_STORY_FAILURE: {
      return {
        ...state,
        downloadStoryLoading: false,
        downloadStorySuccess: false,
        downloadStoryError: action.error,
      };
    }
    default:
      return state;
  }
}
