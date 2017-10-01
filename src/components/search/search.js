import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Input, Picker, Item, Container, Header, Title, Content, Button, Icon, Text, Left, Body, View } from 'native-base';
import { Actions } from 'react-native-router-flux';
import I18n from '../../translations/';

class Search extends Component {

  constructor(props) {
    super(props);
    this.state = {
      title:'',
      createdBy:[],
      requestedBy:[],
      assignedTo:[],
      statuses:[],
      projects:[],
      companies:[],
      labels:[]
    }
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
            <Title>{I18n.t('search')}</Title>
          </Body>
        </Header>
        <Content style={{ padding: 15 }}>
          <View style={{ borderColor: '#CCCCCC', borderWidth: 0.5, marginBottom: 15 }}>
            <Input
              placeholder="Task title"
              value={ this.state.title }
              onChangeText={ value => this.setState({title:value}) }
            />
          </View>
          <Button onPress={()=>Actions.taskList({filter:{search:this.state.title}})} primary block style={{ margin: 15 }}>
            <Text>{I18n.t('search')}</Text>
          </Button>
      </Content>
    </Container>
    );
  }
}
const mapStateToProps = ({ taskR, login, userR, companyR }) => {
  const { users } = userR;
  const { companies } = companyR;
  const { statuses, projects,labels} = taskR;
  return { users, companies,statuses, projects, labels};
};

export default connect(mapStateToProps,{})(Search);
