import {SET_TASKS, SET_PROJECTS, SET_COMPANIES, SET_STATUSES, SET_USERS, SET_UNITS, SET_TASK, SET_TASKS_AND_PROJECTS,
  START_LOADING,SET_TASK_ATTRIBUTES, EDIT_TASK_LIST, ADD_TO_TASK_LIST, SET_COMMENTS, START_LOADING_COMMENTS,ADD_NEW_COMMENT,
  START_LOADING_ITEMS, SET_ITEMS, ADD_NEW_ITEM, DELETE_ITEM, EDIT_ITEM_LIST, SET_ITEM, SET_USER_ATTRIBUTES,EDIT_USER_LIST,
  DELETE_TASK, ADD_USER, ADD_COMPANY,SET_COMPANY, EDIT_COMPANY_LIST } from '../types';
import {TASK_LIST, PROJECT_LIST,COMPANIES_LIST,STATUSES_LIST,USERS_LIST,UNITS_LIST, TASK, COMMENTS, ITEMS_LIST, USER, USER_ROLES, COMPANY } from '../urls';
import { Actions } from 'react-native-router-flux';


export const editCompany = (company,id) => {
  return (dispatch) => {
    let listURL = COMPANIES_LIST + '/' + id;
    let companyURL = COMPANY + '/' + id;
    Promise.all([
      fetch(listURL, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'PATCH',
        body:JSON.stringify({title:company.title}),
      }),
      fetch(companyURL, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'PATCH',
        body:JSON.stringify(company),
      })
    ])
    .then(([response1,response2])=>Promise.all([response1.json(),response2.json()]).then(([response1,response2])=>{
      dispatch({type: EDIT_COMPANY_LIST, payload:{company:{id,title:company.title}}});
    }))
    .catch(function (error) {
      console.log(error);
    });
  };
};

export const addCompany = (newCompany) => {
  return (dispatch) => {
    Promise.all([
      fetch(COMPANIES_LIST, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body:JSON.stringify({title:newCompany.title}),
      }),
      fetch(COMPANY, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body:JSON.stringify(newCompany),
      })
    ]).then(([response1,response2])=>Promise.all([response1.json(),response2.json()]).then(([response1,response2])=>{
      dispatch({type: ADD_COMPANY, payload:{company:{title:newCompany.title,id:response2.id}}});
    }))
    .catch(function (error) {
      console.log(error);
    });
  };
};

export const openEditingOfCompany = (id) => {
  return (dispatch) => {
    fetch(COMPANY+'/'+id, {
      method: 'GET',
    }).then((response)=>response.json().then((response)=>{
      dispatch({type: SET_COMPANY, payload:{company:response}});
      Actions.companyEdit();
    }))
    .catch(function (error) {
      console.log(error);
    });
  };
};

export const openEditingOfUser = (id) => {
  return (dispatch) => {
    Promise.all([
      fetch(COMPANIES_LIST, {
        method: 'GET',
      }),
      fetch(USER_ROLES, {
        method: 'GET',
      }),
      fetch(USER+'/'+id, {
        method: 'GET',
      }),
    ]).then(([response1,response2,response3])=>Promise.all([response1.json(),response2.json(),response3.json()]).then(([response1,response2,response3])=>{
      dispatch({type: SET_USER_ATTRIBUTES, payload:{companies:response1,user_roles:response2,user:response3}});
      Actions.userEdit();
    }))
    .catch(function (error) {
      console.log(error);
    });
  };
};

export const addUser = (newUser,listUser) => {
  return (dispatch) => {
    Promise.all([
      fetch(USERS_LIST, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body:JSON.stringify(listUser),
      }),
      fetch(USER, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body:JSON.stringify(newUser),
      })
    ]).then(([response1,response2])=>Promise.all([response1.json(),response2.json()]).then(([response1,response2])=>{
      dispatch({type: ADD_USER, payload:{user:Object.assign({},listUser,{id:response2.id})}});
    }))
    .catch(function (error) {
      console.log(error);
    });
  };
};

export const openAddingOfUser = () => {
  return (dispatch) => {
    Promise.all([
      fetch(COMPANIES_LIST, {
        method: 'GET',
      }),
      fetch(USER_ROLES, {
        method: 'GET',
      })
    ]).then(([response1,response2])=>Promise.all([response1.json(),response2.json()]).then(([response1,response2])=>{
      dispatch({type: SET_USER_ATTRIBUTES, payload:{companies:response1,user_roles:response2}});
      Actions.userAdd();
    }))
    .catch(function (error) {
      console.log(error);
    });
  };
};

export const editUser = (user,listUser) => {
  return (dispatch) => {
    let listURL = USERS_LIST + '/' + listUser.id;
    let userURL = USER + '/' + listUser.id;
    Promise.all([
      fetch(listURL, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'PATCH',
        body:JSON.stringify(listUser),
      }),
      fetch(userURL, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'PATCH',
        body:JSON.stringify(user),
      })
    ])
    .then(([response1,response2])=>Promise.all([response1.json(),response2.json()]).then(([response1,response2])=>{
      dispatch({type: EDIT_USER_LIST, payload:{user:listUser}});
    }))
    .catch(function (error) {
      console.log(error);
    });
  };
};



export const openAddingOfItem = (id) => {
  return (dispatch) => {
    fetch(UNITS_LIST, {
      method: 'GET',
    }).then((response)=> response.json().then(response => {
      dispatch({type: SET_UNITS, payload:{units:response}});
      Actions.itemAdd({id});
    }))
    .catch(function (error) {
      console.log(error);
    });
  };
};
export const startLoadingItems = () => {
  return (dispatch) => {
    dispatch({type: START_LOADING_ITEMS });
  };
};
export const openEditingOfItem = (id,projectID) => {
  return (dispatch) => {
    let url = ITEMS_LIST+ '/' + id;
    fetch(url, {
      method: 'GET',
    }).then((response)=> response.json().then(response => {
      dispatch({type: SET_ITEM, payload:{item:response}});
      Actions.itemEdit({projectID});
    }))
    .catch(function (error) {
      console.log(error);
    });
  };
};
export const getItemsAndUnits = () => {
  return (dispatch) => {
    Promise.all([
      fetch(ITEMS_LIST, {
        method: 'GET',
      }),
      fetch(UNITS_LIST, {
        method: 'GET',
      })
    ])
    .then(([response1,response2]) =>Promise.all([response1.json(),response2.json()]).then(([response1,response2]) => {
      dispatch({type: SET_ITEMS, payload:{items:response1,units:response2}});
    }))
    .catch(function (error) {
      console.log(error);
    });
  };
};
export const addItem = (item) => {
  return (dispatch) => {
    fetch(ITEMS_LIST, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body:JSON.stringify(item),
    }).then((response)=>response.json().then((response)=>{
      dispatch({type: ADD_NEW_ITEM, payload:{item:Object.assign({},item,{id:response.id})}});
    }))
    .catch(function (error) {
      console.log(error);
    });
  };
};
export const deleteItem = (id) => {
  return (dispatch) => {
    let url= ITEMS_LIST+ '/' + id
    fetch(url, {
      method: 'DELETE',
    }).then((response)=>response.json().then((response)=>{
      dispatch({type: DELETE_ITEM, payload:{id}});
    }))
    .catch(function (error) {
      console.log(error);
    });
  };
};
export const saveItemEdit = (item) => {
  return (dispatch) => {
    let url = ITEMS_LIST + '/' + item.id;
    fetch(url, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'PATCH',
      body:JSON.stringify(item),
    }).then((response)=>response.json().then((response)=>{
      console.log(response);
      dispatch({type: EDIT_ITEM_LIST, payload:{item}});
    }))
    .catch(function (error) {
      console.log(error);
    });
  };
};

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
