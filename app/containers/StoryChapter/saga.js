import { all, put, takeLatest } from 'redux-saga/effects';

import constants from './constants';
import services from './services';
export function* getStoryChapter({ payload }) {
  try {
    let chapter = yield services.getStoryChapter(payload);
    chapter = { ...chapter, storySlug: payload.slug };
    yield put({
      type: constants.GET_STORY_CHAPTER_SUCCESS,
      chapter,
    });
  } catch (error) {
    yield put({
      type: constants.GET_STORY_CHAPTER_FAILURE,
      error,
    });
  }
}
export default function* root() {
  yield all([takeLatest(constants.GET_STORY_CHAPTER, getStoryChapter)]);
}
