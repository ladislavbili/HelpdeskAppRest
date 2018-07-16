import { SET_USERS, SET_LOADING_USERS, SET_USER_ATTRIBUTES, ADD_USER, EDIT_USER_LIST, START_LOADING_USER, SET_ASSIGNERS } from '../types';
import { COMPANIES_LIST,ROLES_LIST, USERS_LIST, ASSIGNERS_LIST } from '../urls';
import {processRESTinput,processDataWithPrefix} from '../../helperFunctions';
import queryString from 'query-string';
//All of these are actions, they return redux triggered functions, that have no return, just manipulate with the store

/**
 * Set's user loading to true
 */
export const setUsersLoading = (usersLoaded) => {
  return (dispatch) => {
    dispatch({type: SET_LOADING_USERS,usersLoaded });
  };
};

/**
* Get's all of the visible users
* @param  {[type]} token Token for the REST API
*/
export const getUsers= (updateDate,token) => {
  return (dispatch) => {
    fetch(USERS_LIST+'/all'+(updateDate?'/'+updateDate:''), {
      method: 'get',
      headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
      }
    }).then((response) =>{
      if(!response.ok){
        return;
      }
      response.json().then((data) => {
        dispatch({type: SET_USERS, users:data.data,updateDate:data.date.toString()});
        dispatch({ type: SET_LOADING_USERS, usersLoaded:true });
      });
    }
  ).catch(function (error) {
    console.log(error);
  });
}
}

/**
 * Get's all available users that can solve this project
 * @param  {string} token     Token for the REST API
 * @param  {int} projectID ID of the project
 */
export const getAssigners = (token,projectID) => {
  return (dispatch) => {
    fetch(ASSIGNERS_LIST+'/'+projectID, {
      method: 'GET',
      headers: {
          'Authorization': 'Bearer ' + token
      }
    }).then((response)=> response.json().then(response => {
      dispatch({type: SET_ASSIGNERS, payload:{assigners:response.assigner}});
    }))
    .catch(function (error) {
      console.log(error);
    });
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
