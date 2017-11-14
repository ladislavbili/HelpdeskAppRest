import React, { Component } from 'react';
import { ActivityIndicator, BackHandler, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import { View, Container, Button, Text, Content, Item, Form, Input, Label, Header, Body, Title,ListItem,Right, Icon } from 'native-base';
import jwt_decode from 'jwt-decode';

import styles from './styles';
import {loginUser,loginUserWithToken} from '../../redux/actions';
import I18n from '../../translations/';

class Login extends Component {
  constructor(props){
    super(props);
    this.state={
      username:'admin',
      password:'admin',
      user:null,
      token:null,
    }
    this.getToken.bind(this);
  }
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', () => {
      return !this.props.authenticated;
  });
  this.getToken();
}

async getToken(){
  token = await AsyncStorage.getItem('lansystem-v1-token');
  if(token){
    this.setState({user:jwt_decode(token),token});
  }
}

  render() {
      return (
      <Container>
        <Content padder style={{ backgroundColor: '#FFF', padding: 20 }}>
          <Header>
            <Body>
              <Title>{I18n.t('appName')}</Title>
            </Body>
          </Header>
          <Form>
            <Item inlineLabel>
              <Input
                placeholder={I18n.t('enterUsername')}
                value={this.state.username}
                 onChangeText={(value)=>this.setState({username:value})}
              />
            </Item>
            <Item inlineLabel last>
              <Input
                secureTextEntry={true}
                placeholder={I18n.t('enterPassword')}
                value={this.state.password}
                onChangeText={(value)=>this.setState({password:value})}
              />
            </Item>
          </Form>
          <View style={{ marginBottom: 80, marginTop: 20 }}>
            <Button
              block
              primary
              onPress={()=>this.props.loginUser(this.state.username,this.state.password)}
              disabled={this.props.loading}
            >
            {
              this.props.loading?
              <ActivityIndicator
              animating size={ 'large' }
              color='#007299' /> :
              <Text>{I18n.t('login')}</Text>
            }
            </Button>
              {
                this.props.error &&
                <Text style={styles.errorMessage}>{I18n.t('loginError')}</Text>
              }
            {
              this.state.user &&
              <ListItem button onPress={()=>this.props.loginUserWithToken(this.state.token)}>
                <Body>
                <Text style={{fontSize:17,color:'#007299'}}>Login as</Text>
                {
                  (this.state.user.name||this.state.user.surname)?<Text>Name: {this.state.user.name?this.state.user.name+' ':''}{this.state.user.surname?this.state.user.surname:''}</Text>:null
                }
                <Text>Username: {this.state.user.username}</Text>
                <Text note>E-mail: {this.state.user.email}</Text>
                </Body>
                <Right>
                  <Icon name="arrow-forward" />
                </Right>
              </ListItem>
            }
          </View>
        </Content>
      </Container>
    );
  }
}


const mapStateToProps = ({ login }) => {
  return { error, loading, authenticated } = login;
};

export default connect(mapStateToProps,{loginUser,loginUserWithToken})(Login);
