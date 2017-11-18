import {LOGIN_START, LOGIN_SUCCESS, LOGIN_FAIL, LOGIN_LOGOUT, START_LOADING, START_LOADING_PROJECTS, SET_PROJECTS, SET_FILTERS } from '../types';
import {LOGIN_URL, PROJECT_LIST,FILTER_LIST} from '../urls';
import { Actions } from 'react-native-router-flux';
import { AsyncStorage } from 'react-native';
import jwt_decode from 'jwt-decode';
//All of these are actions, they return redux triggered functions, that have no return, just manipulate with the store

/**
 * Loads all projects after user has been logged in
 * @param  {function} dispatch Accesses and modifies redux store via Actions
 * @param  {string} token    Token for the REST API
 */
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

/**
 * Loads all filters after user has been logged in
 * @param  {function} dispatch Accesses and modifies redux store via Actions
 * @param  {string} token    Token for the REST API
 */
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

/**
 * Tries to log in user using his username and password
 * @param  {string} username User's username
 * @param  {string} password User's password
 */
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

/**
 * Log's in user via existing token
 * @param  {string} token  Token for the REST API
 */
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

/**
 * Log's out user and returns user to the login page
 */
export const logoutUser = () => {
  return (dispatch) => {
    dispatch({ type: LOGIN_LOGOUT });
    removeTokenFromAsyncStorage();
    Actions.login();
  }
};

/**
 * User login failed, stops login indicator and displays an error
 * @param  {function} dispatch Accesses and modifies redux store via Actions
 */
const loginUserFail = (dispatch) => {
  dispatch({ type: LOGIN_FAIL });
};

/**
 * Store the token into device's async storage
 * @param  {string} token Token to be saved
 */
export const storeTokenToAsyncStorage = (token) =>
  AsyncStorage.setItem('lansystem-v1-token',token);

  /**
   * Store the token into device's async storage
   * @param  {string} token Token to be saved
   */
export const removeTokenFromAsyncStorage = () =>
  AsyncStorage.multiRemove(['lansystem-v1-token']);
