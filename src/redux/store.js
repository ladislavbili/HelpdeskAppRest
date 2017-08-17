import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import loginReducer from './reducers/loginReducer';
import ReduxThunk from 'redux-thunk';
const reducers = combineReducers({
    login:loginReducer,
  });

const enhancers = compose(
  applyMiddleware(ReduxThunk),
);

export default () => createStore(reducers, {}, enhancers);
