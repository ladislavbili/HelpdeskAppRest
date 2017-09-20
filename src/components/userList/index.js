import {ActivityIndicator} from 'react-native';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {  Item, Footer, FooterTab, Container, Header, Title, Content, Button, Icon, Text, Left, Right, Body, List, ListItem, Input } from 'native-base';
import { Actions } from 'react-native-router-flux';

import I18n from '../../translations/';
import {getUsers,startLoading,openAddingOfUser,openEditingOfUser} from '../../redux/actions';


class userList extends Component {
  constructor(props) {
    super(props);
    this.state={seached:''}
  }

  componentWillMount(){
    this.props.startLoading();
    this.props.getUsers();
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
            <Title>{I18n.t('settingsUsersListTitle')}</Title>
          </Body>
        </Header>
        <Content>
        <Item rounded style={{marginTop:15,marginBottom:15,marginLeft: 20, marginRight: 20,}}>
          <Icon name="ios-search" />
          <Input placeholder={I18n.t('search')}
          value={this.state.seached}
          onChangeText={((value)=>this.setState({seached:value}))} />
        </Item>

          <List
            dataArray={
              this.props.users.filter((user)=>
              {
                let filter=this.state.seached.toLowerCase();
                return (user.name&&user.name.toLowerCase().includes(filter))||(user.email&&user.email.toLowerCase().includes(filter))||(user.company&&user.company.name&&user.company.name.toLowerCase().includes(filter))
              })
              }
            renderRow={(user)=>
              <ListItem
                button onPress={()=>this.props.openEditingOfUser(user.id)}
              >
                <Body>
                {
                  (user.name)?<Text>{user.name}</Text>:null
                }
                <Text note>{user.email}</Text>
                </Body>
                <Right>
                  <Icon name="arrow-forward" />
                </Right>
              </ListItem>
            }
          />
        </Content>
        <Footer>
          <FooterTab>
            <Button onPress={this.props.openAddingOfUser} iconLeft style={{ flexDirection: 'row', borderColor: 'white', borderWidth: 0.5 }}>
              <Icon active style={{ color: 'white' }} name="add" />
              <Text style={{ color: 'white' }} >{I18n.t('settingsUser')}</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}

const mapStateToProps = ({ taskData }) => {
  const { users, loadingData } = taskData;
  return { users, loadingData };
};

export default connect(mapStateToProps, {getUsers,startLoading,openAddingOfUser,openEditingOfUser})(userList);
