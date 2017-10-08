
import React, { Component } from 'react';
import { Container, Header, Title, Button, Icon, Left, Right, Body } from 'native-base';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { ActivityIndicator } from 'react-native';
import TaskList from './taskList';
import { openDrawer, closeDrawer, getTasks, getFilteredTasks, getProjects,getFilters, startLoading, startLoadingProjects } from '../../redux/actions';
class TaskListLoader extends Component {
  componentWillMount(){
    //this.props.startLoading();
    //this.props.startLoadingProjects();
    if(this.props.filterId){
      this.props.getFilteredTasks(this.props.token,this.props.filterId);
    }
    else{
      this.props.getTasks(this.props.token,this.props.filter);
    }
    this.props.getFilters(this.props.token);
    this.props.getProjects(this.props.token);
  }
  render() {
    if(this.props.loadingData){
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
            <Title>TaskList</Title>
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

const mapStateToProps = ({taskR,login}) => {
  const {loadingData,tasks,projects} = taskR;
  const {user,token} = login;
  return {ACL:user.ACL,loadingData,tasks,projects,token};
};

export default connect(mapStateToProps,{openDrawer,getTasks,getFilteredTasks, getProjects, getFilters, startLoading, startLoadingProjects})(TaskListLoader);
