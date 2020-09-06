import constants from './constants';

export const INITIAL_STATE = {};

export function storyChapterReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    //sync

    //async
    case constants.GET_STORY_CHAPTER: {
      return {
        ...state,
        getStoryChapterLoading: true,
        getStoryChapterSuccess: false,
        getStoryChapterError: null,
      };
    }
    case constants.GET_STORY_CHAPTER_SUCCESS: {
      return {
        ...state,
        getStoryChapterLoading: false,
        getStoryChapterSuccess: true,
        getStoryChapterError: null,
        chapter: action.chapter,
      };
    }

    case constants.GET_STORY_CHAPTER_FAILURE: {
      return {
        ...state,
        getStoryChapterLoading: false,
        getStoryChapterSuccess: false,
        getStoryChapterError: action.error,
      };
    }
    default:
      return state;
  }
}
