import React, { Component } from "react";
import UserList from './userList';
import { connect } from 'react-redux';
import { ActivityIndicator } from 'react-native';
import { View, Text } from 'native-base';
import { getUsers, setUsersLoading } from '../../redux/actions';

class UserListLoader extends Component {
  constructor(props){
    super(props);
    this.props.setUsersLoading(false);
    this.props.getUsers(this.props.updateDate,this.props.token);
  }

  render(){
    if(this.props.usersLoaded){
      return <UserList {...this.props}/>;
    }
    else{
      return <ActivityIndicator
        animating size={ 'large' }
        color='#007299' />
    }
  }
}

// All below is just redux storage
const mapStateToProps = ({ userReducer,loginReducer }) => {
  const {token} = loginReducer;
  const {usersLoaded, updateDate} = userReducer;
  return {token,usersLoaded, updateDate};
};

export default connect(mapStateToProps, {getUsers, setUsersLoading })(UserListLoader);
