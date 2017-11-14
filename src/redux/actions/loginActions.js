import {LOGIN_START, LOGIN_SUCCESS, LOGIN_FAIL, LOGIN_LOGOUT, START_LOADING, START_LOADING_PROJECTS, SET_PROJECTS, SET_FILTERS } from '../types';
import {LOGIN_URL, PROJECT_LIST,FILTER_LIST} from '../urls';
import { Actions } from 'react-native-router-flux';
import { AsyncStorage } from 'react-native';
import jwt_decode from 'jwt-decode';


function getProjects(dispatch,token){
  fetch(PROJECT_LIST+'?limit=999', {
    method: 'GET',
    headers: {
        'Authorization': 'Bearer ' + token
    }
  }).then((response) =>{
    response.json().then((data) => {
      dispatch({type: SET_PROJECTS, payload:{projects:data.data}});
    });
  }
).catch(function (error) {
  console.log(error);
});
}
function getFilters(dispatch,token){
  fetch(FILTER_LIST+'?limit=999', {
    method: 'GET',
    headers: {
        'Authorization': 'Bearer ' + token
    }
  }).then((response) =>{
    response.json().then((data) => {
      dispatch({type: SET_FILTERS, filters:data.data});
    });
  }
  ).catch(function (error) {
  console.log(error);
  });
}

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
            storeTokenToAsyncStorage(response.token);
            getFilters(dispatch,response.token);
            getProjects(dispatch,response.token);
            let user=jwt_decode(response.token);
            user['ACL']=user.userRoleAcl;
            dispatch({
                type: LOGIN_SUCCESS,
                payload: {user,token:response.token}
            });
            Actions.taskList();
          }
          else{
            loginUserFail(dispatch);
          }
        });
      })
      .catch(function (error) {
        console.log(error);
        loginUserFail(dispatch);
      });
  };
};


export const loginUserWithToken = (token) => {
  return (dispatch) => {
    let user=jwt_decode(token);
    user['ACL']=user.userRoleAcl;
    getFilters(dispatch,token);
    getProjects(dispatch,token);
    dispatch({
        type: LOGIN_SUCCESS,
        payload: {user,token}
    });
    Actions.taskList();
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

//on failed login
const loginUserFail = (dispatch) => {
  dispatch({ type: LOGIN_FAIL });
};

export const storeTokenToAsyncStorage = (token) =>
  AsyncStorage.setItem('lansystem-v1-token',token);

export const removeTokenFromAsyncStorage = () =>
  AsyncStorage.multiRemove(['lansystem-v1-token']);
