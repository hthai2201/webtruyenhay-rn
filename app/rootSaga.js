import { all, fork } from 'redux-saga/effects';

import homeSaga from './containers/Home/saga';
import categorySaga from './containers/Categories/saga';
import librarySaga from './containers/Library/saga';
import storyDetailSaga from './containers/StoryDetail/saga';
import storyChapterSaga from './containers/StoryChapter/saga';
import storySearchSaga from './containers/StorySearch/saga';

/**
 * rootSaga
 */
export default function* root() {
  yield all([
    fork(homeSaga),
    fork(categorySaga),
    fork(librarySaga),
    fork(storyDetailSaga),
    fork(storyChapterSaga),
    fork(storySearchSaga),
  ]);
}
