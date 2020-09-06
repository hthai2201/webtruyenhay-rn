import constants from './constants';

export const INITIAL_STATE = {
  history: [],
  download: [],
};

export function categoryReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    //sync

    //async
    case constants.GET_ALL_CATEGORIES: {
      return {
        ...state,
        getAllCategoriesLoading: true,
        getAllCategoriesSuccess: false,
        getAllCategoriesError: null,
        allCategories: null,
      };
    }
    case constants.GET_ALL_CATEGORIES_SUCCESS: {
      return {
        ...state,
        getAllCategoriesLoading: false,
        getAllCategoriesSuccess: true,
        getAllCategoriesError: null,
        allCategories: action.allCategories,
      };
    }

    case constants.GET_ALL_CATEGORIES_FAILURE: {
      return {
        ...state,
        getAllCategoriesLoading: false,
        getAllCategoriesSuccess: false,
        getAllCategoriesError: action.error,
        allCategories: null,
      };
    }
    default:
      return state;
  }
}
