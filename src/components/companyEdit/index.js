import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ActivityIndicator } from 'react-native';

import CompanyEdit from './company';
import {getCompany} from '../../redux/actions';

/**
 * Loads all of the required data to display edditing of the company
 * @extends Component
 */
class CompanyEditLoader extends Component {
  componentWillMount(){
    this.props.getCompany(this.props.id, this.props.token);
  }
  render() {
    if(this.props.loadingCompany){
      return (
        <ActivityIndicator
          animating size={ 'large' }
          color='#007299' />
      )
    }
    return (
      <CompanyEdit/>
    );
  }
}

//creates function that maps actions (functions) to the redux store
const mapStateToProps = ({ companyR, login }) => {
  const { loadingCompany } = companyR;
  const { token } = login;
  return { loadingCompany, token };
};

//exports created Component connected to the redux store and redux actions
export default connect(mapStateToProps,{getCompany})(CompanyEditLoader);
