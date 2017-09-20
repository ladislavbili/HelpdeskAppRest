import { SET_UNITS, START_LOADING_ITEMS, SET_ITEM, SET_ITEMS, ADD_NEW_ITEM, DELETE_ITEM, EDIT_ITEM_LIST } from '../types';
import { UNITS_LIST, ITEMS_LIST,  } from '../urls';
import { Actions } from 'react-native-router-flux';

export const openAddingOfItem = (id) => {
  return (dispatch) => {
    fetch(UNITS_LIST, {
      method: 'GET',
    }).then((response)=> response.json().then(response => {
      dispatch({type: SET_UNITS, payload:{units:response}});
      Actions.itemAdd({id});
    }))
    .catch(function (error) {
      console.log(error);
    });
  };
};
export const startLoadingItems = () => {
  return (dispatch) => {
    dispatch({type: START_LOADING_ITEMS });
  };
};
export const openEditingOfItem = (id,projectID) => {
  return (dispatch) => {
    let url = ITEMS_LIST+ '/' + id;
    fetch(url, {
      method: 'GET',
    }).then((response)=> response.json().then(response => {
      dispatch({type: SET_ITEM, payload:{item:response}});
      Actions.itemEdit({projectID});
    }))
    .catch(function (error) {
      console.log(error);
    });
  };
};
export const getItemsAndUnits = () => {
  return (dispatch) => {
    Promise.all([
      fetch(ITEMS_LIST, {
        method: 'GET',
      }),
      fetch(UNITS_LIST, {
        method: 'GET',
      })
    ])
    .then(([response1,response2]) =>Promise.all([response1.json(),response2.json()]).then(([response1,response2]) => {
      dispatch({type: SET_ITEMS, payload:{items:response1,units:response2}});
    }))
    .catch(function (error) {
      console.log(error);
    });
  };
};
export const addItem = (item) => {
  return (dispatch) => {
    fetch(ITEMS_LIST, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body:JSON.stringify(item),
    }).then((response)=>response.json().then((response)=>{
      dispatch({type: ADD_NEW_ITEM, payload:{item:Object.assign({},item,{id:response.id})}});
    }))
    .catch(function (error) {
      console.log(error);
    });
  };
};
export const deleteItem = (id) => {
  return (dispatch) => {
    let url= ITEMS_LIST+ '/' + id
    fetch(url, {
      method: 'DELETE',
    }).then((response)=>response.json().then((response)=>{
      dispatch({type: DELETE_ITEM, payload:{id}});
    }))
    .catch(function (error) {
      console.log(error);
    });
  };
};
export const saveItemEdit = (item) => {
  return (dispatch) => {
    let url = ITEMS_LIST + '/' + item.id;
    fetch(url, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'PATCH',
      body:JSON.stringify(item),
    }).then((response)=>response.json().then((response)=>{
      console.log(response);
      dispatch({type: EDIT_ITEM_LIST, payload:{item}});
    }))
    .catch(function (error) {
      console.log(error);
    });
  };
};
