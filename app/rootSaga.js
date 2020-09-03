import { all, fork } from 'redux-saga/effects';

import homeSaga from './containers/Home/saga';

/**
 * rootSaga
 */
export default function* root() {
  yield all([fork(homeSaga)]);
}
