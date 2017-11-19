import { SET_COMMENTS, ADD_NEW_COMMENT, START_LOADING_COMMENTS } from '../types';
import { TASK_LIST } from '../urls';
import {processRESTinput} from '../../helperFunctions';
//All of these are actions, they return redux triggered functions, that have no return, just manipulate with the store

/**
  * Get's all of the task comments
  * @param  {int} id    ID of the task
  * @param  {string} token Token for the REST API
*/
export const getComments = (id,token) => {
  return (dispatch) => {
    fetch(TASK_LIST+'/'+id+'/comments'+'?limit=999', {
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

/**
  * Adds a new comment to the task
  * @param {Comment} comment Object containing all of the informations about the comment
  * @param {int} id      ID of the task
  * @param {string} token   Token for the REST API
*/
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

/**
  * Starts an indicator that the comments are loading
*/
export const startLoadingComments = () => {
  return (dispatch) => {
    dispatch({type: START_LOADING_COMMENTS });
  };
};
