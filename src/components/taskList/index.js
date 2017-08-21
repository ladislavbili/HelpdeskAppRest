
import React, { Component } from 'react';
import { Container, Header, Title, Button, Icon, Left, Right, Body } from 'native-base';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import TaskList from './taskList';
import styles from './styles';
import { openDrawer, closeDrawer } from '../../redux/actions/drawerActions';
class TaskListLoader extends Component {
  render() {
      return (
        <Container style={styles.container}>
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
              <Button transparent style={{ marginTop: 8 }} onPress={Actions.settings}>
                <Icon name="settings" style={{ color: 'white' }} />
              </Button>
            </Right>
          </Header>
           <TaskList/>
        </Container>
      );
  }
}

const mapStateToProps = (state) => {
  return { };
};

export default connect(mapStateToProps,{openDrawer})(TaskListLoader);
