import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import Login from './reducers';

const reducers = combineReducers({
    reducers.login
  });

const enhancers = compose(
);

export default () => createStore(reducers, {}, enhancers);
