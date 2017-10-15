
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Footer, FooterTab, Container, Header, Title, Content, Button, Icon, Text, Left, Right, Body, List, ListItem } from 'native-base';
import { Actions } from 'react-native-router-flux';

import I18n from '../../translations/';
import {startLoadingUser} from '../../redux/actions';

class Settings extends Component {
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
            <Title>{I18n.t('settingsTitle')}</Title>
          </Body>
          <Right>
         </Right>
        </Header>
        <Content>
          { this.props.ACL.includes('user_settings') &&
          <ListItem button onPress={Actions.userList} icon>
            <Left>
              <Icon name="person" />
            </Left>
            <Body>
              <Text>{I18n.t('settingsUsers')}</Text>
            </Body>
            <Right>
              <Icon name="arrow-forward" />
            </Right>
          </ListItem>
          }
          { this.props.ACL.includes('company_settings') &&
          <ListItem button onPress={Actions.companyList} icon>
            <Left>
              <Icon name="people" />
            </Left>
            <Body>
              <Text>{I18n.t('settingsCompanies')}</Text>
            </Body>
            <Right>
              <Icon name="arrow-forward" />
            </Right>
          </ListItem>
        }
        </Content>
        <Footer>
        { this.props.ACL.includes('user_settings') &&
          <FooterTab>
            <Button onPress={()=>{this.props.startLoadingUser();Actions.userAdd();}} iconLeft style={{ flexDirection: 'row', borderColor: 'white', borderWidth: 0.5 }}>
              <Icon active style={{ color: 'white' }} name="add" />
              <Text style={{ color: 'white' }} >{I18n.t('settingsUser')}</Text>
            </Button>
          </FooterTab>
        }
        { this.props.ACL.includes('company_settings') &&
          <FooterTab>
            <Button onPress={Actions.companyAdd} iconLeft style={{ flexDirection: 'row', borderColor: 'white', borderWidth: 0.5 }}>
              <Icon active style={{ color: 'white' }} name="add" />
              <Text style={{ color: 'white' }} >{I18n.t('company')}</Text>
            </Button>
          </FooterTab>
        }
        </Footer>
      </Container>
    );
  }
}
const mapStateToProps = ({ login }) => {
  const {user} = login;
  return {ACL:user.ACL};
};

export default connect(mapStateToProps,{startLoadingUser})(Settings);
