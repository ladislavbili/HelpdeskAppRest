import { SET_USER_ATTRIBUTES, ADD_USER, EDIT_USER_LIST, SET_USERS } from '../types';
import { COMPANIES_LIST,USER_ROLES,USER, USERS_LIST } from '../urls';
import { Actions } from 'react-native-router-flux';

export const getUsers = (token) => {
  return (dispatch) => {
    fetch(USERS_LIST, {
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
export const openEditingOfUser = (id) => {
  return (dispatch) => {
    Promise.all([
      fetch(COMPANIES_LIST, {
        method: 'GET',
      }),
      fetch(USER_ROLES, {
        method: 'GET',
      }),
      fetch(USER+'/'+id, {
        method: 'GET',
      }),
    ]).then(([response1,response2,response3])=>Promise.all([response1.json(),response2.json(),response3.json()]).then(([response1,response2,response3])=>{
      dispatch({type: SET_USER_ATTRIBUTES, payload:{companies:response1,user_roles:response2,user:response3}});
      Actions.userEdit();
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
      Actions.userAdd();
    }))
    .catch(function (error) {
      console.log(error);
    });
  };
};
export const editUser = (user,listUser) => {
  return (dispatch) => {
    let listURL = USERS_LIST + '/' + listUser.id;
    let userURL = USER + '/' + listUser.id;
    Promise.all([
      fetch(listURL, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'PATCH',
        body:JSON.stringify(listUser),
      }),
      fetch(userURL, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'PATCH',
        body:JSON.stringify(user),
      })
    ])
    .then(([response1,response2])=>Promise.all([response1.json(),response2.json()]).then(([response1,response2])=>{
      dispatch({type: EDIT_USER_LIST, payload:{user:listUser}});
    }))
    .catch(function (error) {
      console.log(error);
    });
  };
};
