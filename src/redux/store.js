import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import ReduxThunk from 'redux-thunk';

import loginReducer from './reducers/loginReducer';
import drawerReducer from './reducers/drawerReducer';
import navigationReducer from './reducers/navigationReducer';
import taskReducer from './reducers/taskReducer';
import commentReducer from './reducers/commentReducer';
import companyReducer from './reducers/companyReducer';
import itemReducer from './reducers/itemReducer';
import userReducer from './reducers/userReducer';

//all reducers gathered together for the redux storage
const reducers = combineReducers({
  login:loginReducer,
  drawer:drawerReducer,
  navigation:navigationReducer,
  taskR:taskReducer,
  commentR:commentReducer,
  companyR:companyReducer,
  itemR:itemReducer,
  userR:userReducer,
});

//all enhancers gathered together for the redux storage
const enhancers = compose(
  applyMiddleware(ReduxThunk),
);

//creates redux store and exports it
export default () => createStore(reducers, {}, enhancers);
