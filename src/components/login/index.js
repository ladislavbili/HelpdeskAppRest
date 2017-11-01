import React, { Component } from 'react';
import { ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { View, Container, Button, Text, Content, Item, Form, Input, Label, Header, Body, Title } from 'native-base';

import styles from './styles';
import {loginUser} from '../../redux/actions';
import I18n from '../../translations/';

class Login extends Component {
  constructor(props){
    super(props);
    this.state={
      username:'admin',
      password:'admin',
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
          </View>
        </Content>
      </Container>
    );
  }
}


const mapStateToProps = ({ login }) => {
  return { error, loading, authenticated } = login;
};

export default connect(mapStateToProps,{loginUser})(Login);
