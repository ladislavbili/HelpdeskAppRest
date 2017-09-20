import { SET_UNITS, SET_LABELS, SET_SEARCHED_FILTER, SET_SEARCHED_TASKS, CLEAR_SEARCHED_TASKS, DELETE_TASK, EDIT_TASK_LIST, ADD_TO_TASK_LIST, START_LOADING,
  SET_TASKS_AND_PROJECTS, SET_TASKS, SET_PROJECTS, SET_COMPANIES, SET_STATUSES, SET_USERS, SET_TASK, SET_TASK_ATTRIBUTES } from '../types';

const initialState = {
  statuses:[],
  loadingData:false,
  tasks:[],
  task:null,
  searchedTasks:[],
  searchedWord:'',
  searchedFilter:'',
  searching:false,
  labels:[],
  project:null,
  projects:[],
};

export default function taskReducer (state = initialState, action) {
  switch (action.type) {
    case SET_UNITS:
      return {
        ...state,
        loadingData:false,
      };
    case SET_LABELS:{
      return {
        ...state,
        labels:action.payload.labels,
      };
    }
    case SET_SEARCHED_FILTER:{
      return {
        ...state,
        searchedWord:action.payload.word,
        searchedFilter:action.payload.filter,
      };
    }
    case SET_SEARCHED_TASKS:{
      return {
        ...state,
        searchedTasks:action.payload.tasks,
        searching:false,
      };
    }
    case CLEAR_SEARCHED_TASKS:{
      return {
        ...state,
        searchedTasks:[],
        searching:true,
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
