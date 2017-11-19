import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ActivityIndicator } from 'react-native';

import UserAdd from './user';
import {getUserAttributes} from '../../redux/actions';

/**
 * Loads all of the attributes needed for adding a new user
 * @extends Component
 */
class UserAddLoader extends Component {
  /**
   * Before the component is loaded, it's starts fetching all of the attributes needed to add a new user
   */
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

//creates function that maps actions (functions) to the redux store
const mapStateToProps = ({ userR, login }) => {
  const { loadingUser } = userR;
  const { token } = login;
  return { loadingUser, token };
};

//exports created Component connected to the redux store and redux actions
export default connect(mapStateToProps,{getUserAttributes})(UserAddLoader);
