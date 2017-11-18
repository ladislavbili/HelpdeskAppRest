import {OPEN_DRAWER,CLOSE_DRAWER,CHANGE_MATERIAL,CHANGE_PLATFORM} from '../types';
//All of these are actions, they return redux triggered functions, that have no return, just manipulate with the store

export const openDrawer = () => {
  return (dispatch) => dispatch({ type: OPEN_DRAWER });
};

export const closeDrawer = () => {
  return (dispatch) => dispatch({ type: CLOSE_DRAWER });
};

export const changeMaterial = () => {
  return (dispatch) => dispatch({ type: CHANGE_MATERIAL });
};

export const changePlatform = () => {
  return (dispatch) => dispatch({ type: CHANGE_PLATFORM });
};
