import constants from './constants';

export const INITIAL_STATE = {
  history: [],
  download: [],
};

export function storyDetailReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    //sync

    //async
    case constants.GET_STORY: {
      return {
        ...state,
        getStoryLoading: true,
        getStorySuccess: false,
        getStoryError: null,
        story: null,
      };
    }
    case constants.GET_STORY_SUCCESS: {
      return {
        ...state,
        getStoryLoading: false,
        getStorySuccess: true,
        getStoryError: null,
        story: action.story,
       
      };
    }

    case constants.GET_STORY_FAILURE: {
      return {
        ...state,
        getStoryLoading: false,
        getStorySuccess: false,
        getStoryError: action.error,
        story: null,
      };
    }
    default:
      return state;
  }
}
