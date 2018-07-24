import { SET_LOADING_TASKS,SET_TASKS,ADD_TASKS,SET_OPENED_ID,SET_TASK_STATUSES_LOADING, SET_TASK_STATUSES,
  SET_TASK_PROJECTS_LOADING, SET_TASK_PROJECTS, SET_TASK_COMPANIES_LOADING, SET_TASK_COMPANIES, SET_TASK_UNITS_LOADING,
  SET_TASK_UNITS, SET_TASK_TAGS_LOADING, SET_TASK_TAGS,SET_TASK_SOLVERS,SET_TASK_LOADING,SET_TASK
} from '../types';

  const initialState = {
    tasks:[],
    nextTasks:false,
    tasksLoaded:false,
    openedID:null,
    statuses:[],
    statusesLoaded:false,
    statusesUpdateDate:null,
    projects:[],
    projectsLoaded:false,
    companies:[],
    companiesLoaded:false,
    companiesUpdateDate:null,
    units:[],
    unitsLoaded:false,
    tags:[],
    tagsLoaded:false,
    taskSolvers:[],
    task:null,
    taskLoaded:false,
  };

  export default function taskReducer (state = initialState, action) {
    switch (action.type) {
      case SET_LOADING_TASKS:
      return {
        ...state,
        tasksLoaded: action.tasksLoaded,
      };
      case SET_TASKS:
      return {
        ...state,
        tasks: action.tasks,
        nextTasks: action.nextTasks,
        tasksLoaded: true
      };
      case ADD_TASKS:{
        if(action.url===state.nextTasks){
          return {
            ...state,
            tasks: state.tasks.concat(action.tasks),
            nextTasks: action.nextTasks,
          };
        }
      }
      case SET_OPENED_ID:
      return {
        ...state,
        openedID: action.openedID,
      };

      case SET_TASK_STATUSES_LOADING:
      return {
        ...state,
        statusesLoaded: action.statusesLoaded,
      };

      case SET_TASK_STATUSES:
      return {
        ...state,
        statuses: action.statuses,
        statusesUpdateDate:action.statusesUpdateDate,
        statusesLoaded: true
      };

      case SET_TASK_PROJECTS_LOADING:
      return {
        ...state,
        projectsLoaded: action.projectsLoaded,
      };
      case SET_TASK_PROJECTS:
      return {
        ...state,
        projects: action.projects,
        projectsLoaded: true
      };

      case SET_TASK_COMPANIES_LOADING:
      return {
        ...state,
        companiesLoaded: action.companiesLoaded,
      };
      case SET_TASK_COMPANIES:
      return {
        ...state,
        companies: action.companies,
        companiesUpdateDate:action.companiesUpdateDate,
        companiesLoaded: true
      };

      case SET_TASK_UNITS_LOADING:
      return {
        ...state,
        unitsLoaded: action.unitsLoaded,
      };
      case SET_TASK_UNITS:
      return {
        ...state,
        units: action.units,
        unitsLoaded: true
      };

      case SET_TASK_TAGS_LOADING:
      return {
        ...state,
        tagsLoaded: action.tagsLoaded,
      };
      case SET_TASK_TAGS:
      return {
        ...state,
        tags: action.tags,
        tagsLoaded: true
      };
      case SET_TASK_SOLVERS:
      return {
        ...state,
        taskSolvers: action.taskSolvers,
      };
      case SET_TASK_LOADING:
      return {
        ...state,
        taskLoaded: action.taskLoaded,
      };
      case SET_TASK:{
        return {
          ...state,
          task: action.task,
          taskLoaded: true,
        };
      }

      //////
      //////
      default:
      return state;
    }
  }
