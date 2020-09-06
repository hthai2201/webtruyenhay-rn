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
        getAllStoriesLoading: true,
        getAllStoriesSuccess: false,
        getAllStoriesError: null,
        allStories: null,
      };
    }
    case constants.GET_ALL_STORIES_SUCCESS: {
      return {
        ...state,
        getAllStoriesLoading: false,
        getAllStoriesSuccess: true,
        getAllStoriesError: null,
        allStories: action.allStories,
        page: action.page,
        pageCount: action.pageCount,
      };
    }

    case constants.GET_ALL_STORIES_FAILURE: {
      return {
        ...state,
        getAllStoriesLoading: false,
        getAllStoriesSuccess: false,
        getAllStoriesError: action.error,
        allStories: null,
      };
    }
    default:
      return state;
  }
}
