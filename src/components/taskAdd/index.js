import React, { Component } from 'react';
import { Tab, Tabs, Container, Header, Title, Button, Icon, Left, Right, Body} from 'native-base';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { ActivityIndicator } from 'react-native';

import TabAtributes from './tabAtributes';

import {getAttributes} from '../../redux/actions';

class TaskAdd extends Component {
  constructor(props){
    super(props);
    this.state={saveFunction:null}
  }

  setFunction(func){
    this.setState({saveFunction:func});
  }

  componentWillMount(){
    this.props.getAttributes();
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
            <Title>Task Add</Title>
          </Body>
          <Right>
            <Button transparent onPress={()=>this.state.saveFunction?this.state.saveFunction():()=>{}}>
              <Icon active style={{ color: 'white', padding:10 }} name="ios-checkmark-circle-outline" />
            </Button>
          </Right>
          </Header>
           <Tabs>
             <Tab heading="Attributes">
                 <TabAtributes projectId={this.props.projectId} saveFunction={this.setFunction.bind(this)} />
             </Tab>
           </Tabs>
      </Container>
    );
  }
}

const mapStateToProps = ({ taskR }) => {
  return { loadingData } = taskR;
};

export default connect(mapStateToProps,{getAttributes})(TaskAdd);
