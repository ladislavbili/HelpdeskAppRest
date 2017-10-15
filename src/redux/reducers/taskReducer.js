import { SET_UNITS, SET_LABELS, DELETE_TASK, EDIT_TASK_LIST, ADD_TO_TASK_LIST, START_LOADING, START_LOADING_PROJECTS, SET_SEARCH_ATTRIBUTES,
  SET_TASKS, SET_PROJECTS, SET_COMPANIES, SET_STATUSES, SET_USERS, SET_TASK, SET_TASK_ATTRIBUTES, SET_FILTERS,SET_LAST_TASK } from '../types';

const initialState = {
  statuses:[],
  loadingData:false,
  tasks:[],
  task:null,
  loadingSearch:false,
  labels:[],
  project:null,
  projects:[],
  loadingProjects:true,
  filters:[],
  currentTask:0,
};

export default function taskReducer (state = initialState, action) {
  switch (action.type) {
    case SET_LAST_TASK:
      return {
        ...state,
        currentTask: state.currentTask+1,
      };
    case START_LOADING_PROJECTS:
      return {
        ...state,
        loadingProjects: true,
      };
    case SET_SEARCH_ATTRIBUTES:
      return {
        ...state,
        statuses:action.payload.statuses,
        projects:action.payload.projects,
        labels:action.payload.labels,
        loadingSearch:false
      };
    case SET_UNITS:
      return {
        ...state,
        loadingData:false,
      };
    case SET_FILTERS:{
      return {
        ...state,
        filters:action.filters,
      };
    }
    case SET_LABELS:{
      return {
        ...state,
        labels:action.payload.labels,
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
        loadingProjects:false,
      };
    case SET_COMPANIES:
      return {
        ...state,
        loadingData:false
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
          loadingData:false
        };
    case SET_TASK:
        return {
          ...state,
          task: action.payload.task,
          loadingData:false,
        };
    case SET_TASK_ATTRIBUTES:
      return {
        ...state,
        statuses:action.payload.statuses,
        projects:action.payload.projects,
        labels:action.payload.labels,
        task:action.payload.task,
        loadingData:false
      };
    default:
      return state;
  }
}
