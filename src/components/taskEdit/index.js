import React, { Component } from 'react';
import { Tab, Tabs, Container, Header, Title, Button, Icon, Left, Right, Body} from 'native-base';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { ActivityIndicator } from 'react-native';

import TabAtributes from './tabAtributes';
import styles from './styles';
import {getTaskAttributes} from '../../redux/actions';


class TaskEdit extends Component {
  componentWillMount(){
    this.props.getTaskAttributes(this.props.id);
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
      <Container style={styles.container}>
        <Header>
          <Left>
          <Button transparent onPress={() => Actions.pop()}>
            <Icon name="arrow-back" />
          </Button>
          </Left>
          <Body>
            <Title>Task Edit</Title>
          </Body>
          <Right />
        </Header>
           <Tabs>
               <Tab heading="Attributes">
                   <TabAtributes id={this.props.id} />
               </Tab>
           </Tabs>
      </Container>
    );
  }
}

const mapStateToProps = ({ task }) => {
  return { loadingData} = task;
};

export default connect(mapStateToProps,{getTaskAttributes})(TaskEdit);
