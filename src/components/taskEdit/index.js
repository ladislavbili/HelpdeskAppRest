import React, { Component } from 'react';
import { Tab, Tabs, Container, Header, Title, Button, Icon, Left, Right, Body} from 'native-base';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { ActivityIndicator } from 'react-native';

import TabAtributes from './tabAtributes';
import TabComments from './tabComments';
import TabItems from './tabItems';

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
      <Container>
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
                 <TabAtributes id={this.props.id} fromFilter={this.props.fromFilter} />
             </Tab>
             <Tab heading="Comments">
                 <TabComments id={this.props.id} />
             </Tab>
             <Tab heading="Items">
                 <TabItems id={this.props.id} />
             </Tab>
           </Tabs>
      </Container>
    );
  }
}

const mapStateToProps = ({ taskData }) => {
  return { loadingData} = taskData;
};

export default connect(mapStateToProps,{getTaskAttributes})(TaskEdit);
