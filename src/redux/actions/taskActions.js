import { SET_TASK_ATTRIBUTES, START_LOADING, SET_TASKS, SET_PROJECTS, EDIT_TASK_LIST, DELETE_TASK, START_LOADING_PROJECTS,
  START_LOADING_SEARCH,SET_SEARCH_ATTRIBUTES, SET_FILTERS, SET_LAST_TASK, ADD_TASKS,ADD_NEW_TASK
  } from '../types';
import { PROJECT_LIST,USERS_LIST, COMPANIES_LIST, STATUSES_LIST, TASK_LIST, TAG_LIST, FILTER_LIST, HOST_URL} from '../urls';
import {processRESTinput} from '../../helperFunctions';
export const getMoreTasks = (url,token) => {
    return (dispatch) => {
      fetch(HOST_URL+url, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token
        }
      }).then((response) =>{
        response.json().then((data) => {
          dispatch({type: ADD_TASKS, payload:{tasks:data.data,nextTasks:data._links.next,url}});
        });
      }
    ).catch(function (error) {
      console.log(error);
    });
    };
}

export const addTask = (task,token) => {
  return (dispatch) => {
      fetch(TASK_LIST, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Bearer ' + token
        },
        method: 'POST',
        body:processRESTinput(task),
      }).then((response) =>{
        response.json().then((data) => {
          dispatch({type: ADD_NEW_TASK, payload:{task:data.data}});
        });
      }
    ).catch(function (error) {
      console.log(error);
    });
  };
};
export const deleteTask = (id,token) => {
  return (dispatch) => {
    fetch( TASK_LIST+ '/' + id, {
      method: 'DELETE',
      headers: {
          'Authorization': 'Bearer ' + token
      }
    })
    .then((response)=>{
      dispatch({type: DELETE_TASK, payload:{id}});
    })
    .catch(function (error) {
      console.log(error);
    });
  };
};

export const startLoadingSearch = () => {
  return (dispatch) => {
    dispatch({type: START_LOADING_SEARCH });
  };
};

export const getSearchAttributes = (token) => {
  return (dispatch) => {
    Promise.all([
      fetch(USERS_LIST+'?limit=999', {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token
        }
      }),
      fetch(COMPANIES_LIST+'?limit=999', {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token
        }
      }),
      fetch(STATUSES_LIST+'?limit=999', {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token
        }
      }),
      fetch(PROJECT_LIST+'?limit=999', {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token
        }
      }),
      fetch(TAG_LIST+'?limit=999', {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token
        }
      })])
    .then(([response1,response2,response3,response4,response5]) =>
      {
        Promise.all([response1.json(),response2.json(),response3.json(),response4.json(),response5.json()]).then(([users,companies,statuses,projects,labels]) => {
          dispatch({type: SET_SEARCH_ATTRIBUTES,payload:{users:users.data,companies:companies.data,statuses:statuses.data,projects:projects.data,labels:labels.data}});
        }).catch(function (error) {
            console.log(error);
          });
      }
    ).catch(function (error) {
      console.log(error);
    });
  };
};


export const startLoadingProjects = () => {
  return (dispatch) => {
    dispatch({type: START_LOADING_PROJECTS });
  };
};
export const getProjects = (token) => {
  return (dispatch) => {
    fetch(PROJECT_LIST+'?limit=999', {
      method: 'GET',
      headers: {
          'Authorization': 'Bearer ' + token
      }
    }).then((response) =>{
      response.json().then((data) => {
        dispatch({type: SET_PROJECTS, payload:{projects:data.data}});
      });
    }
  ).catch(function (error) {
    console.log(error);
  });
  };
}

export const getFilters = (token) => {
  return (dispatch) => {
    fetch(FILTER_LIST+'?limit=999', {
      method: 'GET',
      headers: {
          'Authorization': 'Bearer ' + token
      }
    }).then((response) =>{
      response.json().then((data) => {
        dispatch({type: SET_FILTERS, filters:data.data});
      });
    }
  ).catch(function (error) {
    console.log(error);
  });
  };
}

export const getFilteredTasks = (token,listName,filterId) => {
  return (dispatch) => {
    fetch(TASK_LIST+'/filter/'+filterId, {
      method: 'GET',
      headers: {
          'Authorization': 'Bearer ' + token
      }
    }).then((response) =>{
      response.json().then((data) => {
        dispatch({type: SET_TASKS, payload:{tasks:data.data,nextTasks:data._links.next,listName}});
      });
    }
  ).catch(function (error) {
    console.log(error);
  });
  };
}

export const getTasks = (token,listName,filter) => {
  return (dispatch) => {
    fetch(TASK_LIST+'?'+processRESTinput(filter), {
      method: 'GET',
      headers: {
          'Authorization': 'Bearer ' + token
      }
    }).then((response) =>{
      response.json().then((data) => {
        dispatch({type: SET_TASKS, payload:{tasks:data.data,nextTasks:data._links.next,listName}});
      });
    }
  ).catch(function (error) {
    console.log(error);
  });
  };
}
export const getTaskAttributes = (id, token) => {
  return (dispatch) => {
    let taskURL = TASK_LIST+'/'+id;
    Promise.all([
      fetch(USERS_LIST+'?limit=999', {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token
        }
      }),
      fetch(COMPANIES_LIST+'?limit=999', {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token
        }
      }),
      fetch(STATUSES_LIST+'?limit=999', {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token
        }
      }),
      fetch(PROJECT_LIST+'?limit=999', {
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
      fetch(TAG_LIST+'?limit=999', {
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
      fetch(USERS_LIST+'?limit=999', {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token
        }
      }),
      fetch(COMPANIES_LIST+'?limit=999', {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token
        }
      }),
      fetch(STATUSES_LIST+'?limit=999', {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token
        }
      }),
      fetch(PROJECT_LIST+'?limit=999', {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token
        }
      }),
      fetch(TAG_LIST+'?limit=999', {
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
export const editTask = (task,id,token) => {
  return (dispatch) => {
    console.log(processRESTinput(task));
    console.log(id);
      fetch(TASK_LIST+'/quick-update/'+id, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Bearer ' + token
        },
        method: 'PATCH',
        body:processRESTinput(task),
      })
    .then((response) =>response.json().then((response)=>{
      console.log(response);
      dispatch({type: EDIT_TASK_LIST, payload:{taskInList:Object.assign({},response.data,{id})} });
    }))
    .catch(function (error) {
      console.log(error);
    });
  };
};
