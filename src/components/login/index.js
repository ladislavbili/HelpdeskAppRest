import React, { Component } from 'react';
import { ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { View, Container, Button, Text, Content, Item, Form, Input, Label, Header, Body, Title } from 'native-base';
import styles from './styles';
import {loginUser} from '../../redux/actions';

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
              onPress={()=>this.props.loginUser(this.state.username,this.state.password)}
              disabled={this.props.loading}
            >
            {
              this.props.loading?
              <ActivityIndicator
              animating size={ 'large' }
              color='#007299' /> :
              <Text>Login</Text>
            }
            </Button>
              <Text style={styles.errorMessage}>{this.props.error}</Text>
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
