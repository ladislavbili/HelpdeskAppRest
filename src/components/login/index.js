import React, { Component } from 'react';
import { View,ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { Container, Button, Text, Content, Item, Form, Input, Label, Header, Body, Title } from 'native-base';
import styles from './styles';

class Login extends Component {

  constructor(props){
    super(props);
    this.state={
      username:'admin',
      password:'admin',
      errorMessage:'',
      loading:false,
    }
  }
  async submitLogin(){
    this.setState(
      {working:true}
    );
    let username=this.state.username;
    let password = this.state.pass;
    this.setState(
      {working:false}
    );
  }

  render() {
      return (
      <Container>
        <Content padder style={{ backgroundColor: '#FFF', padding: 20 }}>
          <Header>
            <Body>
              <Title>HelpdeskApp</Title>
            </Body>
          </Header>
          <Form>
            <Item inlineLabel>
              <Input
                placeholder="Username"
                value={this.state.username}
                 onChangeText={(value)=>this.setState({username:value})}
              />
            </Item>
            <Item inlineLabel last>
              <Input
                secureTextEntry={true}
                placeholder="Password"
                value={this.state.password}
                onChangeText={(value)=>this.setState({password:value})}
              />
            </Item>
          </Form>
          <View style={{ marginBottom: 80, marginTop: 20 }}>
            <Button
              block
              primary
              onPress={this.submitLogin.bind(this)}
              disabled={this.state.loading}
            >
            {
              this.state.loading?
              <ActivityIndicator
              animating size={ 'large' }
              color='#007299' /> :
              <Text>Login</Text>
            }
            </Button>
          <Text style={styles.errorMessage}>{this.state.errorMessage}</Text>
          </View>
        </Content>
      </Container>
    );
  }
}

function bindActions(dispatch) {
  return {
  };
}

const mapStateToProps = state => ({
});

export default Login;
