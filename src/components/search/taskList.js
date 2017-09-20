
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ActivityIndicator } from 'react-native';
import { Footer, FooterTab, Container, Content, Button, Icon, Text, Left, Right, Body, List, ListItem, View } from 'native-base';
import { Actions } from 'react-native-router-flux';
import TaskListRow from './taskListRow';

class TaskList extends Component {
  render() {
    if(this.props.searching){
      return (
        <ActivityIndicator
          animating size={ 'large' }
          color='#007299'
        />
      );
    }
    return (
      <Container>
        <Content>
          <List>
          {
            this.props.tasks.map((task) => <TaskListRow task={task} key={task.id} />)
          }
          </List>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = ({ taskData, login }) => {
  const { searchedTasks,searching } = taskData;
  const { ACL } = login;
  return {tasks:searchedTasks,searching, ACL};
};

export default connect(mapStateToProps, {})(TaskList);
