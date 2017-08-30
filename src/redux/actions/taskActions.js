import {SET_TASKS, SET_PROJECTS, SET_COMPANIES, SET_STATUSES, SET_USERS, SET_UNITS, SET_TASK, SET_TASKS_AND_PROJECTS,
  START_LOADING,SET_TASK_ATTRIBUTES, EDIT_TASK_LIST, ADD_TO_TASK_LIST, SET_COMMENTS, START_LOADING_COMMENTS,ADD_NEW_COMMENT } from '../types';
import {TASK_LIST, PROJECT_LIST,COMPANIES_LIST,STATUSES_LIST,USERS_LIST,UNITS_LIST, TASK, COMMENTS} from '../urls';

export const getComments = () => {
  return (dispatch) => {
    fetch(COMMENTS, {
      method: 'GET',
    }).then((response) =>response.json().then((response) => {
      dispatch({type: SET_COMMENTS, payload:{comments:response}});
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



export const getTasksAndProjects = () => {
  return (dispatch) => {
    Promise.all([
      fetch(TASK_LIST, {
        method: 'GET',
      }),
      fetch(PROJECT_LIST, {
        method: 'GET',
      })])
    .then(([response1,response2]) =>
    {
      Promise.all([response1.json(),response2.json()]).then(([data1,data2]) => {
        dispatch({type: SET_TASKS_AND_PROJECTS, payload:{tasks:data1,projects:data2}});
      }).catch(function (error) {
          console.log(error);
        });
    }
  ).catch(function (error) {
    console.log(error);
  });
  };
};

export const getTaskAttributes = (id) => {
  return (dispatch) => {
    let taskURL = TASK+'/?id='+id;
    Promise.all([
      fetch(USERS_LIST, {
        method: 'GET',
      }),
      fetch(COMPANIES_LIST, {
        method: 'GET',
      }),
      fetch(STATUSES_LIST, {
        method: 'GET',
      }),
      fetch(PROJECT_LIST, {
        method: 'GET',
      }),
      fetch(taskURL, {
        method: 'GET',
      })])
    .then(([response1,response2,response3,response4,response5]) =>
      {
        Promise.all([response1.json(),response2.json(),response3.json(),response4.json(),response5.json()]).then(([users,companies,statuses,projects,[task]]) => {
          dispatch({type: SET_TASK_ATTRIBUTES,payload:{users,companies,statuses,projects,task}});
        }).catch(function (error) {
            console.log(error);
          });
      }
    ).catch(function (error) {
      console.log(error);
    });
  };
};

export const getAttributes = () => {
  return (dispatch) => {
    Promise.all([
      fetch(USERS_LIST, {
        method: 'GET',
      }),
      fetch(COMPANIES_LIST, {
        method: 'GET',
      }),
      fetch(STATUSES_LIST, {
        method: 'GET',
      }),
      fetch(PROJECT_LIST, {
        method: 'GET',
      })])
    .then(([response1,response2,response3,response4]) =>
      {
        Promise.all([response1.json(),response2.json(),response3.json(),response4.json()]).then(([users,companies,statuses,projects]) => {
          dispatch({type: SET_TASK_ATTRIBUTES,payload:{users,companies,statuses,projects,task:{}}});
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

export const startLoadingComments = () => {
  return (dispatch) => {
    dispatch({type: START_LOADING_COMMENTS });
  };
};

export const getTasks = () => {
  return (dispatch) => {
    fetch(TASK_LIST, {
      method: 'GET',
    }).then((response) =>response.json().then((response) => {
      dispatch({type: SET_TASKS, payload:{tasks:response}});
    }))
    .catch(function (error) {
      console.log(error);
    });
  };
};

export const getTask = (id) => {
  return (dispatch) => {
    let url=TASK+'/?id='+id;
    fetch(url, {
      method: 'GET',
    }).then((response) =>response.json().then((response) => {
      dispatch({type: SET_TASK, payload:{task:response}});
    }))
    .catch(function (error) {
      console.log(url);
      console.log(error);
    });
  };
};
export const getProjects = () => {
  return (dispatch) => {
    fetch(PROJECT_LIST, {
      method: 'GET',
    }).then((response) =>response.json().then((response) => {
      dispatch({type: SET_PROJECTS, payload:{projects:response}});
    }))
    .catch(function (error) {
      console.log(error);
    });
  };
};
export const getCompanies = () => {
  return (dispatch) => {
    fetch(COMPANIES_LIST, {
      method: 'GET',
    }).then((response)=> response.json().then(response => {
      dispatch({type: SET_COMPANIES, payload:{companies:response}});
    }))
    .catch(function (error) {
      console.log(error);
    });
  };
};
export const getStatuses = () => {
  return (dispatch) => {
    fetch(STATUSES_LIST, {
      method: 'GET',
    }).then((response)=> response.json().then(response => {
      dispatch({type: SET_STATUSES, payload:{statuses:response}});
    }))
    .catch(function (error) {
      console.log(error);
    });
  };
};
export const getUsers = () => {
  return (dispatch) => {
    fetch(USERS_LIST, {
      method: 'GET',
    }).then((response)=> response.json().then(response => {
      dispatch({type: SET_USERS, payload:{users:response}});
    }))
    .catch(function (error) {
      console.log(error);
    });
  };
};
export const getUnits = () => {
  return (dispatch) => {
    fetch(UNITS_LIST, {
      method: 'GET',
    }).then((response)=> response.json().then(response => {
      dispatch({type: SET_UNITS, payload:{units:response}});
    }))
    .catch(function (error) {
      console.log(error);
    });
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
    Promise.all([
      fetch(TASK, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body:JSON.stringify(task),
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
