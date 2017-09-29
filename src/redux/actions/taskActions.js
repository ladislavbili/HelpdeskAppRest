import { SET_TASKS_AND_PROJECTS, SET_TASK_ATTRIBUTES, START_LOADING, SET_TASKS, EDIT_TASK_LIST, ADD_TO_TASK_LIST, DELETE_TASK } from '../types';
import { PROJECT_LIST,USERS_LIST, COMPANIES_LIST, STATUSES_LIST, TASK_LIST, TAG_LIST } from '../urls';

export const getTasksAndProjects = (token) => {
  return (dispatch) => {
    Promise.all([
      fetch(TASK_LIST, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token
        }
      }),
      fetch(PROJECT_LIST, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token
        }
      })])
    .then(([response1,response2]) =>
    {
      Promise.all([response1.json(),response2.json()]).then(([data1,data2]) => {
        dispatch({type: SET_TASKS_AND_PROJECTS, payload:{tasks:data1.data,projects:data2.data}});
      }).catch(function (error) {
          console.log(error);
        });
    }
  ).catch(function (error) {
    console.log('Failed to load projects and tasks');
    console.log(error);
  });
  };
};
export const getTaskAttributes = (id, token) => {
  return (dispatch) => {
    let taskURL = TASK_LIST+'/'+id;
    Promise.all([
      fetch(USERS_LIST, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token
        }
      }),
      fetch(COMPANIES_LIST, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token
        }
      }),
      fetch(STATUSES_LIST, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token
        }
      }),
      fetch(PROJECT_LIST, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token
        }
      }),
      fetch(taskURL, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token
        }
      }),
      fetch(TAG_LIST, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token
        }
      })])
    .then(([response1,response2,response3,response4,response5,response6]) =>
      {
        Promise.all([response1.json(),response2.json(),response3.json(),response4.json(),response5.json(),response6.json()]).then(([users,companies,statuses,projects,task,labels]) => {
          dispatch({type: SET_TASK_ATTRIBUTES,payload:{users:users.data,companies:companies.data,statuses:statuses.data,projects:projects.data,task:task.data,labels:labels.data}});
        }).catch(function (error) {
            console.log(error);
          });
      }
    ).catch(function (error) {
      console.log(error);
    });
  };
};
export const getAttributes = (token) => {
  return (dispatch) => {
    Promise.all([
      fetch(USERS_LIST, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token
        }
      }),
      fetch(COMPANIES_LIST, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token
        }
      }),
      fetch(STATUSES_LIST, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token
        }
      }),
      fetch(PROJECT_LIST, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token
        }
      }),
      fetch(TAG_LIST, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token
        }
      })])
    .then(([response1,response2,response3,response4,response5]) =>
      {
        Promise.all([response1.json(),response2.json(),response3.json(),response4.json(),response5.json()]).then(([users,companies,statuses,projects,labels]) => {
          dispatch({type: SET_TASK_ATTRIBUTES,payload:{users:users.data,companies:companies.data,statuses:statuses.data,projects:projects.data,labels:labels.data,task:{}}});
        }).catch(function (error) {
            console.log(error);
          });
      }
    ).catch(function (error) {
      console.log(error);
    });
  };
};
export const startLoading = () => {
  return (dispatch) => {
    dispatch({type: START_LOADING });
  };
};
export const saveEdit = (task,assignedTo,project,status) => {
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
    .then((responses) =>
      dispatch({type: EDIT_TASK_LIST, payload:{taskInList:Object.assign({},task,{assignedTo,project,status})} })
    )
    .catch(function (error) {
      console.log(error);
    });
  };
};
export const addTask = (task,assignedTo,project,status) => {
  return (dispatch) => {
    let ACL = {
      create_task: true,
      resolve_task: true,
      delete_task: true,
      view_internal_note: false
    };
    Promise.all([
      fetch(TASK, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body:JSON.stringify(Object.assign({},task,{ACL})),
      }),
      fetch(TASK_LIST, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'POST',

        body:JSON.stringify(Object.assign({},task,{assignedTo,project,status})),
      })
    ])
    .then(([response1,response2]) =>Promise.all([response1.json(),response2.json()]).then(([response1,response2]) =>{
      dispatch({type: ADD_TO_TASK_LIST, payload:{taskInList:Object.assign({},task,{assignedTo,id:response1.id,project,status})} });
      }
    ))
    .catch(function (error) {
      console.log(error);
    });
  };
};
export const deleteTask = (id) => {
  return (dispatch) => {
    let taskListURL= TASK_LIST+ '/' + id
    let taskURL= TASK+ '/' + id
    Promise.all([
      fetch(taskListURL, {
        method: 'DELETE',
      }),
      fetch(taskURL, {
        method: 'DELETE',
      })
    ]).then(([response1,response2])=>Promise.all([response1.json(),response2.json()]).then(([response1,response2])=>{
      dispatch({type: DELETE_TASK, payload:{id}});
    }))
    .catch(function (error) {
      console.log(error);
    });
  };
};
