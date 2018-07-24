import React, { Component } from 'react';
import { Tab, Tabs, Container, Header, Title, Button, Icon, Left, Right, Body} from 'native-base';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { ActivityIndicator } from 'react-native';

import TabAttributesLoader from './tabAttributesLoader';
import I18n from '../../translations/';

/**
* Loads all of the data required to add a new task
* @extends Component
*/
export default class TaskAdd extends Component {
  constructor(props){
    super(props);
    this.state={saveFunction:null}
  }

  /**
  * Sets a default function for adding task that is used by a lower component (TabAtributes)
  * @param {function} func function that should be triggered when save button is pressed
  */
  setFunction(func){
    this.setState({saveFunction:func});
  }

  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={() => Actions.pop()}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>{I18n.t('addTask')}</Title>
          </Body>
          <Right>
            <Button transparent onPress={()=>this.state.saveFunction?this.state.saveFunction():()=>{}}>
              <Icon active style={{ color: 'white', padding:10 }} name="ios-checkmark-circle-outline" />
            </Button>
          </Right>
        </Header>
        <Tabs>
          <Tab heading={I18n.t('attributes')}>
            <TabAttributesLoader saveFunction={this.setFunction.bind(this)} />
          </Tab>
        </Tabs>
      </Container>
    );
  }
}
