import constants from './constants';

export const INITIAL_STATE = {
  history: [],
  download: [],
};

export function storySearchReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    //sync

    //async
    case constants.SEARCH_STORIES: {
      return {
        ...state,
        searchStoriesLoading: true,
        searchStoriesSuccess: false,
        searchStoriesError: null,
        allStories: null,
      };
    }
    case constants.SEARCH_STORIES_SUCCESS: {
      return {
        ...state,
        searchStoriesLoading: false,
        searchStoriesSuccess: true,
        searchStoriesError: null,
        searchStories: action.searchStories,
        page: action.page,
        pageCount: action.pageCount,
      };
    }

    case constants.SEARCH_STORIES_FAILURE: {
      return {
        ...state,
        searchStoriesLoading: false,
        searchStoriesSuccess: false,
        searchStoriesError: action.error,
        allStories: null,
      };
    }
    default:
      return state;
  }
}
