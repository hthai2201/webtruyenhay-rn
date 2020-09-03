import constants from './constants';

export const INITIAL_STATE = {
  history: [],
  download: [],
};

export function homeReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    //sync

    //async
    case constants.GET_ALL_STORIES: {
      return {
        ...state,
        getALlStoriesLoading: true,
        getALlStoriesSuccess: false,
        getALlStoriesError: null,
        allStories: null,
      };
    }
    case constants.GET_ALL_STORIES_SUCCESS: {
      return {
        ...state,
        getALlStoriesLoading: false,
        getALlStoriesSuccess: true,
        getALlStoriesError: null,
        allStories: action.allStories,
        page: action.page,
        pageCount: action.pageCount,
      };
    }

    case constants.GET_ALL_STORIES_FAILURE: {
      return {
        ...state,
        getALlStoriesLoading: false,
        getALlStoriesSuccess: false,
        getALlStoriesError: action.error,
        allStories: null,
      };
    }
    default:
      return state;
  }
}
