import { EDIT_COMPANY_LIST, ADD_COMPANY, SET_COMPANY, SET_COMPANIES } from '../types';
import { COMPANIES_LIST, COMPANY } from '../urls';
import { Actions } from 'react-native-router-flux';

export const editCompany = (company,id) => {
  return (dispatch) => {
    let listURL = COMPANIES_LIST + '/' + id;
    let companyURL = COMPANY + '/' + id;
    Promise.all([
      fetch(listURL, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'PATCH',
        body:JSON.stringify({title:company.title}),
      }),
      fetch(companyURL, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'PATCH',
        body:JSON.stringify(company),
      })
    ])
    .then(([response1,response2])=>Promise.all([response1.json(),response2.json()]).then(([response1,response2])=>{
      dispatch({type: EDIT_COMPANY_LIST, payload:{company:{id,title:company.title}}});
    }))
    .catch(function (error) {
      console.log(error);
    });
  };
};
export const addCompany = (newCompany) => {
  return (dispatch) => {
    Promise.all([
      fetch(COMPANIES_LIST, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body:JSON.stringify({title:newCompany.title}),
      }),
      fetch(COMPANY, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body:JSON.stringify(newCompany),
      })
    ]).then(([response1,response2])=>Promise.all([response1.json(),response2.json()]).then(([response1,response2])=>{
      dispatch({type: ADD_COMPANY, payload:{company:{title:newCompany.title,id:response2.id}}});
    }))
    .catch(function (error) {
      console.log(error);
    });
  };
};
export const openEditingOfCompany = (id) => {
  return (dispatch) => {
    fetch(COMPANY+'/'+id, {
      method: 'GET',
    }).then((response)=>response.json().then((response)=>{
      dispatch({type: SET_COMPANY, payload:{company:response}});
      Actions.companyEdit();
    }))
    .catch(function (error) {
      console.log(error);
    });
  };
};
export const getCompanies = () => {
  return (dispatch) => {
    fetch(COMPANIES_LIST, {
      method: 'GET',
    }).then((response)=> response.json().then(response => {
      dispatch({type: SET_COMPANIES, payload:{companies:response}});
    }))
    .catch(function (error) {
      console.log(error);
    });
  };
};
