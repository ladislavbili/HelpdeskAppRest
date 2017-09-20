
import React, { Component } from 'react';
import { Container, Header, Title, Button, Icon, Left, Right, Body } from 'native-base';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { ActivityIndicator } from 'react-native';
import TaskList from './taskList';
import { openDrawer, closeDrawer, getTasksAndProjects } from '../../redux/actions';
class TaskListLoader extends Component {
  componentWillMount(){
    this.props.getTasksAndProjects();
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
            { (this.props.ACL.company_settings || this.props.ACL.user_settings ) &&
              <Button transparent style={{ marginTop: 8 }} onPress={Actions.settings}>
              <Icon name="settings" style={{ color: 'white' }} />
              </Button>
            }
          </Right>
        </Header>
         <TaskList/>
      </Container>
    );
  }
}

const mapStateToProps = ({taskData,login}) => {
  const {loadingData,tasks,projects} = taskData;
  const {ACL} = login;
  return {ACL,loadingData,tasks,projects};
};

export default connect(mapStateToProps,{openDrawer,getTasksAndProjects})(TaskListLoader);
