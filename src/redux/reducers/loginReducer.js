import {LOGIN_START, LOGIN_SUCCESS, LOGIN_FAIL, LOGIN_LOGOUT} from '../types'

const initialState = {
  authenticated: false,
  user: null,
  error: false,
  token:null,
  loading:false
};

export default function loginReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_START:
      return { ...state, loading: true, error: false };
    case LOGIN_SUCCESS:
      return {
        ...state,
        authenticated: true,
        user: action.payload.user,
        token: action.payload.token,
        error: false,
        loading:false,
      };
    case LOGIN_FAIL:
      return {
        ...state,
        authenticated: false,
        user: null,
        error: true,
        loading:false,
      };
    case LOGIN_LOGOUT:
      return {
        ...state,
        authenticated: false,
        user: null,
        error: false,
        loading:false,
      };
    default:
      return state;
  }
}
