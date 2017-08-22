
import { SET_TASKS, SET_PROJECTS, SET_COMPANIES, SET_STATUSES, SET_USERS, SET_CUSTOM_ATTRIBUTES, SET_UNITS, SET_TASK } from '../types';

const initialState = {
  tasks:[],
  users:[],
  projects:[],
  companies:[],
  units:[],
  statuses:[],
  customAttributes:[],
  task:null,
};

export default function taskReducer (state = initialState, action) {
  switch (action.type) {
    case SET_TASKS:
      return {
        ...state,
        tasks: action.payload.tasks,
      };
    case SET_PROJECTS:
      return {
        ...state,
        projects: action.payload.projects,
      };
    case SET_COMPANIES:
      return {
        ...state,
        companies: action.payload.companies,
      };
    case SET_STATUSES:
      return {
        ...state,
        statuses: action.payload.statuses,
      };
    case SET_USERS:
      return {
        ...state,
        users: action.payload.users,
      };
    case SET_CUSTOM_ATTRIBUTES:
        return {
          ...state,
          customAttributes: action.payload.customAttributes,
        };
    case SET_UNITS:
        return {
          ...state,
          units: action.payload.units,
        };
    case SET_TASK:
        return {
          ...state,
          task: action.payload.task
        };
    default:
      return state;
  }

  return state;
}
