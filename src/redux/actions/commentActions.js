import { SET_COMMENTS, ADD_NEW_COMMENT, START_LOADING_COMMENTS } from '../types';
import { TASK_LIST } from '../urls';

export const getComments = (id,token) => {
  return (dispatch) => {
    fetch(TASK_LIST+'/'+id+'/comments', {
      method: 'GET',
      headers: {
          'Authorization': 'Bearer ' + token
      }
    }).then((response) =>response.json().then((response) => {
      dispatch({type: SET_COMMENTS, payload:{comments:response.data}});
    }))
    .catch(function (error) {
      console.log(error);
    });
  };
};
export const addComment = (comment) => {
  return (dispatch) => {
    fetch(COMMENTS, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body:JSON.stringify(comment),
    }).then((response)=>response.json().then((response)=>{
      dispatch({type: ADD_NEW_COMMENT, payload:{comment:Object.assign({},comment,{id:response.id})}});
    }))
  };
};
export const startLoadingComments = () => {
  return (dispatch) => {
    dispatch({type: START_LOADING_COMMENTS });
  };
};
