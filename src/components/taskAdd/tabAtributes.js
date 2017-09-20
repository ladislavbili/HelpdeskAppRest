import React, { Component } from 'react';
import { Modal } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { View, Body, Container, Content, Icon, Input, Item, Label, Text, Footer, FooterTab, Button, Picker,  ListItem, Header,Title , Left, Right, List , CheckBox } from 'native-base';
import DateTimePicker from 'react-native-modal-datetime-picker';
import I18n from '../../translations';
import {addTask} from '../../redux/actions';
import {formatDate,processInteger} from '../../helperFunctions';
import TaskLabel from './label';

class TabAtributes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title:'',
      assignedTo:{id:null,name:I18n.t('nobody'), email:I18n.t('none')},
      requestedBy:this.props.users[this.props.users.findIndex((user)=>user.id==this.props.userData.id)],
      status:this.props.statuses[0],
      work_time:'0',
      description:'',
      descriptionHeight:100,
      work:'',
      workHeight:100,
      company:null,
      project:this.props.projectId?this.props.projects[this.props.projects.findIndex((proj)=>proj.id==this.props.projectId)]:this.props.projects[0].id,
      important:false,
      selectingCompany:false,
      filterWord:'',
      selectingRequester:false,
      filterWordRequester:'',
      selectingAssignedTo:false,
      filterWordAssignedTo:'',
      selectingDeadline:false,
      deadline:null,
      selectingStartedAt:false,
      startedAt:null,
      modalLabel:false,
      labels:[]
    }
  }

  setLabel(removing,label){
   if(removing){
     let index=this.state.labels.findIndex((item)=>item.id==label.id);
     if(index==-1){
       return;
     }
     let newLabels=[...this.state.labels];
     newLabels.splice(index,1);
     this.setState({labels:newLabels});
   }
   else{
     let index=this.state.labels.findIndex((item)=>item.id==label.id);
     if(index==-1){
       this.setState({labels:[...this.state.labels,label]});
     }
   }
 }

  submitForm(){
    // auto: createdAt, createdBy
    const {title,description,work_time,deadline,startedAt,work, important} = this.state;
    const assignedTo = this.state.assignedTo.id?{id:this.state.assignedTo.id}:null;
    const requestedBy = this.state.requestedBy?{id:this.state.requestedBy.id}:null;
    const status = {id:this.state.status.id};
    const company = this.state.company?{id:this.state.company.id}:null;
    const project = this.state.project?{id:this.state.project.id}:null;
    const updatedAt = (new Date()).getTime();
    const statusChangedAt = null;
    const createdAt = (new Date()).getTime();
    const createdBy = this.props.userData;
    const labels = this.state.labels.map((label)=>label.id);
    this.props.addTask(
      {title,description,deadline,startedAt,important,work,work_time,labels,
        createdAt,updatedAt,statusChangedAt,createdBy,requestedBy,project,company,assignedTo,
        canEdit:true,status},this.state.assignedTo.id?this.state.assignedTo:null,
        {id:this.state.project,title:this.props.projects[this.props.projects.findIndex((proj)=>proj.id==this.state.project)].title},
        this.state.status
      );
    Actions.pop();
  }

  render() {
    let statusButtonStyle={backgroundColor:this.state.status.color,flex:1};
    return (
      <Container>
        <Content style={{ padding: 15 }}>

          <Item inlineLabel style={{marginBottom:20, borderWidth:0,marginTop:10,paddingBottom:5}}>
          <CheckBox checked={this.state.important} color='#3F51B5' onPress={()=>this.setState({important:!this.state.important})}/>
            <Label style={{marginLeft:15}}>Important</Label>
          </Item>

          <Text note>{I18n.t('taskAddTaskName')}</Text>
          <View style={{ borderColor: '#CCCCCC', borderWidth: 0.5, marginBottom: 15 }}>
            <Input
              placeholder={I18n.t('taskAddTaskNameLabel')}
              value={ this.state.title }
              onChangeText={ value => this.setState({title:value}) }
            />
          </View>
          <View style={{flexDirection:'row'}}>
            <Text note>{I18n.t('status')}</Text>
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
              onChange={ event => this.setState({description:event.nativeEvent.text}) }
              onContentSizeChange={(event) => this.setState({ descriptionHeight: event.nativeEvent.contentSize.height })}
              value={ this.state.description }
              placeholder={I18n.t('taskAddDescriptionLabel')}
            />
          </View>

          <Text note>{I18n.t('taskAddWork')}</Text>
          <View style={{ borderColor: '#CCCCCC', borderWidth: 0.5, marginBottom: 15 }}>
            <Input
              style={{height:Math.max(35, this.state.workHeight)}}
              multiline={true}
              onChange={ event => this.setState({work:event.nativeEvent.text}) }
              onContentSizeChange={(event) => this.setState({ workHeight: event.nativeEvent.contentSize.height })}
              value={ this.state.work }
              placeholder={I18n.t('taskAddWorkLabel')}
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
                <Text style={{textAlign:'left',color:'black'}}>{this.state.requestedBy==null ? I18n.t('taskAddSelectUser') : (
                  (this.state.requestedBy.name)?<Text>
                    {this.state.requestedBy.name}</Text>:
                <Text>{this.state.requestedBy.email}</Text>

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
                this.state.assignedTo.name?
                <Text>{this.state.assignedTo.name}</Text>:
              <Text>{this.state.assignedTo.email}</Text>

              )}</Text>
            </Left>
            </Button>
          </View>

          <Text note>{I18n.t('deadline')}</Text>
          <View style={{ borderColor: '#CCCCCC', borderWidth: 0.5, marginBottom: 15 }}>
            <Button block style={{backgroundColor:'white'}} onPress={()=>this.setState({selectingDeadline:true})}>
              <Left>
                <Text style={{textAlign:'left',color:'black'}}>{this.state.deadline==null ? I18n.t('taskAddDeadlineSelect') : formatDate(this.state.deadline)}</Text>
              </Left>
            </Button>
            <DateTimePicker
              mode="datetime"
              isVisible={this.state.selectingDeadline}
              onConfirm={(date)=>this.setState({deadline:(new Date(date)).getTime()})}
              onCancel={()=>this.setState({selectingDeadline:false})}
            />
          </View>

          <Text note>{I18n.t('pendingAt')}</Text>
          <View style={{ borderColor: '#CCCCCC', borderWidth: 0.5, marginBottom: 15 }}>
            <Button block style={{backgroundColor:'white'}} onPress={()=>this.setState({selectingStartedAt:true})}>
              <Left>
                <Text style={{textAlign:'left',color:'black'}}>{this.state.startedAt==null ? I18n.t('taskAddStartedAtSelect') : formatDate(this.state.startedAt)}</Text>
              </Left>
            </Button>
            <DateTimePicker
              mode="datetime"
              isVisible={this.state.selectingStartedAt}
              onConfirm={(date)=>this.setState({startedAt:(new Date(date)).getTime()})}
              onCancel={()=>this.setState({selectingStartedAt:false})}
            />
          </View>

          <Text note>{I18n.t('workHours')}</Text>
          <View style={{ borderColor: '#CCCCCC', borderWidth: 0.5, marginBottom: 15 }}>
            <Input
              value={this.state.work_time}
              keyboardType='numeric'
              onChangeText={ value => {let result = processInteger(value);this.setState({work_time:(result?result:this.state.work_time)})} }
            />
          </View>

          <Text note>Labels</Text>
          <View style={{ borderColor: '#CCCCCC', borderWidth: 0.5, marginBottom: 15 }}>
          <Button block onPress={()=>{this.setState({modalLabel:true})}}><Text>Select labels</Text></Button>
          <List
            dataArray={this.state.labels}
            renderRow={label =>
              <ListItem>
                <View style={{backgroundColor:label.color,paddingLeft:10}}>
                  <Text style={{color:'white'}}>{label.title}</Text>
                </View>
              </ListItem>
              }
          />
        </View>

        <Modal
          animationType={"fade"}
          transparent={false}
          style={{flex:1}}
          visible={this.state.modalLabel}
          onRequestClose={() => this.setState({modalLabel:false})}
          >
          <Content style={{ padding: 15 }}>
          <Header>
            <Body>
              <Title>Select labels</Title>
            </Body>
          </Header>

         <View style={{ borderColor: '#CCCCCC', borderWidth: 0.5, marginBottom: 15 }}>
           <List
             dataArray={this.props.labels}
             renderRow={item =>
               <TaskLabel item={item} setLabel={this.setLabel.bind(this)} selected={this.state.labels.some((label)=>item.id==label.id)}/>
               }
           />
         </View>

        </Content>
        <Footer>

          <FooterTab>
            <Button style={{ flexDirection: 'row', borderColor: 'white', borderWidth: 0.5 }}
              onPress={()=>this.setState({modalLabel:false})}>
              <Text style={{ color: 'white' }}>DONE</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Modal>

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
              (user.email+user.name).toLowerCase().includes(this.state.filterWordRequester.toLowerCase()) &&
              <ListItem button key={user.id} onPress={()=>this.setState({requestedBy:user,selectingRequester:false})} >
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
              (user.email+user.name).toLowerCase().includes(this.state.filterWordAssignedTo.toLowerCase()) &&
              <ListItem button key={user.id} onPress={()=>this.setState({assignedTo:user,selectingAssignedTo:false})} >
                <Body>
                {
                  user.name?<Text>{user.name}</Text>:null
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
              <Text style={{ color: 'white' }} >{I18n.t('add')}</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}

const mapStateToProps = ({ taskR, login, companyR, userR }) => {
  const {userData} = login;
  const {users} = userR;
  const {companies} = companyR;
  const { statuses, projects,labels} = taskR;
  return { users, companies,statuses, projects, userData,labels};
};

export default connect(mapStateToProps,{addTask})(TabAtributes);
