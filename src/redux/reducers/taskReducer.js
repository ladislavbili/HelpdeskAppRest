
import { SET_TASKS, SET_PROJECTS, SET_COMPANIES, SET_STATUSES, SET_USERS, SET_CUSTOM_ATTRIBUTES, SET_UNITS, SET_TASK,SET_TASKS_AND_PROJECTS,START_LOADING,
  SET_TASK_ATTRIBUTES, EDIT_TASK_LIST, ADD_TO_TASK_LIST, SET_COMMENTS, START_LOADING_COMMENTS,ADD_NEW_COMMENT, START_LOADING_ITEMS, SET_ITEMS,
  ADD_NEW_ITEM, DELETE_ITEM,EDIT_ITEM_LIST, SET_ITEM, DELETE_TASK, SET_USER_ATTRIBUTES, ADD_USER, EDIT_USER_LIST, ADD_COMPANY, SET_COMPANY, EDIT_COMPANY_LIST } from '../types';

const initialState = {
  tasks:[],
  users:[],
  projects:[],
  companies:[],
  units:[],
  statuses:[],
  customAttributes:[],
  task:null,
  project:null,
  loadingData:false,
  loadingComments:false,
  comments:[],
  loadingitems:false,
  items:[],
  item:null,
  user:null,
  user_roles:[],
  company:null,
};

export default function taskReducer (state = initialState, action) {
  switch (action.type) {
    case EDIT_COMPANY_LIST:{
      let newCompanies= [...state.companies];
      newCompanies.splice(newCompanies.findIndex((company)=>company.id==action.payload.company.id),1,action.payload.company);
      return {
        ...state,
        companies:newCompanies
      };
    }
    case SET_COMPANY:{
      return {
        ...state,
        company:action.payload.company
      };
    }
    case ADD_COMPANY:{
      return {
        ...state,
        companies:[action.payload.company,...state.companies]
      };
    }
    case EDIT_USER_LIST:{
      let newUsers= [...state.users];
      newUsers.splice(newUsers.findIndex((user)=>user.id==action.payload.user.id),1,action.payload.user);
      return {
        ...state,
        users:newUsers
      };
    }
    case ADD_USER:{
      return {
        ...state,
        users:[action.payload.user,...state.users]
      };
    }
    case SET_ITEM:{
      return {
        ...state,
        item:action.payload.item
      };
    }
    case SET_USER_ATTRIBUTES:{
      return {
        ...state,
        companies:action.payload.companies,
        user_roles:action.payload.user_roles,
        user:action.payload.user?action.payload.user:null
      };
    }
    case DELETE_ITEM:{
      let newItems= [...state.items];
      newItems.splice(newItems.findIndex((item)=>item.id==action.payload.id),1);
      return {
        ...state,
        items:newItems,
      };
    }
    case EDIT_ITEM_LIST:{
      let newItems= [...state.items];
      newItems.splice(newItems.findIndex((item)=>item.id==action.payload.item.id),1,action.payload.item);
      return {
        ...state,
        items:newItems
      };
    }
    case ADD_NEW_ITEM:{
      return {
        ...state,
        items:[action.payload.item,...state.items],
      };
    }
    case START_LOADING_ITEMS:
      return {
        ...state,
        loadingItems: true,
      };
    case SET_ITEMS:{
      return {
        ...state,
        items:action.payload.items,
        units:action.payload.units,
        loadingItems:false,
      };
      }
    case ADD_NEW_COMMENT:{
      return {
        ...state,
        comments:[action.payload.comment,...state.comments],
      };
      }
    case SET_COMMENTS:{
      return {
        ...state,
        comments:action.payload.comments,
        loadingComments:false,
      };
      }
    case DELETE_TASK:{
      let newTasks= [...state.tasks];
      newTasks.splice(newTasks.findIndex((item)=>item.id==action.payload.id),1);
      return {
        ...state,
        tasks:newTasks,
      };
    }
    case EDIT_TASK_LIST:{
      let newTasks= [...state.tasks];
      newTasks.splice(newTasks.findIndex((task)=>task.id==action.payload.taskInList.id),1,action.payload.taskInList);
      return {
        ...state,
        tasks:newTasks
      };
      }
    case ADD_TO_TASK_LIST:{
      return {
        ...state,
        tasks:[action.payload.taskInList,...state.tasks]
      };
    }
    case START_LOADING:
      return {
        ...state,
        loadingData: true,
      };
    case START_LOADING_COMMENTS:
      return {
        ...state,
        loadingComments: true,
      };
    case SET_TASK_ATTRIBUTES:
      return {
        ...state,
        users:action.payload.users,
        companies:action.payload.companies,
        statuses:action.payload.statuses,
        projects:action.payload.projects,
        task:action.payload.task,
        loadingData:false
      };
    case SET_TASKS_AND_PROJECTS:
      return {
        ...state,
        projects: action.payload.projects,
        tasks: action.payload.tasks,
        loadingData:false,
      };
    case SET_TASKS:
      return {
        ...state,
        tasks: action.payload.tasks,
        loadingData:false,
      };
    case SET_PROJECTS:
      return {
        ...state,
        projects: action.payload.projects,
        loadingData:false,
      };

    case SET_COMPANIES:
      return {
        ...state,
        companies: action.payload.companies,
        loadingData:false,
      };
    case SET_STATUSES:
      return {
        ...state,
        statuses: action.payload.statuses,
        loadingData:false,
      };
    case SET_USERS:
      return {
        ...state,
        users: action.payload.users,
        loadingData:false,
      };
    case SET_CUSTOM_ATTRIBUTES:
        return {
          ...state,
          customAttributes: action.payload.customAttributes,
          loadingData:false,
        };
    case SET_UNITS:
        return {
          ...state,
          units: action.payload.units,
          loadingData:false,
        };
    case SET_TASK:
        return {
          ...state,
          task: action.payload.task,
          loadingData:false,
        };
    default:
      return state;
  }

  return state;
}
