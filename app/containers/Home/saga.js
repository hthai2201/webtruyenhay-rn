import { all, put, takeLatest } from 'redux-saga/effects';

import constants from './constants';
import services from './services';

export function* getAllStories({ payload }) {
  try {
    let { allStories, pageCount } = yield services.getAllStories(payload);
    let { page = 1 } = payload || {};

    yield put({
      type: constants.GET_ALL_STORIES_SUCCESS,
      allStories,
      pageCount,
      page,
    });
  } catch (error) {
    yield put({
      type: constants.GET_ALL_STORIES_FAILURE,
      error,
    });
  }
}
export default function* root() {
  yield all([takeLatest(constants.GET_ALL_STORIES, getAllStories)]);
}
