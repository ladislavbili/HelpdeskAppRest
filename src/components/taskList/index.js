
import React, { Component } from 'react';
import {ActivityIndicator} from 'react-native';
import { Container, Header, Title, Button, Icon, Left, Right, Body } from 'native-base';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import TaskList from './taskList';
import styles from './styles';
import { openDrawer, closeDrawer, getTasks } from '../../redux/actions';
class TaskListLoader extends Component {
  componentWillMount(){
    this.props.getTasks(this.props.token,this.props.projectId);
  }
  render() {
      if(this.props.loading){
        return (<ActivityIndicator
          animating size={ 'large' }
          color='#007299' />);
      }
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

const mapStateToProps = ({task,login}) => {
  const {loading} = task;
  const {token} = login.user;
  return {loading,token};
};

export default connect(mapStateToProps,{openDrawer,getTasks})(TaskListLoader);
