import {SET_TASK } from '../types';
import {TASK} from '../urls';
import { Actions } from 'react-native-router-flux';


export const getTask = (id) => {
  return (dispatch) => {
    fetch(TASK+id, {
      method: 'GET',
    }).then((response) =>response.json().then((response) => {
      dispatch({type: SET_TASK, payload:{task:response}});
      console.log(response);
      Actions.taskEdit();
    }))
    .catch(function (error) {
      console.log(error);
    });
  };
};
