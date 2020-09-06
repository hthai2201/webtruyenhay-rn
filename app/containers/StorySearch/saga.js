import { all, put, takeLatest } from 'redux-saga/effects';

import constants from './constants';
import services from './services';

export function* searchStories({ payload }) {
  try {
    let { allStories, pageCount } = yield services.searchStories(payload);
    let { page = 1 } = payload || {};

    yield put({
      type: constants.SEARCH_STORIES_SUCCESS,
      searchStories: allStories,
      pageCount,
      page,
    });
  } catch (error) {
    yield put({
      type: constants.SEARCH_STORIES_FAILURE,
      error,
    });
  }
}
export default function* root() {
  yield all([takeLatest(constants.SEARCH_STORIES, searchStories)]);
}
