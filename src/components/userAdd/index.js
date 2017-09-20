
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
      email:'',
      company:this.props.companies[0],
      password:'',
      signature:'',
      selectingCompany:false,
      filterWord:'',
      active:true,
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
    let newUser = {
        is_active:this.state.active, user_role:{id:this.state.user_role.id},email:this.state.email,
        username:this.state.username,name:this.state.name,company:{id:this.state.company.id,title:this.state.company.title},
        function:this.state.func,mobile:this.state.mobile,tel:this.state.tel, signature:this.state.signature
    }
    let listUser = {
      username:this.state.username,
      name:this.state.name,
      email: this.state.email
    }
    this.props.addUser(newUser, listUser);
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
            <Button transparent onPress={this.submit.bind(this)}>
              <Icon active style={{ color: 'white', padding:10 }} name="ios-checkmark-circle-outline" />
            </Button>
          </Right>
        </Header>
        <Content style={{ padding: 15 }}>

          <Item inlineLabel style={{marginBottom:20, borderWidth:0,marginTop:10,paddingBottom:5}}>
          <CheckBox checked={this.state.active} color='#3F51B5' onPress={()=>this.setState({active:!this.state.active})}/>
            <Label style={{marginLeft:15}}>{I18n.t('settingsActive')}</Label>
          </Item>

          <Text note>{I18n.t('settingsName')}</Text>
          <View style={{ borderColor: '#CCCCCC', borderWidth: 0.5, marginBottom: 15 }}>
          <Input
            placeholder={I18n.t('settingsName')}
            value={this.state.name}
            onChangeText={(value)=>this.setState({name:value})}
          />
          </View>


          <Text note>{I18n.t('homeMail')}</Text>
          <View style={{ borderColor: '#CCCCCC', borderWidth: 0.5, marginBottom: 15 }}>
            <Input
            placeholder={I18n.t('homeMail')}
            value={this.state.email}
            onChangeText={(value)=>this.setState({email:value})}
            />
          </View>

          <Text note>{I18n.t('homePass')}</Text>
          <View style={{ borderColor: '#CCCCCC', borderWidth: 0.5, marginBottom: 15 }}>
            <Input
              secureTextEntry={true}
              placeholder={I18n.t('homePass')}
              value={this.state.password}
              onChangeText={(value)=>this.setState({password:value})}
            />
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

const mapStateToProps = ({ taskData }) => {
  return { companies, user_roles } = taskData;
};

export default connect(mapStateToProps, {addUser})(UserAdd);
