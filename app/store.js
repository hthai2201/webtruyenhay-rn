import { applyMiddleware, createStore, compose, combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import AsyncStorage from '@react-native-community/async-storage';

import rootSaga from './rootSaga';
import rootReducer from './rootReducer';

//mdw
const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];
//
const reducer = persistReducer(
  {
    key: 'rrsb', // key is required
    storage: AsyncStorage, // storage is now required
  },
  rootReducer,
);

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

/* istanbul ignore next */
const configStore = (initialState = {}) => {
  const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(...middleware)));

  sagaMiddleware.run(rootSaga);

  return {
    persistor: persistStore(store),
    store,
  };
};

const { store, persistor } = configStore();

global.store = store;

export { store, persistor };
