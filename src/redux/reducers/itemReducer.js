import { SET_UNITS, SET_ITEM, SET_ITEMS, DELETE_ITEM, EDIT_ITEM_LIST, ADD_NEW_ITEM, START_LOADING_ITEMS } from '../types';

const initialState = {
  units:[],
  loadingitems:false,
  items:[],
  item:null
};

export default function reducer (state = initialState, action) {
  switch (action.type) {
    case SET_UNITS:
        return {
          ...state,
          units: action.payload.units
        };
    case SET_ITEM:{
      return {
        ...state,
        item:action.payload.item
      };
    }
    case SET_ITEMS:{
      return {
        ...state,
        items:action.payload.items,
        units:action.payload.units,
        loadingItems:false,
      };
    }
    case DELETE_ITEM:{
      let newItems= [...state.items];
      newItems.splice(newItems.findIndex((item)=>item.id==action.payload.id),1);
      return {
        ...state,
        items:newItems,
      };
    }
    case EDIT_ITEM_LIST:{
      let newItems= [...state.items];
      newItems.splice(newItems.findIndex((item)=>item.id==action.payload.item.id),1,action.payload.item);
      return {
        ...state,
        items:newItems
      };
    }
    case ADD_NEW_ITEM:{
      return {
        ...state,
        items:[action.payload.item,...state.items],
      };
    }
    case START_LOADING_ITEMS:
      return {
        ...state,
        loadingItems: true,
      };
    default:
      return state;
  }
}
