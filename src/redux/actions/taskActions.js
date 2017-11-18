import { SET_TASK_ATTRIBUTES, START_LOADING, SET_TASKS, SET_PROJECTS, EDIT_TASK_LIST, DELETE_TASK, START_LOADING_PROJECTS,
  START_LOADING_SEARCH,SET_SEARCH_ATTRIBUTES, SET_FILTERS, SET_LAST_TASK, ADD_TASKS,ADD_NEW_TASK
} from '../types';
import { PROJECT_LIST,USERS_LIST, COMPANIES_LIST, STATUSES_LIST, TASK_LIST, TAG_LIST, FILTER_LIST, HOST_URL} from '../urls';
import {processRESTinput} from '../../helperFunctions';
//All of these are actions, they return redux triggered functions, that have no return, just manipulate with the store

/**
  * Get's and adds more tasks to the task list
  * @param  {string} url   url used to get more tasks
  * @param  {string} token Token for the REST API
*/

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

/**
  * Adds completely new task
  * @param {Task} task  Object containing all of the new task information
  * @param {string} token Token for the REST API
*/
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
    }).catch(function (error) {
      console.log(error);
    });
  };
};

/**
  * Delete's task with the input ID
  * @param  {int} id    ID of the task that is supposed to be deleted
  * @param  {string} token Token for the REST API
*/
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

/**
 * Starts an indicator that the search component is loading
 */
export const startLoadingSearch = () => {
  return (dispatch) => {
    dispatch({type: START_LOADING_SEARCH });
  };
};

/**
 * Loads all of the attributes required by the search component
 * @param  {string} token Token for the REST API
 */
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

/**
 * Starts an indicator that the projects are loading
 */
export const startLoadingProjects = () => {
  return (dispatch) => {
    dispatch({type: START_LOADING_PROJECTS });
  };
};

/**
 * Get's all of the projects from the REST API, that are available
 * @param  {string} token Token for the REST API
 */

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

/**
 * Get all fiters available to the user
 * @param  {string} token Token for the REST API
 */
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

/**
 * Gets first batch of the tasks from the REST API that corresponds to the fiter's ID
 * @param  {string} token    Token for the REST API
 * @param  {string} listName name, that should be displayed above recieved list
 * @param  {int} filterId ID of the filter that should be set
 */
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

/**
 * Gets all tasks that corresponds to the set filter
 * @param  {string} token    Token for the REST API
 * @param  {string} listName name that should be displayed above recieved list
 * @param  {Object} filter   Object containing all of the filters
 */
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

/**
 * Gets task and all of it's attributes that are required for the task edit component to edit this task
 * @param  {int} id    Tasks ID
 * @param  {string} token Token for the REST API
 */
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

/**
 * Gets all of the attributes that are required for the task to be created
 * @param  {sting} token Token for the REST API
 */
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

/**
 * Starts an indicator that the tasks are loading
 */
export const startLoading = () => {
  return (dispatch) => {
    dispatch({type: START_LOADING });
  };
};

/**
 * Submitting of the editted task
 * @param  {Object} task  Object that contains all possible task attributes
 * @param  {int} id    ID of the modified task
 * @param  {string} token Token for the REST API
 */
export const editTask = (task,id,token) => {
  return (dispatch) => {
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
      dispatch({type: EDIT_TASK_LIST, payload:{taskInList:response.data} });
    }))
    .catch(function (error) {
      console.log(error);
    });
  };
};
