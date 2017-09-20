
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Footer, FooterTab, Container, Content, Button, Icon, Text, List } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { startLoading } from '../../redux/actions';
import TaskListRow from './taskListRow';

class TaskList extends Component {
  render() {
    return (
      <Container>
        <Content>
          <List>
          {
            this.props.tasks.map((task) => <TaskListRow task={task} key={task.id} />)
          }
          </List>
        </Content>
      { this.props.ACL.create_tasks_in_all_projects &&
        <Footer>
          <FooterTab>
            <Button vertical onPress={()=>{this.props.startLoading();Actions.taskAdd({projectId:this.props.projectId?this.props.projectId:null});}}>
              <Icon name="md-add" style={{ color: 'white' }} />
              <Text style={{ color: 'white' }} >Task</Text>
            </Button>
          </FooterTab>
        </Footer>
      }
      </Container>
    );
  }
}

const mapStateToProps = ({ taskR, login }) => {
  const { tasks } = taskR;
  const { ACL } = login;
  return {tasks, ACL};
};

export default connect(mapStateToProps, {startLoading})(TaskList);
