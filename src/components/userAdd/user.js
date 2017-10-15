
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Input, Item, Container, Header, Title, Content, Button, Icon, Text, Left, Right, Body, List, ListItem, View, CheckBox, Label } from 'native-base';
import { Actions } from 'react-native-router-flux';
import {Modal} from 'react-native';


import I18n from '../../translations/';
import {addUser} from '../../redux/actions';

class UserAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name:'',
      surname:'',
      email:'',
      company:this.props.companies[0],
      password:'',
      signature:'',
      selectingCompany:false,
      filterWord:'',
      active:false,
      user_role:this.props.user_roles[0],
      selectingUserRole:false,
      filterWordUserRole:'',
      signatureHeight:0,
      username:'',
      func:'',
      mobile:'',
      tel:'',
    };
  }

  submit(){
    let user = {
        email:this.state.email,
        username:this.state.username,
        password:this.state.password
    }
    let detailData={
      surname:this.state.surname,
      name:this.state.name,
      signature:this.state.signature,
      function:this.state.func,
      mobile:this.state.mobile,
      tel:this.state.tel
    }
    this.props.addUser( user, detailData,this.state.company.id,this.state.user_role.id,this.props.token);
    Actions.pop();
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
            <Title>{I18n.t('settingsAddUserTitle')}</Title>
          </Body>
          <Right>
            {
              (this.state.password.length>7) &&
              this.state.username.length!=0 &&
              this.state.email.length!=0 &&
              <Button transparent onPress={this.submit.bind(this)}>
                <Icon active style={{ color: 'white', padding:10 }} name="ios-checkmark-circle-outline" />
              </Button>
            }
          </Right>
        </Header>
        <Content style={{ padding: 15 }}>

        <Item inlineLabel style={{marginBottom:20, borderWidth:0,marginTop:10,paddingBottom:5}}>
        <CheckBox checked={this.state.active} color='#3F51B5' onPress={()=>this.setState({active:!this.state.active})}/>
          <Label style={{marginLeft:15}}>{I18n.t('settingsActive')}</Label>
        </Item>

        <Text note>First Name</Text>
        <View style={{ borderColor: '#CCCCCC', borderWidth: 0.5, marginBottom: 15 }}>
          <Input
            placeholder="First Name"
            value={this.state.name}
            onChangeText={(value)=>this.setState({name:value})}
          />
        </View>

        <Text note>Surname</Text>
        <View style={{ borderColor: '#CCCCCC', borderWidth: 0.5, marginBottom: 15 }}>
          <Input
            placeholder="Surname"
            value={this.state.surname}
            onChangeText={(value)=>this.setState({surname:value})}
          />
        </View>


          <Text note>{I18n.t('homeMail')}</Text>
          <View style={{ borderColor: '#CCCCCC', borderWidth: 0.5, marginBottom: 15 }}>
            <Input
            placeholder={I18n.t('homeMail')}
            value={this.state.email}
            onChangeText={(value)=>this.setState({email:value})}
            />
            {
              this.state.email.length==0 && <Text note style={{color:'red'}}>You must have an e-mail</Text>
            }

          </View>

          <Text note>Password</Text>
          <View style={{ borderColor: '#CCCCCC', borderWidth: 0.5, marginBottom: 15 }}>
            <Input
              secureTextEntry={true}
              placeholder="Password"
              value={this.state.password}
              onChangeText={(value)=>this.setState({password:value})}
            />
            {
              this.state.password.length<8  && <Text note style={{color:'red'}}>Password has to be at least 8 characters</Text>
            }
          </View>

          <Text note>{I18n.t('company')}</Text>
          <View style={{ borderColor: '#CCCCCC', borderWidth: 0.5, marginBottom: 15 }}>
            <Button block style={{backgroundColor:'white'}} onPress={()=>this.setState({selectingCompany:true})}>
              <Left>
                <Text style={{textAlign:'left',color:'black'}}>{this.state.company==null ? I18n.t('taskAddCompanySelect') : this.state.company.title}</Text>
              </Left>
            </Button>
          </View>

          <Text note>{I18n.t('userRole')}</Text>
          <View style={{ borderColor: '#CCCCCC', borderWidth: 0.5, marginBottom: 15 }}>
            <Button block style={{backgroundColor:'white'}} onPress={()=>this.setState({selectingUserRole:true})}>
              <Left>
                <Text style={{textAlign:'left',color:'black'}}>{this.state.user_role.title}</Text>
              </Left>
            </Button>
          </View>

          <Text note>{I18n.t('username')}</Text>
          <View style={{ borderColor: '#CCCCCC', borderWidth: 0.5, marginBottom: 15 }}>
            <Input
            placeholder={I18n.t('username')}
            value={this.state.username}
            onChangeText={(value)=>this.setState({username:value})}
            />
            {
              this.state.username.length==0 && <Text note style={{color:'red'}}>You must have an username</Text>
            }

          </View>

          <Text note>{I18n.t('func')}</Text>
          <View style={{ borderColor: '#CCCCCC', borderWidth: 0.5, marginBottom: 15 }}>
            <Input
            placeholder={I18n.t('func')}
            value={this.state.func}
            onChangeText={(value)=>this.setState({func:value})}
            />
          </View>

          <Text note>{I18n.t('mobile')}</Text>
          <View style={{ borderColor: '#CCCCCC', borderWidth: 0.5, marginBottom: 15 }}>
            <Input
            placeholder={I18n.t('mobile')}
            value={this.state.mobile}
            keyboardType="numeric"
            onChangeText={(value)=>this.setState({mobile:value})}
            />
          </View>

          <Text note>{I18n.t('tel')}</Text>
          <View style={{ borderColor: '#CCCCCC', borderWidth: 0.5, marginBottom: 15 }}>
            <Input
            placeholder={I18n.t('tel')}
            value={this.state.tel}
            onChangeText={(value)=>this.setState({tel:value})}
            keyboardType="numeric"
            />
          </View>

          <Text note>{I18n.t('settingsSignature')}</Text>
          <View style={{ borderColor: '#CCCCCC', borderWidth: 0.5, marginBottom: 15 }}>
            <Input
            style={{height:Math.max(35, this.state.signatureHeight)}}
            onContentSizeChange={(event) => this.setState({ signatureHeight: event.nativeEvent.contentSize.height })}
            multiline={true}
            placeholder={I18n.t('settingsSignature')}
            value={this.state.signature}
            onChangeText={(value)=>this.setState({signature:value})}

             />
          </View>

          <Modal
              animationType={"fade"}
              transparent={false}
              style={{flex:1}}
              visible={this.state.selectingCompany}
              onRequestClose={() => this.setState({selectingCompany:false})}>
            <Header>
              <Body>
              <Title>{I18n.t('taskAddCompanySelect')}</Title>
              </Body>
            </Header>
            <Content style={{ padding: 15 }}>

            <ListItem>
              <Item rounded>
                <Icon name="ios-search" />
                <Input placeholder={I18n.t('search')} value={this.state.filterWord} onChangeText={((value)=>this.setState({filterWord:value}))} />
              </Item>
            </ListItem>

            <List>
            {
              this.props.companies.map((company) =>
              company.title.toLowerCase().includes(this.state.filterWord.toLowerCase()) && <ListItem button key={company.id} onPress={()=>this.setState({company:company,selectingCompany:false})} >
                <Body>
                  <Text>{company.title}</Text>
                </Body>
                <Right>
                  <Icon name="arrow-forward" />
                </Right>
              </ListItem>
            )
            }
            </List>
            </Content>
          </Modal>

          <Modal
              animationType={"fade"}
              transparent={false}
              style={{flex:1}}
              visible={this.state.selectingUserRole}
              onRequestClose={() => this.setState({selectingUserRole:false})}>
            <Header>
              <Body>
              <Title>{I18n.t('taskAddUserRoleSelect')}</Title>
              </Body>
            </Header>
            <Content style={{ padding: 15 }}>

            <ListItem>
              <Item rounded>
                <Icon name="ios-search" />
                <Input placeholder={I18n.t('search')} value={this.state.filterWordUserRole} onChangeText={((value)=>this.setState({filterWordUserRole:value}))} />
              </Item>
            </ListItem>

            <List>
            {
              this.props.user_roles.map((role) =>
              role.title.toLowerCase().includes(this.state.filterWordUserRole.toLowerCase()) && <ListItem button key={role.id} onPress={()=>this.setState({user_role:role,selectingUserRole:false})} >
                <Body>
                  <Text>{role.title}</Text>
                </Body>
                <Right>
                  <Icon name="arrow-forward" />
                </Right>
              </ListItem>
            )
            }
            </List>
            </Content>
          </Modal>

        </Content>
      </Container>
    );
  }
}

const mapStateToProps = ({ companyR, userR,login }) => {
  const { user_roles} = userR;
  const { companies } = companyR;
  const { token } = login;
  return { companies, token, user_roles};
};

export default connect(mapStateToProps, {addUser})(UserAdd);