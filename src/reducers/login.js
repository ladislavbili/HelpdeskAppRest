import {LOGIN_SUCCESS, LOGIN_ERROR, LOGIN_LOGOUT} from './types'

const defaultState = {
    'authenticated': false,
    'jwt': '',
    'user': {},
    'error': ''
};

export default function login(state = defaultState, action) {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {
                'authenticated': true,
                'jwt': action.data,
                'user': action.user,
                'error': ''
            };
        case LOGIN_ERROR:
            return {
                'authenticated': false,
                'jwt': '',
                'user': {},
                'error': action.message
            };
        case LOGIN_LOGOUT:
            return {
                'authenticated': false,
                'jwt': '',
                'user': {},
                'error': ''
            };
        default:
            return state;
    }
}
