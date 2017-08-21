import {LOGIN_START, LOGIN_SUCCESS, LOGIN_FAIL, LOGIN_LOGOUT,
  SET_TASKS, SET_PROJECTS, SET_COMPANIES, SET_STATUSES, SET_USERS, SET_CUSTOM_ATTRIBUTES } from '../types';
import {LOGIN_URL,TASK_LIST, PROJECT_LIST,COMPANIES_LIST} from '../urls';
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
            getDataFromREST(dispatch, response.token);
            loginUserSuccess(dispatch, {user:{name:username,token:response.token}});
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
const getDataFromREST = (dispatch,token) => {

  fetch(TASK_LIST, {
    method: 'GET',
    headers: {'Authorization': 'Bearer ' + token}
  }).then((response)=> response.json().then(response => {
    dispatch({type: SET_TASKS, payload:{tasks:response.data}});
  }))
  .catch(function (error) {
    console.log(error);
    loginUserFail(dispatch);
  });

  fetch(PROJECT_LIST, {
    method: 'GET',
    headers: {'Authorization': 'Bearer ' + token}
  }).then((response)=> response.json().then(response => {console.log('DONE BUT PAGING')}))
  .catch(function (error) {
    console.log(error);
    loginUserFail(dispatch);
  });

  fetch(COMPANIES_LIST, {
    method: 'GET',
    headers: {'Authorization': 'Bearer ' + token}
  }).then((response)=> response.json().then(response => {console.log('DONE BUT PAGING')}))
  .catch(function (error) {
    console.log(error);
    loginUserFail(dispatch);
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
  Actions.taskList();
};

export const storeTokenToAsyncStorage = (token) =>
  AsyncStorage.setItem('lansystem-v1-token',token);

export const removeTokenFromAsyncStorage = () =>
  AsyncStorage.multiRemove(['lansystem-v1-token']);
