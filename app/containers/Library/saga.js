import { all, put, takeLatest } from 'redux-saga/effects';

import constants from './constants';
import services from './services';
export function* downloadStory({ payload }) {
  try {
    let story = yield services.downloadStory(payload);

    yield put({
      type: constants.DOWNLOAD_STORY_SUCCESS,
      story,
    });
  } catch (error) {
    yield put({
      type: constants.DOWNLOAD_STORY_FAILURE,
      error,
    });
  }
}
export default function* root() {
  yield all([takeLatest(constants.DOWNLOAD_STORY, downloadStory)]);
}
