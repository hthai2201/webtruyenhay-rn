import { all, put, takeLatest } from 'redux-saga/effects';

import constants from './constants';
import services from './services';
export function* getAllCategories({ payload }) {
  try {
    let allCategories = yield services.getAllCategories(payload);

    yield put({
      type: constants.GET_ALL_CATEGORIES_SUCCESS,
      allCategories,
    });
  } catch (error) {
    yield put({
      type: constants.GET_ALL_CATEGORIES_FAILURE,
      error,
    });
  }
}
export default function* root() {
  yield all([takeLatest(constants.GET_ALL_CATEGORIES, getAllCategories)]);
}
