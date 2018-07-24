import { SET_TASKS,SET_LOADING_TASKS,SET_OPENED_ID,
  SET_TASK_STATUSES_LOADING, SET_TASK_STATUSES, SET_TASK_PROJECTS_LOADING, SET_TASK_PROJECTS, SET_TASK_COMPANIES_LOADING, SET_TASK_COMPANIES, SET_TASK_UNITS_LOADING,
  SET_TASK_UNITS, SET_TASK_TAGS_LOADING, SET_TASK_TAGS,SET_TASK_SOLVERS,
  //
  SET_UNITS, SET_LABELS, DELETE_TASK, EDIT_TASK_LIST, START_LOADING, START_LOADING_PROJECTS, SET_SEARCH_ATTRIBUTES,ADD_NEW_TASK,
   SET_PROJECTS, SET_COMPANIES, SET_STATUSES, SET_USERS, SET_TASK, SET_TASK_ATTRIBUTES, SET_FILTERS,SET_LAST_TASK, START_LOADING_SEARCH,ADD_TASKS } from '../types';

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
    ///////
    statuses:[],
    loadingData:false,
    task:null,
    loadingSearch:false,
    labels:[],
    project:null,
    projects:[],
    loadingProjects:true,
    projectID:null,
    filters:[],
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



      //////
      case ADD_NEW_TASK:{
        return {
          ...state,
          tasks: [action.payload.task,...state.tasks],
        };
      }
      case START_LOADING_SEARCH:
      return {
        ...state,
        loadingSearch: true
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
        if(newTasks.findIndex((task)=>task.id==action.payload.taskInList.id)==-1){return state;};
        newTasks.splice(newTasks.findIndex((task)=>task.id==action.payload.taskInList.id),1,action.payload.taskInList);
        return {
          ...state,
          tasks:newTasks
        };
      }
      case START_LOADING:
      return {
        ...state,
        loadingData: true,
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
