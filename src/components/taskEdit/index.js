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
  constructor(props){
    super(props);
    this.state={saveFunction:null, canSave:false, changed:false}
  }

  setFunction(func,canSave){
    this.setState({saveFunction:func,canSave});
  }

  inputChanged(){
    this.setState({changed:true});
  }

  componentWillMount(){
    this.props.getTaskAttributes(this.props.id, this.props.token);
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
          {
            this.state.canSave && this.state.changed && (<Right>
              <Button transparent onPress={()=>this.state.saveFunction?this.state.saveFunction():()=>{}}>
                <Icon active style={{ color: 'white', padding:10 }} name="ios-checkmark-circle-outline" />
              </Button>
            </Right>)
          }
          </Header>
           <Tabs>
             <Tab heading="Attributes">
                 <TabAtributes id={this.props.id} fromFilter={this.props.fromFilter} saveFunction={this.setFunction.bind(this)} inputChanged={this.inputChanged.bind(this)} />
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

const mapStateToProps = ({ taskR, login }) => {
  const { loadingData } = taskR;
  const { token } = login;
  return { loadingData, token };
};

export default connect(mapStateToProps,{getTaskAttributes})(TaskEdit);
