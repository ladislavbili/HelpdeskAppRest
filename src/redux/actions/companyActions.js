import { EDIT_COMPANY_LIST, SET_LOADING_COMPANIES, ADD_COMPANY, SET_COMPANY, SET_COMPANIES, START_LOADING_COMPANY } from '../types';
import { COMPANIES_LIST } from '../urls';
import {processRESTinput} from '../../helperFunctions';
//All of these are actions, they return redux triggered functions, that have no return, just manipulate with the store


/**
 * Sets status if companies are loaded to false
 */
export const setCompaniesLoading = (companiesLoaded) => {
  return (dispatch) => {
    dispatch({ type: SET_LOADING_COMPANIES, companiesLoaded });
  }
};


/**
 * Gets all companies available with no pagination
 * @param {string} token universal token for API comunication
 */
 export const getCompanies= (updateDate,token) => {
   return (dispatch) => {
     fetch(COMPANIES_LIST+'/all'+(updateDate?'/'+updateDate:''), {
       method: 'get',
       headers: {
         'Authorization': 'Bearer ' + token,
         'Content-Type': 'application/json'
       }
     }).then((response) =>{
       if(!response.ok){
         return;
       }
       response.json().then((data) => {
         dispatch({type: SET_COMPANIES, companies:data.data,updateDate:data.date.toString()});
         dispatch({ type: SET_LOADING_COMPANIES, companiesLoaded:true });
       });
     }
   ).catch(function (error) {
     console.log(error);
   });
 }
 }
/**
 * Saves editted company
 * @param  {Company} company Object containing all new data about the company
 * @param  {string} token   Token for the REST API
 * @param  {int} id      ID of the company that is being editted
 */
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

/**
 * Adds completely new Company
 * @param {Company } newCompany All data about the new company
 * @param {string} token      Token for the REST API
 */
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

/**
 * Starts an indicator that the companies are loading
 */
export const startLoadingCompany = () => {
  return (dispatch) => {
    dispatch({type: START_LOADING_COMPANY });
  };
};

/**
 * Get's all the information about the specific company
 * @param  {int} id    Company's ID
 * @param  {string} token Token for the REST API
 */
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
