import { SET_UNITS, START_LOADING_ITEMS, SET_ITEM, SET_ITEMS, ADD_NEW_ITEM, DELETE_ITEM, EDIT_ITEM_LIST } from '../types';
import { UNITS_LIST, TASK_LIST  } from '../urls';
import { Actions } from 'react-native-router-flux';
import {processRESTinput} from '../../helperFunctions';
//All of these are actions, they return redux triggered functions, that have no return, just manipulate with the store

export const startLoadingItems = () => {
  return (dispatch) => {
    dispatch({type: START_LOADING_ITEMS });
  };
};
export const getItemsAndUnits = (id,token) => {
  return (dispatch) => {
    Promise.all([
      fetch(TASK_LIST+'/'+id+'/invoiceable-items'+'?limit=999', {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + token
        }
      }),
      fetch(UNITS_LIST+'?limit=999', {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + token
        }
      })
    ])
    .then(([response1,response2]) =>Promise.all([response1.json(),response2.json()]).then(([response1,response2]) => {
      dispatch({type: SET_ITEMS, payload:{items:response1.data,units:response2.data}});
    }))
    .catch(function (error) {
      console.log(error);
    });
  };
};
export const addItem = (item,taskId,unitId,token) => {
  return (dispatch) => {
    requestBody=processRESTinput(item);
    if(item.amount==0){
      requestBody+='&amount=0';
    }
    if(item.unit_price==0){
      requestBody+='&unit_price=0';
    }
    fetch(TASK_LIST+'/'+taskId+'/invoiceable-items/unit/'+unitId, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Bearer ' + token
      },
      method: 'POST',
      body:requestBody,
    }).then((response)=>{
      response.json().then((response2)=>{
      }).catch((error)=>console.log(error));
      dispatch({type: ADD_NEW_ITEM, payload:{items:response.data.invoiceableItems}});
    })
    .catch(function (error) {
      console.log(error);
    });
  };
};

export const deleteItem = (id,taskId,token) => {
  return (dispatch) => {
    let url= TASK_LIST+'/'+taskId+'/invoiceable-items/'+id
    fetch(url, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + token
      },
    }).then((response)=>{
      dispatch({type: DELETE_ITEM, payload:{id}});
    })
    .catch(function (error) {
      console.log(error);
    });
  };
};

export const getUnits = (token) => {
  return (dispatch) => {
    fetch(UNITS_LIST+'?limit=999', {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }).then((response)=>response.json().then((response)=>{
      dispatch({type: SET_UNITS, payload:{units:response.data}});
    }))
    .catch(function (error) {
      console.log(error);
    });

  };
};
export const saveItemEdit = (item,id,unitId,taskId,token) => {
  return (dispatch) => {
    let url = TASK_LIST+'/'+taskId+'/invoiceable-items/'+id+'/unit/'+unitId;
    fetch(url, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Bearer ' + token
      },
      method: 'PATCH',
      body:processRESTinput(item),
    }).then((response)=>response.json().then((response)=>{
      dispatch({type: EDIT_ITEM_LIST, payload:{item:Object.assign({},item,{id,unit:{id:unitId}})}});
    }))
    .catch(function (error) {
      console.log(error);
    });
  };
};
