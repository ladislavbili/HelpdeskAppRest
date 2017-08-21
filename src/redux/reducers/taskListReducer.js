
import { SET_TASKS, SET_PROJECTS } from '../types';

const initialState = {
  tasks:[],
  projects:[],
};

export default function taskListReducer (state = initialState, action) {
  switch (action.type) {
    case SET_TASKS:
      return {
        ...state,
        tasks: action.payload.tasks,
      };
    case SET_PROJECTS:
      return {
        ...state,
        projects: action.payload.projects,
      };
    default:
      return state;
  }

  return state;
}
