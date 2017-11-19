
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Input, Item, Container, Header, Title, Content, Button, Icon, Text, Left, Right, Body, List, ListItem, View, CheckBox, Label } from 'native-base';
import { Actions } from 'react-native-router-flux';
import jwt_decode from 'jwt-decode';
import {logoutUser} from '../../redux/actions';
import I18n from '../../translations/';

/**
 * Decodes current JWT Token and displays data about the current user, also allowing him to log out
 * @extends Component
 */
class Account extends Component {
  constructor(props) {
    super(props);
    user=jwt_decode(this.props.token);

    this.state = {
      name:user.name,
      surname:user.surname,
      email:user.email,
      user_role:user.userRoleTitle,
      username:user.username,
    };
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
            <Title>{I18n.t('account')}</Title>
          </Body>
        </Header>
        <Content style={{ padding: 15 }}>

          <Text note>{I18n.t('username')}</Text>
          <View style={{ borderColor: '#CCCCCC', borderWidth: 0.5, marginBottom: 5 }}>
            <Input
              value={this.state.username}
              disabled={true}
              />
          </View>

          <Text note>{I18n.t('firstName')}</Text>
          <View style={{ borderColor: '#CCCCCC', borderWidth: 0.5, marginBottom: 5 }}>
            <Input
              value={this.state.name}
              disabled={true}
              />
          </View>

          <Text note>{I18n.t('surname')}</Text>
          <View style={{ borderColor: '#CCCCCC', borderWidth: 0.5, marginBottom: 5 }}>
            <Input
              value={this.state.surname}
              disabled={true}
              />
          </View>

          <Text note>{I18n.t('email')}</Text>
          <View style={{ borderColor: '#CCCCCC', borderWidth: 0.5, marginBottom: 5 }}>
            <Input
              value={this.state.email}
              disabled={true}
              />
          </View>

          <Text note>{I18n.t('userRole')}</Text>
          <View style={{ borderColor: '#CCCCCC', borderWidth: 0.5, marginBottom: 5 }}>
            <Input
              value={this.state.user_role}
              disabled={true}
              />
          </View>

          <Button danger block onPress={()=>{this.props.logoutUser();Actions.login()}}
            iconLeft style={{ flexDirection: 'row', borderColor: 'white', marginTop:5, marginBottom:20, borderWidth: 0.5 }}>
            <Icon active style={{ color: 'white' }} name="power" />
            <Text style={{ color: 'white' }} >{I18n.t('logout')}</Text>
          </Button>


        </Content>
      </Container>
    );
  }
}

//creates function that maps actions (functions) to the redux store
const mapStateToProps = ({ login }) => {
  const { token } = login;
  return { token };
};

//exports created Component connected to the redux store and redux actions
export default connect(mapStateToProps, {logoutUser})(Account);
