import { SET_USER_ATTRIBUTES, ADD_USER, EDIT_USER_LIST, SET_USERS, START_LOADING_USER } from '../types';
import { COMPANIES_LIST,ROLES_LIST, USERS_LIST } from '../urls';
import {processRESTinput,processDataWithPrefix} from '../../helperFunctions';

export const startLoadingUser = () => {
  return (dispatch) => {
    dispatch({type: START_LOADING_USER });
  };
};

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
export const getUser = (id,token) => {
  return (dispatch) => {
    Promise.all([
      fetch(COMPANIES_LIST, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token
        }
      }),
      fetch(ROLES_LIST, {
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
export const addUser = (newUser,listUser) => {
  return (dispatch) => {
    Promise.all([
      fetch(USERS_LIST, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body:JSON.stringify(listUser),
      }),
      fetch(USER, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body:JSON.stringify(newUser),
      })
    ]).then(([response1,response2])=>Promise.all([response1.json(),response2.json()]).then(([response1,response2])=>{
      dispatch({type: ADD_USER, payload:{user:Object.assign({},listUser,{id:response2.id})}});
    }))
    .catch(function (error) {
      console.log(error);
    });
  };
};
export const openAddingOfUser = () => {
  return (dispatch) => {
    Promise.all([
      fetch(COMPANIES_LIST, {
        method: 'GET',
      }),
      fetch(USER_ROLES, {
        method: 'GET',
      })
    ]).then(([response1,response2])=>Promise.all([response1.json(),response2.json()]).then(([response1,response2])=>{
      dispatch({type: SET_USER_ATTRIBUTES, payload:{companies:response1,user_roles:response2}});
    }))
    .catch(function (error) {
      console.log(error);
    });
  };
};

export const editUser = (userData,user,detailData,company,role,token) => {
  return (dispatch) => {
    let userREST=processRESTinput(user);
    let extraREST= processDataWithPrefix(detailData,'detailData');
    let RESTData = userREST.length==0?extraREST:(extraREST.length==0?userREST:userREST+'&'+extraREST);
      fetch(USERS_LIST + '/' + userData.id, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Bearer ' + token
        },
        method: 'PATCH',
        body:RESTData,
      })
    .then((response)=>{
      console.log(response);
      console.log(USERS_LIST + '/' + userData.id);
      //dispatch({type: EDIT_USER_LIST, payload:{user:userData}});
    })
    .catch(function (error) {
      console.log(error);
    });

  };
};
