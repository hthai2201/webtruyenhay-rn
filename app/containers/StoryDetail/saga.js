import { all, put, takeLatest } from 'redux-saga/effects';

import constants from './constants';
import services from './services';

export function* getStory({ payload }) {
  try {
    let story = yield services.getStory(payload);

    yield put({
      type: constants.GET_STORY_SUCCESS,
      story,
    });
  } catch (error) {
    yield put({
      type: constants.GET_STORY_FAILURE,
      error,
    });
  }
}
export default function* root() {
  yield all([takeLatest(constants.GET_STORY, getStory)]);
}
