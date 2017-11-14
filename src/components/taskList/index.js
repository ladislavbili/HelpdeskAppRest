
import React, { Component } from 'react';
import { Container, Header, Title, Button, Icon, Left, Right, Body } from 'native-base';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { ActivityIndicator } from 'react-native';

import TaskList from './taskList';
import { startLoadingSearch,openDrawer, closeDrawer } from '../../redux/actions';
import I18n from '../../translations/';

class TaskListLoader extends Component {

  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={this.props.openDrawer}>
              <Icon name="menu" />
            </Button>
          </Left>
          <Body>
            <Title>{this.props.listName?this.props.listName:I18n.t('taskList')}</Title>
          </Body>
          <Right>
            <Button transparent style={{ marginTop: 8 }} onPress={()=>{this.props.startLoadingSearch();Actions.search();}}>
              <Icon name="search" style={{ color: 'white' }} />
            </Button>
            <Button transparent style={{ marginTop: 8 }} onPress={Actions.messages}>
              <Icon name="mail" style={{ color: 'white' }} />
            </Button>
            { (this.props.ACL.includes('company_settings') || this.props.ACL.includes('user_settings') ) &&
              <Button transparent style={{ marginTop: 8 }} onPress={Actions.settings}>
              <Icon name="settings" style={{ color: 'white' }} />
              </Button>
            }
          </Right>
        </Header>
         <TaskList />
      </Container>
    );
  }
}

const mapStateToProps = ({taskR,login,drawer}) => {
  const {loadingData,tasks,projects,currentTask,listName} = taskR;
  const {user,token} = login;
  const{drawerState} = drawer;
  return {ACL:user?user.ACL:[],loadingData,tasks,projects,token,drawerState,currentTask,listName};
};

export default connect(mapStateToProps,{openDrawer, startLoadingSearch})(TaskListLoader);
