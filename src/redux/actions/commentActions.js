import { SET_COMMENTS, ADD_NEW_COMMENT, START_LOADING_COMMENTS } from '../types';
import { TASK_LIST } from '../urls';
import {processRESTinput} from '../../helperFunctions';

export const getComments = (id,token) => {
  return (dispatch) => {
    fetch(TASK_LIST+'/'+id+'/comments', {
      method: 'GET',
      headers: {
          'Authorization': 'Bearer ' + token
      }
    }).then((response) =>response.json().then((response2) => {
      dispatch({type: SET_COMMENTS, payload:{comments:response2.data}});
    }))
    .catch(function (error) {
      console.log(error);
    });
  };
};
export const addComment = (comment,id,token) => {
  return (dispatch) => {
    fetch(TASK_LIST+'/'+id+'/comments', {
      method: 'POST',
      headers: {
          'Authorization': 'Bearer ' + token,
          'Content-Type': 'application/x-www-form-urlencoded'
      },
      body:processRESTinput(comment),
    }).then((response)=>response.json().then((response)=>{
      dispatch({type: ADD_NEW_COMMENT, payload:{comment:response.data}});
    }))
  };
};

export const startLoadingComments = () => {
  return (dispatch) => {
    dispatch({type: START_LOADING_COMMENTS });
  };
};
