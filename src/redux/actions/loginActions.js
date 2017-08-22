import {LOGIN_START, LOGIN_SUCCESS, LOGIN_FAIL, LOGIN_LOGOUT,
  SET_TASKS, SET_PROJECTS, SET_COMPANIES, SET_STATUSES, SET_USERS, SET_UNITS } from '../types';
import {LOGIN_URL,TASK_LIST, PROJECT_LIST,COMPANIES_LIST,STATUSES_LIST,USERS_LIST,UNITS_LIST} from '../urls';
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
      }).then((JSONresponse) => {
        JSONresponse.json().then((response)=>{
          if(JSONresponse.ok){
            getTasks(dispatch, response.token);
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
  return (dispatch) => {
    dispatch({ type: LOGIN_LOGOUT });
    removeTokenFromAsyncStorage();
    Actions.login();
  }
};


//functions used by actions

//preload all tasks and projects

const getTasks = (dispatch,token) => {
  fetch(TASK_LIST, {
    method: 'GET',
  }).then((response) =>response.json().then((response) => {
    dispatch({type: SET_TASKS, payload:{tasks:response}});
    getProjects(dispatch, response.token);
  }))
  .catch(function (error) {
    console.log('1');
    console.log(error);
    loginUserFail(dispatch);
  });
}

const getProjects = (dispatch,token) => {
  fetch(PROJECT_LIST, {
    method: 'GET',
  }).then((response)=> response.json().then(response => {
    dispatch({type: SET_PROJECTS, payload:{projects:response}});
    getCompanies(dispatch, response.token);
  }))
  .catch(function (error) {
    console.log('2');
    console.log(error);
    loginUserFail(dispatch);
  });
}

const getCompanies = (dispatch,token) => {
  fetch(COMPANIES_LIST, {
    method: 'GET',
  }).then((response)=> response.json().then(response => {
    dispatch({type: SET_COMPANIES, payload:{companies:response}});
    getStatuses(dispatch, response.token);
  }))
  .catch(function (error) {
    console.log('3');
    console.log(error);
    loginUserFail(dispatch);
  });
}

const getStatuses = (dispatch,token) => {
  fetch(STATUSES_LIST, {
    method: 'GET',
  }).then((response)=> response.json().then(response => {
    dispatch({type: SET_STATUSES, payload:{statuses:response}});
    getUsers(dispatch, response.token);
  }))
  .catch(function (error) {
    console.log('4');
    console.log(error);
    loginUserFail(dispatch);
  });
}

const getUsers = (dispatch,token) => {
  fetch(USERS_LIST, {
    method: 'GET',
  }).then((response)=> response.json().then(response => {
    dispatch({type: SET_USERS, payload:{users:response}});
    getUnits(dispatch, response.token);
  }))
  .catch(function (error) {
    console.log('5');
    console.log(error);
    loginUserFail(dispatch);
  });
}

const getUnits = (dispatch,token) => {
  fetch(UNITS_LIST, {
    method: 'GET',
  }).then((response)=> response.json().then(response => {
    dispatch({type: SET_UNITS, payload:{units:response}});
    Actions.taskList();
  }))
  .catch(function (error) {
    console.log('6');
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
  //Actions.taskList();
};

export const storeTokenToAsyncStorage = (token) =>
  AsyncStorage.setItem('lansystem-v1-token',token);

export const removeTokenFromAsyncStorage = () =>
  AsyncStorage.multiRemove(['lansystem-v1-token']);
