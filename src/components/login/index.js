import React, { Component } from 'react';
import { ActivityIndicator, BackHandler, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import { View, Container, Button, Text, Content, Item, Form, Input, Label, Header, Body, Title,ListItem,Right, Icon } from 'native-base';
import jwt_decode from 'jwt-decode';

import { USERS_LIST } from '../../redux/urls';
import styles from './styles';
import {loginUser,loginUserWithToken,setToken} from '../../redux/actions';
import I18n from '../../translations/';

/**
  * Component controlling the login screen
  * @extends Component
  */
class Login extends Component {
  constructor(props){
    super(props);
    this.state={
      username:'admin',
      password:'admin',
      user:null,
    }
    this.getToken.bind(this);
  }
  /**
    * After the component is mounted, we dont allow user to go back if he's not logged in
    */
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', () => {
      return !this.props.authenticated;
    });
    this.getToken();
  }

  /**
    * Asynchronously tries to get a token from mobile's memory.If this succeeds the token is vertified and decoded as a user
    * @return {Promise} [description]
    */
  async getToken(){
    let token = await AsyncStorage.getItem('lansystem-v1-token');
    if(token){
      this.props.setToken(token);
      let check = await fetch(USERS_LIST+'/'+jwt_decode(this.props.token).id, {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + token
        }
      });
      if(check.ok){
        this.setState({user:jwt_decode(token)});
      }
      else{
        this.props.setToken(null);
      }
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
                this.props.token && this.state.user &&
                <ListItem button onPress={()=>this.props.loginUserWithToken(this.props.token)}>
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


  //creates function that maps actions (functions) to the redux store
  const mapStateToProps = ({ login }) => {
    return { error, loading, authenticated, token } = login;
  };

  //exports created Component connected to the redux store and redux actions
  export default connect(mapStateToProps,{loginUser,loginUserWithToken, setToken})(Login);
