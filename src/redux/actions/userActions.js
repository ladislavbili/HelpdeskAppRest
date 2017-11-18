import { SET_USER_ATTRIBUTES, ADD_USER, EDIT_USER_LIST, SET_USERS, START_LOADING_USER } from '../types';
import { COMPANIES_LIST,ROLES_LIST, USERS_LIST } from '../urls';
import {processRESTinput,processDataWithPrefix} from '../../helperFunctions';
import queryString from 'query-string';
//All of these are actions, they return redux triggered functions, that have no return, just manipulate with the store

/**
 * Set's user loading to true
 */
export const startLoadingUser = () => {
  return (dispatch) => {
    dispatch({type: START_LOADING_USER });
  };
};

/**
 * Get's all attributes needed for the user adding
 * @param  {string} token Token for the REST API
 */
 export const getUserAttributes = (token) => {
  return (dispatch) => {
    Promise.all([
      fetch(COMPANIES_LIST+'?limit=999', {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token
        }
      }),
      fetch(ROLES_LIST+'?limit=999', {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token
        }
      })
    ]).then(([response1,response2])=>Promise.all([response1.json(),response2.json()]).then(([response1,response2])=>{
      dispatch({type: SET_USER_ATTRIBUTES, payload:{companies:response1.data,user_roles:response2.data,user:null}});
    }))
    .catch(function (error) {
      console.log(error);
    });
  };
};

/**
  * Adds new user
 * @param {User} user       Object containing all of the user data except for the detailData
 * @param {DetailData} detailData Object that contains all of the userData
 * @param {int} company     ID of the users company
 * @param {int} role        ID of the users role
 * @param {string} token      Token for the REST API
 */
export const addUser = (user,detailData,company,role,token) => {
  return (dispatch) => {
    let userREST=processRESTinput(user);
    let extraREST= processDataWithPrefix(detailData,'detail_data');
    let RESTData = userREST.length==0?extraREST:(extraREST.length==0?userREST:userREST+'&'+extraREST);

      fetch(USERS_LIST + '/user-role/' + role + '/company/' + company, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Bearer ' + token
        },
        method: 'POST',
        body:RESTData,
      })
    .then((response)=>{
    response.json().then((response)=>{
      dispatch({type: ADD_USER, payload:{user:response.data}});
    })})
    .catch(function (error) {
      console.log(error);
    });

  };
};

/**
 * Get's all of the visible users
 * @param  {[type]} token Token for the REST API
 */
export const getUsers = (token) => {
  return (dispatch) => {
    fetch(USERS_LIST+'?limit=999', {
      method: 'GET',
      headers: {
          'Authorization': 'Bearer ' + token
      }
    }).then((response)=> response.json().then(response => {
      dispatch({type: SET_USERS, payload:{users:response.data}});
    }))
    .catch(function (error) {
      console.log(error);
    });
  };
};
/**
  * Get's user and all needed data to open user editting
 * @param  {int} id    User ID
 * @param  {[type]} token Token for the REST API
 */
export const getUser = (id,token) => {
  return (dispatch) => {
    Promise.all([
      fetch(COMPANIES_LIST+'?limit=999', {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token
        }
      }),
      fetch(ROLES_LIST+'?limit=999', {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token
        }
      }),
      fetch(USERS_LIST+'/'+id, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token
        }
      }),
    ]).then(([response1,response2,response3])=>Promise.all([response1.json(),response2.json(),response3.json()]).then(([response1,response2,response3])=>{
      dispatch({type: SET_USER_ATTRIBUTES, payload:{companies:response1.data,user_roles:response2.data,user:response3.data}});
    }))
    .catch(function (error) {
      console.log(error);
    });
  };
};

/**
 * Saves editted user
 * @param  {UserData} userData   Complete user data, used only for optimistic response
 * @param {User} user       Object containing all of the user data except for the detailData
 * @param {DetailData} detailData Object that contains all of the userData
 * @param {int} company     ID of the users company
 * @param {int} role        ID of the users role
 * @param {string} token      Token for the REST API
 */
export const editUser = (userData,user,detailData,company,role,token) => {
  return (dispatch) => {
    let userREST=processRESTinput(user);
    let extraREST= processDataWithPrefix(detailData,'detail_data');
    let RESTData = userREST.length==0?extraREST:(extraREST.length==0?userREST:userREST+'&'+extraREST);
    Promise.all([
      fetch(USERS_LIST + '/' + userData.id, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Bearer ' + token
        },
        method: 'PUT',
        body:RESTData,
      }),
      fetch(USERS_LIST + '/' + userData.id + '/company/' + company, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Bearer ' + token
        },
        method: 'PUT',
        body:RESTData,
      }),
      fetch(USERS_LIST + '/' + userData.id + '/user-role/' + role, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Bearer ' + token
        },
        method: 'PUT',
        body:RESTData,
      }),

    ])
    .then(([response1,response2,response3])=>{
    Promise.all([response1.json(),response2.json(),response3.json()]).then(([response1,response2,response3])=>{
      dispatch({type: EDIT_USER_LIST, payload:{user:userData}});
    })})
    .catch(function (error) {
      console.log(error);
    });

  };
};
