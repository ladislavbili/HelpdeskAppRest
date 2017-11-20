import { SET_USER_ATTRIBUTES, EDIT_USER_LIST, ADD_USER, SET_USERS, SET_TASK_ATTRIBUTES, SET_SEARCH_ATTRIBUTES, START_LOADING_USER, SET_ASSIGNERS } from '../types';

const initialState = {
  user_roles:[],
  users:[],
  user:null,
  loadingUser:false,
  assigners:[],
};

export default function reducer (state = initialState, action) {
  switch (action.type) {
    case SET_ASSIGNERS:
    return {
      ...state,
      assigners: action.payload.assigners,
    };
    case START_LOADING_USER:
    return {
      ...state,
      loadingUser: true,
    };
    case SET_USER_ATTRIBUTES:{
      return {
        ...state,
        user_roles:action.payload.user_roles,
        user:action.payload.user?action.payload.user:null,
        loadingUser:false
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
    case SET_USERS:
    return {
      ...state,
      users: action.payload.users
    };
    case SET_TASK_ATTRIBUTES:
    return {
      ...state,
      users:action.payload.users,
    };
    case SET_SEARCH_ATTRIBUTES:
    return {
      ...state,
      users:action.payload.users,
    };
    default:
    return state;
  }
}
