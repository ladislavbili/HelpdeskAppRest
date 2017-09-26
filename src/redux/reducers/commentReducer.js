import { ADD_NEW_COMMENT, START_LOADING_COMMENTS, SET_COMMENTS } from '../types';

const initialState = {
  loadingComments:false,
  comments:[]
};

export default function reducer (state = initialState, action) {
  switch (action.type) {
    case SET_COMMENTS:{
      return {
        ...state,
        comments:action.payload.comments,
        loadingComments:false,
      };
    }
    case START_LOADING_COMMENTS:
      return {
        ...state,
        loadingComments: true,
      };
    case ADD_NEW_COMMENT:{
      return {
        ...state,
        comments:[action.payload.comment,...state.comments],
      };
    }
    default:
      return state;
  }
}
