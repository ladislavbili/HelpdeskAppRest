
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Footer, FooterTab, Container, Content, Button, Icon, Text, Left, Right, Body, List, ListItem, View } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { openDrawer, closeDrawer } from '../../redux/actions/drawerActions';
import TaskListRow from './taskListRow';
import styles from './styles';

class TaskList extends Component {
  render() {
    return (
      <Container style={styles.container}>
        <Content>
          <List>
          {
            this.props.allTasks.map((data) => <TaskListRow data={data} key={data.id} />)
          }
          </List>
        </Content>
        <Footer>
          <FooterTab>
            <Button vertical onPress={Actions.projectAdd}>
              <Icon active style={{ color: 'white' }} name="md-add" />
              <Text style={{ color: 'white' }} >Project</Text>
            </Button>
          </FooterTab>

          <FooterTab>
            <Button vertical onPress={()=>Actions.taskAdd({projectId:this.props.projectId})}>
              <Icon name="md-add" style={{ color: 'white' }} />
              <Text style={{ color: 'white' }} >Task</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}

const mapStateToProps = ({ task }) => {
  return { allTasks:task.tasks};
};

export default connect(mapStateToProps, {})(TaskList);
