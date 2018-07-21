
import React, { Component } from 'react';
import { Container, Header, Title, Button, Icon, Left, Right, Body } from 'native-base';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { ActivityIndicator } from 'react-native';

import TaskList from './taskList';
import { openDrawer, getTasks, setTasksLoading, getFilterTasks, setOpenedID } from '../../redux/actions';
import I18n from '../../translations/';

/**
 * Loads all of the tasks for the task list
 * @extends Component
 */
class TaskListLoader extends Component {
  constructor(props){
    super(props);
    this.getOpenedID.bind(this);

    if(this.props.drawerState==='closed'){
      if(!this.props.filter && !this.props.filterID){
        this.props.setTasksLoading(true);
      }
      else if(this.props.filter && this.props.openedID!==this.getOpenedID()){
        this.props.setOpenedID(this.getOpenedID());
        this.props.setTasksLoading(false);
        this.props.getTasks(this.props.filter,this.props.token);
      }else if(this.props.filterID && this.props.openedID!==this.getOpenedID()){
        this.props.setOpenedID(this.getOpenedID());
        this.props.setTasksLoading(false);
        this.props.getFilterTasks(this.props.filterID,this.props.token);
      }
    }
  }

  getOpenedID(){
    if(this.props.filter){
      return JSON.stringify(this.props.filter);
    }else if(this.props.filterID){
      return this.props.filterID;
    }else{
      return null;
    }
  }

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
            <Button transparent style={{ marginTop: 8 }} onPress={Actions.search}>
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
        {
          this.props.tasksLoaded &&
          <TaskList />
        }
        {
          !this.props.tasksLoaded &&
          <ActivityIndicator
            animating size={ 'large' }
            color='#007299' />
        }
      </Container>
    );
  }
}

//creates function that maps actions (functions) to the redux store
const mapStateToProps = ({taskReducer,loginReducer, drawerReducer}) => {
  const {tasksLoaded,tasks, openedID} = taskReducer;
  const {drawerState} = drawerReducer;
  const {token} = loginReducer;
  return {tasksLoaded,tasks,openedID,drawerState, token};
};

//exports created Component connected to the redux store and redux actions
export default connect(mapStateToProps,{ openDrawer, getTasks, setTasksLoading, getFilterTasks, setOpenedID })(TaskListLoader);
