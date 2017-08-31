import {LOGIN_START, LOGIN_SUCCESS, LOGIN_FAIL, LOGIN_LOGOUT} from '../types'

const initialState = {
  authenticated: false,
  user: null,
  userData: {
    "id": 1,
    "username": "mk",
    "name": "Matej Kurka",
    "email": "mk@email.sk"
  },
  error: '',
  loading:false,
  ACL:{
    sent_emails_from_comments:true,
    create_tasks_in_all_projects:true,
    update_all_tasks:true,
    user_settings:true,
    company_settings:true
  }
};

export default function loginReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_START:
      return { ...state, loading: true, error: '' };
    case LOGIN_SUCCESS:
      return {
        ...state,
        authenticated: true,
        user: action.payload.user,
        error: '',
        loading:false,
      };
    case LOGIN_FAIL:
      return {
        ...state,
        authenticated: false,
        user: null,
        error: 'Login failed, invalid name or password',
        loading:false,
      };
    case LOGIN_LOGOUT:
      return {
        ...state,
        authenticated: false,
        user: null,
        error: '',
        loading:false,
      };
    default:
      return state;
  }
}
