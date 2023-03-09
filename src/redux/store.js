import {createStore, combineReducers, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import * as reducers from '../reducers';

// Sagas
import app from '../reducers/sagas/app';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  combineReducers({
    ...reducers
  }),
  applyMiddleware(sagaMiddleware),
);

sagaMiddleware.run(app);

export default store;