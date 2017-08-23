
import { SET_TASKS, SET_PROJECTS, SET_COMPANIES, SET_STATUSES, SET_USERS, SET_CUSTOM_ATTRIBUTES, SET_UNITS, SET_TASK,SET_TASKS_AND_PROJECTS,START_LOADING, SET_TASK_ATTRIBUTES } from '../types';

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
};

export default function taskReducer (state = initialState, action) {
  switch (action.type) {
    case START_LOADING:
      return {
        ...state,
        loadingData: true,
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
