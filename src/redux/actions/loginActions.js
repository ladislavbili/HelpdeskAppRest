import {LOGIN_START, LOGIN_SUCCESS, LOGIN_FAIL, LOGIN_LOGOUT} from '../types';


//start login of user
export const loginUser = (email, password, successful) => {
  return (dispatch) => {
    dispatch({ type: LOGIN_START });
      if(successful){
        loginUserSuccess(dispatch, user={name:'Jaroslav'});
      }
      else{
        loginUserFail(dispatch);
      }
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
