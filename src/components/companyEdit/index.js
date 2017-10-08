import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ActivityIndicator } from 'react-native';

import CompanyEdit from './company';
import {getCompany} from '../../redux/actions';


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

const mapStateToProps = ({ companyR, login }) => {
  const { loadingCompany } = companyR;
  const { token } = login;
  return { loadingCompany, token };
};

export default connect(mapStateToProps,{getCompany})(CompanyEditLoader);
