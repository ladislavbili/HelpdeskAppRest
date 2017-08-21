import {LOGIN_START, LOGIN_SUCCESS, LOGIN_FAIL, LOGIN_LOGOUT, SET_TASKS} from '../types';
import {LOGIN_URL,TASK_LIST} from '../urls';
import { Actions } from 'react-native-router-flux';
import { AsyncStorage } from 'react-native';

//start login of user
export const loginUser = (username, password) => {
  return (dispatch) => {
    dispatch({ type: LOGIN_START });
    fetch(LOGIN_URL, {
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: `username=${username}&password=${password}`
      }).then((response) => {
        response.json().then((response)=>{
          if(response.token){
            loginUserSuccess(dispatch, {user:{name:username,token:response.token}});
            getDataFromREST(response.token,dispatch);
          }
          else{
            loginUserFail(dispatch);
          }
        });
      })
      .catch(function (error) {
        loginUserFail(dispatch);
      });
  };
};

//start logout of user
export const logoutUser = () => {
  return (dispatch) => dispatch({ type: LOGIN_LOGOUT });
  removeTokenFromAsyncStorage();
  Actions.login();
};


//functions used by actions

//preload all tasks and projects
const getDataFromREST = (token,dispatch) => {
  fetch(TASK_LIST, {
    method: 'GET',
    headers: {'Authorization': 'Bearer ' + token}
  }).then((response)=> response.json().then(response => {
    console.log(response.data[0]);
    dispatch({type: SET_TASKS, payload:{tasks:response.data}})
    Actions.taskList();
  }))
  .catch(
    (error) => {
      console.log(error);
    });
}

//on failed login
const loginUserFail = (dispatch) => {
  dispatch({ type: LOGIN_FAIL });
};

//on success login
const loginUserSuccess = (dispatch, user) => {
  dispatch({
      type: LOGIN_SUCCESS,
      payload: user
  });
  storeTokenToAsyncStorage(user.token);
};

export const storeTokenToAsyncStorage = (token) =>
  AsyncStorage.setItem('lansystem-v1-token',token);

export const removeTokenFromAsyncStorage = () =>
  AsyncStorage.multiRemove(['lansystem-v1-token']);
