import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ActivityIndicator } from 'react-native';

import UserEdit from './user';
import {getUser} from '../../redux/actions';


class UserEditLoader extends Component {
  componentWillMount(){
    this.props.getUser(this.props.id,this.props.token);
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
      <UserEdit/>
    );
  }
}

const mapStateToProps = ({ userR, login }) => {
  const { loadingUser } = userR;
  const { token } = login;
  return { loadingUser, token };
};

export default connect(mapStateToProps,{getUser})(UserEditLoader);
