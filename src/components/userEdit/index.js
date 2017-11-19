import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ActivityIndicator } from 'react-native';

import UserEdit from './user';
import {getUser} from '../../redux/actions';

/**
 * Loads all of the attributes needed for editting a user
 * @extends Component
 */
class UserEditLoader extends Component {
  /**
   * Before the component is loaded, it's starts fetching all of the attributes needed for editting an user
   */
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

//creates function that maps actions (functions) to the redux store
const mapStateToProps = ({ userR, login }) => {
  const { loadingUser } = userR;
  const { token } = login;
  return { loadingUser, token };
};

//exports created Component connected to the redux store and redux actions
export default connect(mapStateToProps,{getUser})(UserEditLoader);
