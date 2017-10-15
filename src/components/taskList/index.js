
import React, { Component } from 'react';
import { Container, Header, Title, Button, Icon, Left, Right, Body } from 'native-base';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { ActivityIndicator } from 'react-native';
import TaskList from './taskList';
import { openDrawer, closeDrawer, getTasks, getFilteredTasks, getProjects,getFilters, startLoading, startLoadingProjects, setLastTask } from '../../redux/actions';
class TaskListLoader extends Component {
  componentWillMount(){
    if(this.props.drawerState=='closed'){
      if(this.props.id!=this.props.currentTask){
        return;
      }
      this.props.setLastTask();
      if(this.props.filterId){
        this.props.getFilteredTasks(this.props.token,this.props.filterId);
      }
      else if(this.props.filter){
        this.props.getTasks(this.props.token,this.props.filter);
      }
    }
    else{
      this.props.getFilters(this.props.token);
      this.props.getProjects(this.props.token);
    }
  }
  render() {
    if(this.props.id+1!=this.props.currentTask && this.props.id ){
      return (
        <ActivityIndicator
        animating size={ 'large' }
        color='#007299' />
      )
    }
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={this.props.openDrawer}>
              <Icon name="menu" />
            </Button>
          </Left>
          <Body>
            <Title>{this.props.title?this.props.title:'TaskList'}</Title>
          </Body>
          <Right>
            <Button transparent style={{ marginTop: 8 }} onPress={Actions.search}>
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
  const {loadingData,tasks,projects,currentTask} = taskR;
  const {user,token} = login;
  const{drawerState} = drawer;
  return {ACL:user.ACL,loadingData,tasks,projects,token,drawerState,currentTask};
};

export default connect(mapStateToProps,{openDrawer,getTasks,getFilteredTasks, getProjects, getFilters, startLoading, startLoadingProjects, setLastTask})(TaskListLoader);
