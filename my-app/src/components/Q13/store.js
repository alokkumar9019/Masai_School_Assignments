import { applyMiddleware, createStore, combineReducers } from 'redux';
import { default as thunkMiddleware } from 'redux-thunk';

const store = createStore(
  combineReducers({
  }),
  applyMiddleware(thunkMiddleware)
);

export default store;
