import { SET_LOADING_COMPANIES,SET_COMPANIES,EDIT_COMPANY_LIST, SET_COMPANY, ADD_COMPANY, SET_USER_ATTRIBUTES, SET_TASK_ATTRIBUTES, SET_SEARCH_ATTRIBUTES, START_LOADING_COMPANY } from '../types';

const initialState = {
  companies:[],
  companiesLoaded:false,
  updateDate:null,
  pagination:null,

  company:null,
  loadingCompany:false,
};

export default function reducer (state = initialState, action) {
  switch (action.type) {
    case SET_LOADING_COMPANIES:
    return {
      ...state,
      companiesLoaded: action.companiesLoaded,
    };
    case SET_COMPANIES:{
      if(!state.updateDate){
        return { ...state, companies:action.companies, updateDate:action.updateDate };
      }
      let newCompanies=[...state.companies];
      action.companies.map((company)=>{
        let index= newCompanies.findIndex((item)=>item.id===company.id);
        if(index!=-1){
          if(!company.is_active){
            newCompanies.splice(index,1);
          }
          else{
            newCompanies[index]=company;
          }
        }
        else{
          newCompanies.push(company);
        }
      });
      return { ...state, companies:newCompanies, updateDate:action.updateDate };
    }
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
        company:action.company,
        loadingCompany:false
      };
    }
    case START_LOADING_COMPANY:
    return {
      ...state,
      loadingCompany: true,
    };
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
    case SET_TASK_ATTRIBUTES:
    return {
      ...state,
      companies:action.payload.companies
    };
    case SET_SEARCH_ATTRIBUTES:{
      return {
        ...state,
        companies:action.payload.companies
      };
    }
    default:
    return state;
  }
}
