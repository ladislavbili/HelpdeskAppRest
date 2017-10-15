import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ActivityIndicator } from 'react-native';

import UserAdd from './user';
import {getUserAttributes} from '../../redux/actions';


class UserAddLoader extends Component {
  componentWillMount(){
    this.props.getUserAttributes(this.props.token);
  }
  render() {
    if(this.props.loadingUser){
      return (
        <ActivityIndicator
        animating size={ 'large' }
        color='#007299' />
      )
    }

    return (
      <UserAdd/>
    );
  }
}

const mapStateToProps = ({ userR, login }) => {
  const { loadingUser } = userR;
  const { token } = login;
  return { loadingUser, token };
};

export default connect(mapStateToProps,{getUserAttributes})(UserAddLoader);
