import { SET_TASKS, SET_LOADING_TASKS,ADD_TASKS,SET_OPENED_ID, SET_TASK_STATUSES_LOADING,SET_TASK_STATUSES,SET_TASK_PROJECTS_LOADING,SET_TASK_PROJECTS,
  SET_TASK_COMPANIES_LOADING,SET_TASK_COMPANIES,SET_TASK_UNITS_LOADING,SET_TASK_UNITS,SET_TASK_TAGS_LOADING,SET_TASK_TAGS,SET_TASK_SOLVERS,
  //
  SET_TASK_ATTRIBUTES, START_LOADING, SET_PROJECTS, EDIT_TASK_LIST, DELETE_TASK, START_LOADING_PROJECTS,
  START_LOADING_SEARCH,SET_SEARCH_ATTRIBUTES, SET_FILTERS, SET_LAST_TASK, ADD_NEW_TASK
} from '../types';
import { PROJECTS_LIST,USERS_LIST, COMPANIES_LIST, STATUSES_LIST, TASK_LIST, TAG_LIST, FILTER_LIST, HOST_URL , UNITS_LIST, TAGS_LIST, PROJECT_URL} from '../urls';
import {processRESTinput} from '../../helperFunctions';
//All of these are actions, they return redux triggered functions, that have no return, just manipulate with the store

/**
 * Set's user loading to true
 */
export const setTasksLoading = (tasksLoaded) => {
  return (dispatch) => {
    dispatch({type: SET_LOADING_TASKS,tasksLoaded });
  };
};

/**
 * Gets all tasks that corresponds to the set filter
 * @param  {string} token    Token for the REST API
 * @param  {string} listName name that should be displayed above recieved list
 * @param  {Object} filter   Object containing all of the filters
 */
export const getTasks = (filter,token) => {
  return (dispatch) => {
    fetch(TASK_LIST+'?'+processRESTinput(filter)+'&order=status=%3Easc', {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }).then((response) =>{
      response.json().then((data) => {
        dispatch({type: SET_TASKS, tasks:data.data,nextTasks:data._links.next?data._links.next+'&order=status=%3Easc':false});
      });
    }
  ).catch(function (error) {
    console.log(error);
  });
};
}

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
        dispatch({type: ADD_TASKS, tasks:data.data,nextTasks:data._links.next?data._links.next+'&order=status=%3Easc':false,url});
      });
    }
  ).catch(function (error) {
    console.log(error);
  });
};
}

/**
 * Gets all tasks available with no pagination
 * @param {string} token universal token for API comunication
 */
 export const getFilterTasks= (id,token) => {
   return (dispatch) => {
       fetch(TASK_LIST+'/filter/'+id+'?order=status=%3Easc', {
         method: 'get',
         headers: {
           'Authorization': 'Bearer ' + token,
           'Content-Type': 'application/json'
         }
       }).then((response) =>{
         if(!response.ok){
           return;
         }
       response.json().then((data) => {
         dispatch({type: SET_TASKS, tasks:data.data,nextTasks:data._links.next?data._links.next+'&order=status=%3Easc':false});
       });
     }
   ).catch(function (error) {
     console.log(error);
   });
 }
 }

 export const setOpenedID = (openedID) => {
   return (dispatch) => {
     dispatch({type: SET_OPENED_ID,openedID });
   };
 };


 export const setTaskStatusesLoading = (taskStatusesLoaded) => {
   return (dispatch) => {
     dispatch({ type: SET_TASK_STATUSES_LOADING, taskStatusesLoaded });
   }
 };
 /**
  * Gets all statuses available with no pagination
  * @param {string} token universal token for API comunication
  */
 export const getTaskStatuses= (updateDate,token) => {
   return (dispatch) => {
       fetch(STATUSES_LIST+'/all'+(updateDate?'/'+updateDate:''), {
         method: 'get',
         headers: {
           'Authorization': 'Bearer ' + token,
           'Content-Type': 'application/json'
         }
       }).then((response) =>{
         if(!response.ok){
           return;
         }
       response.json().then((data) => {
         dispatch({type: SET_TASK_STATUSES, statuses:data.data,statusesUpdateDate:data.date.toString()});
       });
     }
   ).catch(function (error) {
       console.log(error);
   });
 }
 }

 export const setTaskProjectsLoading = (taskProjectsLoaded) => {
   return (dispatch) => {
     dispatch({ type: SET_TASK_PROJECTS_LOADING, taskProjectsLoaded });
   }
 };
 export const getTaskProjects= (token) => {
   return (dispatch) => {
       fetch(PROJECTS_LIST+'/create-tasks', {
         method: 'get',
         headers: {
           'Authorization': 'Bearer ' + token,
           'Content-Type': 'application/json'
         }
       }).then((response) =>{
         if(!response.ok){
           return;
         }
       response.json().then((data) => {
         dispatch({type: SET_TASK_PROJECTS, projects:data.data});
       });
     }
   ).catch(function (error) {
     console.log(error);
   });
 }
 }

 export const setTaskCompaniesLoading = (taskCompaniesLoaded) => {
   return (dispatch) => {
     dispatch({ type: SET_TASK_COMPANIES_LOADING, taskCompaniesLoaded });
   }
 };
 /**
  * Gets all companies available with no pagination
  * @param {string} token universal token for API comunication
  */
  export const getTaskCompanies = (updateDate,token) => {
    return (dispatch) => {
      fetch(COMPANIES_LIST+'/all'+(updateDate?'/'+updateDate:''), {
        method: 'get',
        headers: {
          'Authorization': 'Bearer ' + token,
          'Content-Type': 'application/json'
        }
      }).then((response) =>{
        if(!response.ok){
          return;
        }
        response.json().then((data) => {
          dispatch({type: SET_TASK_COMPANIES, companies:data.data,companiesUpdateDate:data.date.toString()});
        });
      }
    ).catch(function (error) {
      console.log(error);
    });
  }
  }

 export const setTaskUnitsLoading = (taskUnitsLoaded) => {
   return (dispatch) => {
     dispatch({ type: SET_TASK_UNITS_LOADING, taskUnitsLoaded });
   }
 };
 /**
  * Gets all units available with no pagination
  * @param {string} token universal token for API comunication
  */
 export const getTaskUnits= (token) => {
   return (dispatch) => {
       fetch(UNITS_LIST+'/all', {
         method: 'get',
         headers: {
           'Authorization': 'Bearer ' + token,
           'Content-Type': 'application/json'
         }
       }).then((response) =>{
         if(!response.ok){
           return;
         }
       response.json().then((data) => {
         dispatch({type: SET_TASK_UNITS, units:data.data});
       });
     }
   ).catch(function (error) {
     console.log(error);
   });
 }
 }

 export const setTaskTagsLoading = (taskTagsLoaded) => {
   return (dispatch) => {
     dispatch({ type: SET_TASK_TAGS_LOADING, taskTagsLoaded });
   }
 };
 /**
  * Gets all tags available with no pagination
  * @param {string} token universal token for API comunication
  */
 export const getTaskTags= (token) => {
   return (dispatch) => {
       fetch(TAGS_LIST+'/all', {
         method: 'get',
         headers: {
           'Authorization': 'Bearer ' + token,
           'Content-Type': 'application/json'
         }
       }).then((response) =>{
         if(!response.ok){
           return;
         }
       response.json().then((data) => {
         dispatch({type: SET_TASK_TAGS, tags:data.data});
       });
     }
   ).catch(function (error) {
     console.log(error);
   });
 }
 }

 export const deleteTaskSolvers = () => {
   return (dispatch) => {
     dispatch({type: SET_TASK_SOLVERS, taskSolvers:[]});
   };
 };

export const getTaskSolvers = (projectID,token) => {
  return (dispatch) => {
      fetch(PROJECT_URL+'/'+projectID+'/assign-user', {
        method: 'get',
        headers: {
          'Authorization': 'Bearer ' + token,
          'Content-Type': 'application/json'
        }
      }).then((response) =>{
        if(!response.ok){
          return;
        }
      response.json().then((data) => {
        dispatch({type: SET_TASK_SOLVERS, taskSolvers:data.data});
      });
    }
  ).catch(function (error) {
    console.log(error);
  });
}
}

export const addTask = (body,followers,projectID,statusID,requesterID,companyID,token) => {
  return (dispatch) => {
    fetch(TASK_LIST+'/project/'+projectID+'/status/'+statusID+'/requester/'+requesterID+'/company/'+companyID,{
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      method: 'POST',
      body:JSON.stringify(body),
    })
    .then((response)=>{
      if(!response.ok){
        return;
      }
      response.json().then((response)=>{
        followers.map((follower)=>{
          addFollower(follower.id,response.data.id,token)(dispatch);
        });
      })})
      .catch(function (error) {
        console.log(error);
      });
    };
  };

  export const addFollower = (userID,taskID,token) => {
    return (dispatch) => {
        fetch(TASK_LIST+'/'+taskID+'/add-follower/'+userID,{
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
          },
          method: 'PUT',
        })
      .then((response)=>{
        if(!response.ok){
          return;
        }
      response.json().then((response)=>{
        return;
        //dispatch({type: ADD_FOLLOWER, follower:response.data});
      })})
      .catch(function (error) {
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
      fetch(PROJECTS_LIST+'?limit=999', {
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
    fetch(PROJECTS_LIST+'?limit=999', {
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
        dispatch({type: SET_TASKS, payload:{tasks:data.data,nextTasks:data._links.next,listName,projectID:null}});
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
      fetch(PROJECTS_LIST+'?limit=999', {
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
      fetch(PROJECTS_LIST+'?limit=999', {
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
export const editTask = (task,id,token,stay) => {
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
      if(stay){
        dispatch({type: EDIT_TASK_LIST, payload:{taskInList:response.data} });
      }
      else{
        dispatch({type: DELETE_TASK, payload:{id} });
      }
    }))
    .catch(function (error) {
      console.log(error);
    });
  };
};
