import { combineReducers } from 'redux';
import { homeReducer } from './containers/Home/reducers';
import { categoryReducer } from './containers/Categories/reducers';
import { libraryReducer } from './containers/Library/reducers';
import { storyDetailReducer } from './containers/StoryDetail/reducers';
import { storyChapterReducer } from './containers/StoryChapter/reducers';
import { storySearchReducer } from './containers/StorySearch/reducers';

const appReducer = combineReducers({
  home: homeReducer,
  category: categoryReducer,
  library: libraryReducer,
  storyDetail: storyDetailReducer,
  storyChapter: storyChapterReducer,
  storySearch: storySearchReducer,
});
const rootReducer = (state, action) => {
  if (action.type === 'CLEAR_DATA') {
    state = undefined;
  }

  return appReducer(state, action);
};
export default rootReducer;
