import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import ReduxThunk from 'redux-thunk';

import loginReducer from './reducers/loginReducer';
import drawerReducer from './reducers/drawerReducer';
import navigationReducer from './reducers/navigationReducer';
import taskListReducer from './reducers/taskListReducer';

const reducers = combineReducers({
    login:loginReducer,
    drawer:drawerReducer,
    navigation:navigationReducer,
    taskList:taskListReducer,
  });

const enhancers = compose(
  applyMiddleware(ReduxThunk),
);

export default () => createStore(reducers, {}, enhancers);
