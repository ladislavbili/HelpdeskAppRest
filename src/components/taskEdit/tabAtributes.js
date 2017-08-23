import React, { Component } from 'react';
import { Modal } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { View, Body, Container, Content, Icon, Input, Item, Label, Text, Footer, FooterTab, Button, Picker,  ListItem, Header,Title , Left, Right, List } from 'native-base';

import I18n from '../../translations';
import styles from './styles';

class TabAtributes extends Component {
  constructor(props) {
    super(props);
    console.log(this.props.task);
    this.state = {
      taskName:this.props.task.title?this.props.task.title:'',
      taskDescription:this.props.task.description?this.props.task.description:'',
      assignedTo:this.props.task.assignedTo?this.props.users[this.props.users.findIndex((item)=>item.id==this.props.task.assignedTo.id)]:null,
      requester:this.props.task.requestedBy?this.props.users[this.props.users.findIndex((item)=>item.id==this.props.task.requestedBy.id)]:null,
      status:this.props.task.status?this.props.statuses[this.props.statuses.findIndex((item)=>item.id==this.props.task.id)]:this.props.statuses[0],
      duration:this.props.task.work_time?this.props.task.work_time.toString():'0',
      descriptionHeight:100,
      company:this.props.task.company?this.props.companies[this.props.companies.findIndex((item)=>item.id==this.props.task.company.id)]:null,
      project:this.props.task.project?this.props.task.project.id:this.props.projects[0].id,
      statusChangedAt:this.props.task.statusChangedAt?this.props.task.statusChangedAt.toString():'',
      selectingCompany:false,
      filterWord:'',
      selectingRequester:false,
      filterWordRequester:'',
      selectingAssignedTo:false,
      filterWordAssignedTo:'',
    }
    this.setWorkTime.bind(this);
  }



  setWorkTime(input) {
    if(!/^\d*$/.test(input)){
      return;
    }
    if(input.length==2 && input[0]=='0'){
      this.setState({duration:input[1]});
    }
    else{
      this.setState({duration:input});
    }
  }

  submitForm(){
    Actions.pop();
  }

  render() {
    let statusButtonStyle={backgroundColor:this.state.status.color,flex:1};
    return (
      <Container>
        <Content style={{ padding: 15 }}>
          <Text note>{I18n.t('taskAddTaskName')}</Text>
          <View style={{ borderColor: '#CCCCCC', borderWidth: 0.5, marginBottom: 15 }}>
            <Input
              placeholder={I18n.t('taskAddTaskNameLabel')}
              value={ this.state.taskName }
              onChangeText={ value => this.setState({taskName:value}) }
            />
          </View>
          <View style={{flexDirection:'row'}}>
            <Text note>{I18n.t('status')}</Text>
            <Text note  style={{textAlign: 'right',flex:1}}>{this.state.statusChangedAt}</Text>
          </View>
          <View style={{ borderColor: '#CCCCCC', borderWidth: 0.5, marginBottom: 15 }}>
            <Button style={statusButtonStyle} onPress={()=>this.setState({pickingStatus:!this.state.pickingStatus})}><Text style={{color:'white',flex:1,textAlign:'center'}}>{this.state.status.title}</Text></Button>
              {
                  this.state.pickingStatus && this.props.statuses.map((status)=>
                      !(this.state.status.id==status.id) &&
                      <Button style={{backgroundColor:status.color,flex:1}} onPress={()=>this.setState({status:status,pickingStatus:false})} key={status.id} >
                        <Text style={{color:'white',flex:1,textAlign:'center'}}>{status.title}</Text>
                      </Button>)
              }
          </View>

          <Text note>{I18n.t('taskAddDescription')}</Text>
          <View style={{ borderColor: '#CCCCCC', borderWidth: 0.5, marginBottom: 15 }}>
            <Input
              style={{height:Math.max(35, this.state.descriptionHeight)}}
              multiline={true}
              onChange={ event => this.setState({taskDescription:event.nativeEvent.text}) }
              onContentSizeChange={(event) => this.setState({ descriptionHeight: event.nativeEvent.contentSize.height })}
              value={ this.state.taskDescription }
              placeholder={I18n.t('taskAddDescriptionLabel')}
            />
          </View>

          <Text note>{I18n.t('project')}</Text>
          <View style={{ borderColor: '#CCCCCC', borderWidth: 0.5, marginBottom: 15 }}>
            <Picker
              supportedOrientations={['portrait', 'landscape']}
              iosHeader={I18n.t('selectOne')}
              mode="dropdown"
              selectedValue={this.state.project}
              onValueChange={(value)=>{this.setState({project : value})}}>
              {
                this.props.projects.map((project)=>
                    (<Item label={project.title?project.title:''} key={project.id} value={project.id} />)
                  )
              }
            </Picker>
          </View>

          <Text note>{I18n.t('requester')}</Text>
          <View style={{ borderColor: '#CCCCCC', borderWidth: 0.5, marginBottom: 15 }}>
            <Button block style={{backgroundColor:'white'}} onPress={()=>this.setState({selectingRequester:true})}>
              <Left>
                <Text style={{textAlign:'left',color:'black'}}>{this.state.requester==null ? I18n.t('taskAddSelectUser') : (
                  (this.state.requester.name||this.state.requester.surname)?<Text>
                    {
                    (this.state.requester.name?
                    this.state.requester.name+' ':
                    '')+(this.state.requester.surname?this.state.requester.surname:'')
                  }</Text>:
                <Text>{this.state.requester.email}</Text>

                )}</Text>
              </Left>
            </Button>
          </View>

          <Text note>{I18n.t('company')}</Text>
          <View style={{ borderColor: '#CCCCCC', borderWidth: 0.5, marginBottom: 15 }}>
          <Button block style={{backgroundColor:'white'}} onPress={()=>this.setState({selectingCompany:true})}>
          <Left>
          <Text style={{textAlign:'left',color:'black'}}>{this.state.company==null ? I18n.t('taskAddCompanySelect') : this.state.company.title}</Text>
          </Left>
          </Button>
          </View>

          <Text note>{I18n.t('assignedTo')}</Text>
          <View style={{ borderColor: '#CCCCCC', borderWidth: 0.5, marginBottom: 15 }}>
            <Button block style={{backgroundColor:'white'}} onPress={()=>this.setState({selectingAssignedTo:true})}>
            <Left>
              <Text style={{textAlign:'left',color:'black'}}>{this.state.assignedTo==null ? I18n.t('taskAddSelectUser') : (
                (this.state.assignedTo.name||this.state.assignedTo.surName)?<Text>
                  {
                  (this.state.assignedTo.name?
                  this.state.assignedTo.name+' ':
                  '')+(this.state.assignedTo.surname?this.state.assignedTo.surname:'')
                }</Text>:
              <Text>{this.state.assignedTo.email}</Text>

              )}</Text>
            </Left>
            </Button>
          </View>

          <Text note>{I18n.t('deadline')}</Text>
          <View style={{ borderColor: '#CCCCCC', borderWidth: 0.5, marginBottom: 15 }}>
          </View>

          <Text note>{I18n.t('pendingAt')}</Text>
          <View style={{ borderColor: '#CCCCCC', borderWidth: 0.5, marginBottom: 15 }}>
          </View>


          <Text note>{I18n.t('workHours')}</Text>
          <View style={{ borderColor: '#CCCCCC', borderWidth: 0.5, marginBottom: 15 }}>
          <Input
            value={this.state.duration}
            keyboardType='numeric'
            onChangeText={ value => this.setWorkTime(value) }
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
              visible={this.state.selectingRequester}
              onRequestClose={() => this.setState({selectingRequester:false})}>
            <Header>
              <Body>
              <Title>{I18n.t('taskAddCompanySelectRequester')}</Title>
              </Body>
            </Header>
            <Content style={{ padding: 15 }}>

            <ListItem>
              <Item rounded>
                <Icon name="ios-search" />
                <Input placeholder={I18n.t('search')} value={this.state.filterWordRequester} onChangeText={((value)=>this.setState({filterWordRequester:value}))} />
              </Item>
            </ListItem>

            <List>
            {
              (([{id:null,name:I18n.t('nobody'), email:I18n.t('none')}]).concat(this.props.users)).map((user) =>
              (user.email+user.name+' '+user.surname+' '+user.name).toLowerCase().includes(this.state.filterWordRequester.toLowerCase()) &&
              <ListItem button key={user.id} onPress={()=>this.setState({requester:user,selectingRequester:false})} >
                <Body>
                {
                  (user.name || user.surname)?<Text>{((user.name?(user.name+' '):'')+ (user.surname?user.surname:''))}</Text>:null
                }
                <Text note>{user.email}</Text>
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
              visible={this.state.selectingAssignedTo}
              onRequestClose={() => this.setState({selectingAssignedTo:false})}>
            <Header>
              <Body>
              <Title>{I18n.t('taskAddCompanySelectAssignedTo')}</Title>
              </Body>
            </Header>
            <Content style={{ padding: 15 }}>

            <ListItem>
              <Item rounded>
                <Icon name="ios-search" />
                <Input placeholder={I18n.t('search')} value={this.state.filterWordAssignedTo} onChangeText={((value)=>this.setState({filterWordAssignedTo:value}))} />
              </Item>
            </ListItem>

            <List>
            {
              (([{id:null,name:I18n.t('nobody'), email:I18n.t('none')}]).concat(this.props.users)).map((user) =>
              (user.email+user.name+' '+user.surname+' '+user.name).toLowerCase().includes(this.state.filterWordAssignedTo.toLowerCase()) &&
              <ListItem button key={user.id} onPress={()=>this.setState({assignedTo:user,selectingAssignedTo:false})} >
                <Body>
                {
                  (user.name || user.surname)?<Text>{((user.name?(user.name+' '):'')+ (user.name?user.surname:''))}</Text>:null
                }
                <Text note>{user.email}</Text>
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
        <Footer>
          <FooterTab>
            <Button iconLeft style={{ flexDirection: 'row', borderColor: 'white', borderWidth: 0.5 }} onPress={Actions.pop}>
              <Icon active style={{ color: 'white' }} name="md-add" />
              <Text style={{ color: 'white' }} >{I18n.t('cancel')}</Text>
            </Button>
          </FooterTab>

          <FooterTab>
            <Button iconLeft style={{ flexDirection: 'row', borderColor: 'white', borderWidth: 0.5 }}
            onPress={this.submitForm.bind(this)}
            >
              <Icon active name="md-add" style={{ color: 'white' }} />
              <Text style={{ color: 'white' }} >{I18n.t('save')}</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}

const mapStateToProps = ({ task }) => {
  return { users, companies,statuses, projects, task} = task;
};

export default connect(mapStateToProps,{})(TabAtributes);
