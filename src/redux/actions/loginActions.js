import {LOGIN_START, LOGIN_SUCCESS, LOGIN_FAIL, LOGIN_LOGOUT} from '../types';
import {LOGIN_URL} from '../../extras/urls';

//start login of user
export const loginUser = (username, password) => {
  return (dispatch) => {
    dispatch({ type: LOGIN_START });
    fetch(LOGIN_URL, {
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: `username=${username}&password=${password}`
      }).then(function (response) {
        response.json().then(loginUserSuccess(dispatch, {user:{name:username,token:response.token}}));
      })
      .catch(function (error) {
        loginUserFail(dispatch);
      });
  };
};

//start logout of user


//functions used by actions

//on success login
const loginUserFail = (dispatch) => {
  dispatch({ type: LOGIN_FAIL });
};
//on failed login
const loginUserSuccess = (dispatch, user) => {
  dispatch({
      type: LOGIN_SUCCESS,
      payload: user
  });
};
