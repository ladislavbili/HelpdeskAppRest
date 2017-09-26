import { EDIT_TASK_LIST, CLEAR_SEARCHED_TASKS, SET_SEARCHED_FILTER, SET_SEARCHED_TASKS } from '../types';
import { TASK, TASK_LIST } from '../urls';

export const saveFilteredEdit = (task,assignedTo,project,status, word, filter) => {
  return (dispatch) => {
    let taskURL = TASK + '/'+ task.id;
    let taskListURL = TASK_LIST + '/'+ task.id;
    Promise.all([
      fetch(taskURL, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'PATCH',
        body:JSON.stringify(task),
      }),
      fetch(taskListURL, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'PATCH',
        body:JSON.stringify(Object.assign({},task,{assignedTo,project,status})),
      })
    ])
    .then((responses) =>{
      dispatch({type: EDIT_TASK_LIST, payload:{taskInList:Object.assign({},task,{assignedTo,project,status})} });
      dispatch({type: CLEAR_SEARCHED_TASKS});
      dispatch({type: SET_SEARCHED_FILTER, payload:{filter,word}});

      fetch(TASK_LIST, {
        method: 'GET',
      }).then((response)=>response.json().then((response)=>{
        dispatch({type: SET_SEARCHED_TASKS, payload:{tasks:response}});
      }))
      .catch(function (error) {
        console.log(error);
      });
      }
    )
    .catch(function (error) {
      console.log(error);
    });
  };
};
export const searchTasks = (filter, word) => {
  return (dispatch) => {
    dispatch({type: CLEAR_SEARCHED_TASKS});
    dispatch({type: SET_SEARCHED_FILTER, payload:{filter,word}});

    fetch(TASK_LIST, {
      method: 'GET',
    }).then((response)=>response.json().then((response)=>{
      dispatch({type: SET_SEARCHED_TASKS, payload:{tasks:response}});
    }))
    .catch(function (error) {
      console.log(error);
    });

  };
};
