
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Footer, FooterTab, Container, Header, Title, Content, Button, Icon, Text, Left, Right, Body, List, ListItem, View } from 'native-base';
import { Actions } from 'react-native-router-flux';
import styles from './styles';
import I18n from '../../translations/';
import {openAddingOfUser} from '../../redux/actions';

class Settings extends Component {
  render() {
    return (
      <Container style={styles.container}>
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
          { this.props.ACL.user_settings &&
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
          { this.props.ACL.company_settings &&
          <ListItem button onPress={Actions.companiesList} icon>
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
        { this.props.ACL.user_settings &&
          <FooterTab>
            <Button onPress={this.props.openAddingOfUser} iconLeft style={{ flexDirection: 'row', borderColor: 'white', borderWidth: 0.5 }}>
              <Icon active style={{ color: 'white' }} name="add" />
              <Text style={{ color: 'white' }} >{I18n.t('settingsUser')}</Text>
            </Button>
          </FooterTab>
        }
        { this.props.ACL.company_settings &&
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
  return {ACL} = login;
};

export default connect(mapStateToProps,{openAddingOfUser})(Settings);
