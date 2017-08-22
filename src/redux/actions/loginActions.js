import {LOGIN_START, LOGIN_SUCCESS, LOGIN_FAIL, LOGIN_LOGOUT,
  SET_LOADING, SET_TASKS, SET_PROJECTS, SET_COMPANIES, SET_STATUSES, SET_USERS, SET_UNITS } from '../types';
import {LOGIN_URL,TASK_LIST, PROJECT_LIST} from '../urls';
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
            loginUserSuccess(dispatch, {user:{name:username,token:response.token}});
            dispatch({type:SET_LOADING});
            Actions.taskList();
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

export const getTasks = (token,projectId) => {
  let url=TASK_LIST;
  if(projectId){
    url+='&project='+projectId;
  }
  return (dispatch) => {
    dispatch({type:SET_LOADING});
    Promise.all([fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token
        }
      }),
    fetch(PROJECT_LIST, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token
        }
      })]).then(JSONresults=>{
       Promise.all([JSONresults[0].json(),JSONresults[1].json()]).then(results=>{
         dispatch(
           type:SET_TASKS,
           payload:{tasks:results[0].data,tasksMeta:{total:results[0].total,page:results[0].page,numberOfPages:results[0].numberOfPages},projects:results[1].data,projectsMeta:{total:results[0].total,page:results[0].page,numberOfPages:results[0].numberOfPages}})
       })
      })
      .catch(function (error) {
        console.log(error);
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
