import React, { Component } from 'react';
import { Tab, Tabs, Container, Header, Title, Button, Icon, Left, Right, Body} from 'native-base';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { ActivityIndicator, Alert, BackHandler } from 'react-native';

import TabAttributesLoader from './tabAttributesLoader';
import TabComments from './tabComments';
import TabItems from './tabItems';
import I18n from '../../translations/';

/**
 * This component creates a main menu for the task editting
 * @extends Component
 */
export default class TaskEdit extends Component {
  constructor(props){
    super(props);
    this.state={saveFunction:null, canSave:false, changed:false}
  }

  /**
  * Sets a default function for saving editted task that is used by a lower component (TabAtributes)
  * @param {function} func function that should be triggered when save button is pressed
  */
  setFunction(func,canSave){
    this.setState({saveFunction:func,canSave});
  }

/**
 * Changes if the task needs to be saved
 */
  inputChanged(changed){
    this.setState({changed});
  }

  /**
   * Before this component is loaded all of the required data should start fetching from the REST API, also
   * sets the hardware back button to show message about leaving unsaved task
   */
   componentWillMount(){
     BackHandler.addEventListener('hardwareBackPress', () => {
       if(this.state.changed){
         this.leaveTask();
       }
       return this.state.changed;
     });
   }

   /**
    * Warns user and asks him if he wants to discard all of the changes
    */
    leaveTask(){
      Alert.alert(
        I18n.t('discardChanges'),
        I18n.t('discardChangesMessage'),
        [
          {text: I18n.t('cancel'), style: 'cancel'},
          {text: I18n.t('ok'), onPress: () =>{
            Actions.pop();
          }},
        ],
        { cancelable: true }
      )
    }


  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={this.state.changed?this.leaveTask:Actions.pop}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>{I18n.t('editTask')}</Title>
          </Body>
          {
            this.state.canSave && this.state.changed && (<Right>
              <Button transparent onPress={()=>this.state.saveFunction?this.state.saveFunction():()=>{}}>
                <Icon active style={{ color: 'white', padding:10 }} name="ios-checkmark-circle-outline" />
              </Button>
            </Right>)
          }
        </Header>
        <Tabs>
          <Tab heading={I18n.t('attributes')}>
            <TabAttributesLoader id={this.props.id} saveFunction={this.setFunction.bind(this)} inputChanged={this.inputChanged.bind(this)} />
          </Tab>
          <Tab heading={I18n.t('comments')}>
            <TabComments id={this.props.id} />
          </Tab>
          <Tab heading={I18n.t('items')}>
            <TabItems id={this.props.id} />
          </Tab>
        </Tabs>
      </Container>
    );
  }
}
