import {LOGIN_START, LOGIN_SUCCESS, LOGIN_FAIL, LOGIN_LOGOUT, START_LOADING, START_LOADING_PROJECTS } from '../types';
import {LOGIN_URL} from '../urls';
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
          let user={
            ACL:[
              'sent_emails_from_comments',
              'create_tasks_in_all_projects',
              'update_all_tasks',
              'user_settings',
              'company_settings'
            ],
            name:'ABC',
            surname:'DEF',
            username,
            email:'abc@gmail.com'
          }
          if(JSONresponse.ok){
            storeTokenToAsyncStorage(response.token);
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
