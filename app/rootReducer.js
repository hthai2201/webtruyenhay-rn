import { combineReducers } from 'redux';
import { homeReducer } from './containers/Home/reducers';

const rootReducer = combineReducers({
  home: homeReducer,
});
export default rootReducer;
