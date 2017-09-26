import { EDIT_COMPANY_LIST, SET_COMPANY, ADD_COMPANY, SET_USER_ATTRIBUTES, SET_COMPANIES, SET_TASK_ATTRIBUTES } from '../types';

const initialState = {
  companies:[],
  company:null
};

export default function reducer (state = initialState, action) {
  switch (action.type) {
    case EDIT_COMPANY_LIST:{
      let newCompanies= [...state.companies];
      newCompanies.splice(newCompanies.findIndex((company)=>company.id==action.payload.company.id),1,action.payload.company);
      return {
        ...state,
        companies:newCompanies
      };
    }
    case SET_COMPANY:{
      return {
        ...state,
        company:action.payload.company
      };
    }
    case ADD_COMPANY:{
      return {
        ...state,
        companies:[action.payload.company,...state.companies]
      };
    }
    case SET_USER_ATTRIBUTES:{
      return {
        ...state,
        companies:action.payload.companies
      };
    }
    case SET_COMPANIES:
      return {
        ...state,
        companies: action.payload.companies
      };
    case SET_TASK_ATTRIBUTES:
      return {
        ...state,
        companies:action.payload.companies
      };
    default:
      return state;
  }
}
