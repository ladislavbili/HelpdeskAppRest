
import React, { Component } from 'react';
import { Container, Header, Title, Button, Icon, Left, Right, Body } from 'native-base';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { ActivityIndicator } from 'react-native';

import TaskList from './taskList';
import { startLoadingSearch,openDrawer, closeDrawer } from '../../redux/actions';
import I18n from '../../translations/';

/**
 * Loads all of the tasks for the task list
 * @extends Component
 */
class TaskListLoader extends Component {

  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={()=>this.props.openDrawer(this.props.token)}>
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
            {false && <Button transparent style={{ marginTop: 8 }} onPress={Actions.messages}>
              <Icon name="mail" style={{ color: 'white' }} />
            </Button>}
            { //(this.props.user.user_role.acl.includes('company_settings') || this.props.user.user_role.acl.includes('user_settings') ) &&
            }
              <Button transparent style={{ marginTop: 8 }} onPress={Actions.settings}>
              <Icon name="settings" style={{ color: 'white' }} />
              </Button>
          </Right>
        </Header>
         <TaskList />
      </Container>
    );
  }
}

//creates function that maps actions (functions) to the redux store
const mapStateToProps = ({taskReducer,loginReducer,drawerReducer}) => {
  const {loadingData,tasks,projects,currentTask,listName} = taskReducer;
  const {user,token} = loginReducer;
  const{drawerState} = drawerReducer;
  return {user,loadingData,tasks,projects,token,drawerState,currentTask,listName};
};

//exports created Component connected to the redux store and redux actions
export default connect(mapStateToProps,{openDrawer, startLoadingSearch})(TaskListLoader);
