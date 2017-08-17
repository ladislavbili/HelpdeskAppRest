import {LOGIN_START, LOGIN_SUCCESS, LOGIN_FAIL, LOGIN_LOGOUT} from '../types'

const defaultState = {
  authenticated: false,
  user: null,
  error: '',
  loading:false,
};

export default function loginReducer(state = defaultState, action) {
  switch (action.type) {
    case LOGIN_START:
      return { ...state, loading: true, error: '' };
    case LOGIN_SUCCESS:
      return {
        authenticated: true,
        user: action.payload.user,
        error: '',
        loading:false,
      };
    case LOGIN_FAIL:
      return {
        authenticated: false,
        user: null,
        error: 'Login failed, invalid name or password',
        loading:false,
      };
    case LOGIN_LOGOUT:
      return {
        authenticated: false,
        user: null,
        error: '',
        loading:false,
      };
    default:
      return state;
  }
}
