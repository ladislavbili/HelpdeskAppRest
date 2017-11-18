import { EDIT_COMPANY_LIST, ADD_COMPANY, SET_COMPANY, SET_COMPANIES, START_LOADING_COMPANY } from '../types';
import { COMPANIES_LIST } from '../urls';
import {processRESTinput} from '../../helperFunctions';
//All of these are actions, they return redux triggered functions, that have no return, just manipulate with the store

export const getCompanies = (token) => {
  return (dispatch) => {
    fetch(COMPANIES_LIST+'?limit=999', {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }).then((response)=> response.json().then(response => {
      dispatch({type: SET_COMPANIES, payload:{companies:response.data}});
    }))
    .catch(function (error) {
      console.log(error);
    });
  };
};

export const editCompany = (company,token,id) => {
  return (dispatch) => {
    fetch(COMPANIES_LIST + '/' + id, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Bearer ' + token
      },
      method: 'PATCH',
      body:processRESTinput(company),
    })
    .then((response)=>response.json().then((response)=>{
      dispatch({type: EDIT_COMPANY_LIST, payload:{company:Object.assign({},company,{id})}});
    }))
    .catch(function (error) {
      console.log(error);
    });
  };
};

export const addCompany = (newCompany,token) => {
  return (dispatch) => {
    fetch(COMPANIES_LIST, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Bearer ' + token
      },
      method: 'POST',
      body:processRESTinput(newCompany),
    })
    .then((response1)=>response1.json().then((response2)=>{
      dispatch({type: ADD_COMPANY, payload:{company:Object.assign(newCompany,{id:response2.data.id})}});
    }))
    .catch(function (error) {
      console.log(error);
    });
  };
};
export const startLoadingCompany = () => {
  return (dispatch) => {
    dispatch({type: START_LOADING_COMPANY });
  };
};
export const getCompany = (id,token) => {
  return (dispatch) => {
    fetch(COMPANIES_LIST+'/'+id, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }).then((response)=>response.json().then((response)=>{
      dispatch({type: SET_COMPANY, company:response.data});
    }))
    .catch(function (error) {
      console.log(error);
    });
  };
};
