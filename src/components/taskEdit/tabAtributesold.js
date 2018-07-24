import React, { Component } from 'react';
import { Modal, Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { View, Body, Container, Content, Icon, Input, Item, Label, Text, Footer, FooterTab, Button, Picker,  ListItem, Header,Title , Left, Right, List , CheckBox } from 'native-base';
import DateTimePicker from 'react-native-modal-datetime-picker';
import I18n from '../../translations';
import {editTask,deleteTask,getAssigners} from '../../redux/actions';
import {formatDate,processInteger} from '../../helperFunctions';
import TaskLabel from './label';


/**
 * Tab of the main menu that is responsible for editting task
 * @extends Component
 */
class TabAtributes extends Component {
  constructor(props) {
    super(props);
    this.props.getAssigners(this.props.token,this.props.projectID);
    this.state = {
      title:this.props.task.title?this.props.task.title:'',
      assignedTo:this.props.task.taskHasAssignedUsers.length!=0?this.props.users[this.props.users.findIndex((item)=>item.id==this.props.task.taskHasAssignedUsers[0].user.id)]:{id:null,name:I18n.t('noUser'), email:I18n.t('noMail')},
      requestedBy:this.props.task.requestedBy?this.props.users[this.props.users.findIndex((item)=>item.id==this.props.task.requestedBy.id)]:{id:null,name:I18n.t('noUser'), email:I18n.t('noMail')},
      status:this.props.task.taskHasAssignedUsers.length!=0 && this.props.task.taskHasAssignedUsers[0].status ? this.props.statuses[this.props.statuses.findIndex((item)=>item.id==this.props.task.taskHasAssignedUsers[0].status.id)]:this.props.statuses[0],
      work_time:this.props.task.work_time?this.props.task.work_time.toString():'0',
      description:this.props.task.description?this.props.task.description:'',
      descriptionHeight:100,
      work:this.props.task.work?this.props.task.work:'',
      workHeight:100,
      company:this.props.task.company?this.props.companies[this.props.companies.findIndex((item)=>item.id==this.props.task.company.id)]:null,
      project:this.props.task.project?this.props.task.project.id:this.props.projects[0].id,
      statusChangedAt:this.props.task.statusChangedAt?formatDate(this.props.task.statusChangedAt*1000):'',
      disabled:!(this.props.task.canEdit||this.props.task.loggedUserProjectAcl.includes('update_all_tasks')||this.props.task.loggedUserRoleAcl.includes('update_all_tasks')||this.props.task.loggedUserProjectAcl.includes('resolve_task')||this.props.task.loggedUserRoleAcl.includes('resolve_task')),
      important:this.props.task.important?true:false,
      selectingCompany:false,
      filterWord:'',
      selectingRequester:false,
      filterWordRequester:'',
      selectingAssignedTo:false,
      filterWordAssignedTo:'',
      selectingDeadline:false,
      deadline:this.props.task.deadline?this.props.task.deadline*1000:null,
      selectingStartedAt:false,
      startedAt:this.props.task.startedAt?this.props.task.startedAt*1000:null,
      modalLabel:false,
      labels:this.props.task.tags?this.props.labels.filter(
        (label)=>this.props.task.tags.some((tag)=>tag.id==label.id)):[]
      }
    }

    /**
     * after component is loaded it sends to the main menu a function, that is used to submit task changes
     */
    componentDidMount(){
      this.props.saveFunction(this.submitForm.bind(this),(this.props.task.canEdit||this.props.task.loggedUserProjectAcl.includes('update_all_tasks')||this.props.task.loggedUserRoleAcl.includes('update_all_tasks')||this.props.task.loggedUserProjectAcl.includes('resolve_task')||this.props.task.loggedUserRoleAcl.includes('resolve_task')));
    }

    /**
     * this function is used by each separate label to add and remove itself from the label list
     * @param {boolean} removing If the item is meant to be removed
     * @param {Label} label    Object containing all of the data about the label
     */
    setLabel(removing,label){
      this.props.inputChanged();
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

    /**
     * Gathers all of the data from the current state and sends them via actions to the redux. Then it returns user back to previous component
     */
    submitForm(){
      const id = this.props.task.id;
      const project = this.state.project;
      const requester = this.state.requestedBy.id?this.state.requestedBy.id:null;
      const company = this.state.company?this.state.company.id:null;
      const assigned = this.state.assignedTo && this.state.assignedTo.id && this.state.status ? '[{"userId":'+this.state.assignedTo.id+', "statusId":'+this.state.status.id+'}]':null;
      const startedAt = this.state.startedAt? Math.floor(this.state.startedAt/1000): null;
      const deadline = this.state.deadline? Math.floor(this.state.deadline/1000): null;
      const closedAt = null;
      let tags = '"';
      this.state.labels.map((label)=>tags+=label.title+'","');
      const tag = '['+(tags.substring(0,tags.length-2))+']';
      const {title,description,important,work} = this.state;
      const workTime=this.state.work_time;

      this.props.editTask(
        {
          project,requester,company,startedAt,deadline,closedAt,
          title,description,important,work,workTime,tag,assigned,
        },id,this.props.token,this.props.projectID==project );
      Actions.pop();
    }

    /**
     * Delete the task you are currently in
     */
    deleteTask(){
      Alert.alert(
        I18n.t('deletingTask'),
        I18n.t('deletingTaskMessage'),
        [
          {text: I18n.t('cancel'), style: 'cancel'},
          {text: I18n.t('ok'), onPress: () =>{
            this.props.deleteTask(this.props.task.id,this.props.token);
            Actions.pop();
          }},
        ],
        { cancelable: false }
      )
    }

    render() {
      let statusButtonStyle={backgroundColor:this.state.status.color,flex:1};
      return (
        <Container>
          <Content style={{ padding: 15 }}>

            <Item inlineLabel style={{marginBottom:20, borderWidth:0,marginTop:10,paddingBottom:5}}>
              <CheckBox checked={this.state.important} disabled={this.state.disabled} color='#3F51B5' onPress={()=>this.setState({important:!this.state.important})}/>
              <Label style={{marginLeft:15}}>Important</Label>
            </Item>

            <Text note>{I18n.t('taskName')}</Text>
            <View style={{ borderColor: '#CCCCCC', borderWidth: 0.5, marginBottom: 15 }}>
              <Input
                disabled={this.state.disabled}
                placeholder={I18n.t('enterTaskName')}
                value={ this.state.title }
                onChangeText={ value => {this.setState({title:value}); this.props.inputChanged();} }
                />
            </View>
            <View style={{flexDirection:'row'}}>
              <Text note>{I18n.t('status')}</Text>
              <Text note  style={{textAlign: 'right',flex:1}}>{this.state.statusChangedAt}</Text>
            </View>
            <View style={{ borderColor: '#CCCCCC', borderWidth: 0.5, marginBottom: 15 }}>
              <Button style={statusButtonStyle} disabled={this.state.disabled} onPress={()=>this.setState({pickingStatus:!this.state.pickingStatus})}><Text style={{color:'white',flex:1,textAlign:'center'}}>{this.state.status.title}</Text></Button>
              {
                this.state.pickingStatus && this.props.statuses.map((status)=>
                !(this.state.status.id==status.id) &&
                <Button style={{backgroundColor:status.color,flex:1}} onPress={()=>{this.setState({status:status,pickingStatus:false});this.props.inputChanged();}} key={status.id} >
                  <Text style={{color:'white',flex:1,textAlign:'center'}}>{status.title}</Text>
                </Button>)
              }
            </View>

            <Text note>{I18n.t('taskDescription')}</Text>
            <View style={{ borderColor: '#CCCCCC', borderWidth: 0.5, marginBottom: 15 }}>
              <Input
                style={{height:Math.max(35, this.state.descriptionHeight)}}
                multiline={true}
                disabled={this.state.disabled}
                onChange={ event => {this.setState({description:event.nativeEvent.text});this.props.inputChanged();} }
                onContentSizeChange={(event) => this.setState({ descriptionHeight: event.nativeEvent.contentSize.height })}
                value={ this.state.description }
                placeholder={I18n.t('enterTaskDescription')}
                />
            </View>

            <Text note>{I18n.t('taskWork')}</Text>
            <View style={{ borderColor: '#CCCCCC', borderWidth: 0.5, marginBottom: 15 }}>
              <Input
                style={{height:Math.max(35, this.state.workHeight)}}
                multiline={true}
                disabled={this.state.disabled}
                onChange={ event => {this.setState({work:event.nativeEvent.text});this.props.inputChanged();} }
                onContentSizeChange={(event) => this.setState({ workHeight: event.nativeEvent.contentSize.height })}
                value={ this.state.work }
                placeholder={I18n.t('enterTaskWork')}
                />
            </View>

            <Text note>{I18n.t('project')}</Text>
            <View style={{ borderColor: '#CCCCCC', borderWidth: 0.5, marginBottom: 15 }}>
              <Picker
                supportedOrientations={['portrait', 'landscape']}
                iosHeader={I18n.t('selectOne')}
                mode="dropdown"
                selectedValue={this.state.project}
                onValueChange={(value)=>{this.setState({project : value,assignedTo:{id:null,name:I18n.t('noUser')}});this.props.inputChanged();this.props.getAssigners(this.props.token,value);}}>
                {
                  this.props.projects.map((project)=>
                  (<Item label={project.title?project.title:''} key={project.id} value={project.id} />)
                )
              }
            </Picker>
          </View>

          <Text note>{I18n.t('requester')}</Text>
          <View style={{ borderColor: '#CCCCCC', borderWidth: 0.5, marginBottom: 15 }}>
            <Button block style={{backgroundColor:'white'}} disabled={this.state.disabled} onPress={()=>this.setState({selectingRequester:true})}>
              <Left>
                <Text style={{textAlign:'left',color:'black'}}>{this.state.requestedBy==null ? I18n.t('selectRequester') : (
                    (this.state.requestedBy.name)?
                    <Text>{this.state.requestedBy.name}</Text>:
                      <Text>{this.state.requestedBy.email}</Text>

                    )}</Text>
                  </Left>
                </Button>
              </View>

              <Text note>{I18n.t('company')}</Text>
              <View style={{ borderColor: '#CCCCCC', borderWidth: 0.5, marginBottom: 15 }}>
                <Button block style={{backgroundColor:'white'}} disabled={this.state.disabled} onPress={()=>this.setState({selectingCompany:true})}>
                  <Left>
                    <Text style={{textAlign:'left',color:'black'}}>{this.state.company==null ? I18n.t('selectCompany') : this.state.company.title}</Text>
                  </Left>
                </Button>
              </View>

              <Text note>{I18n.t('assignedTo')}</Text>
              <View style={{ borderColor: '#CCCCCC', borderWidth: 0.5, marginBottom: 15 }}>
                <Button block style={{backgroundColor:'white'}} onPress={()=>this.setState({selectingAssignedTo:true})}>
                  <Left>
                    <Text style={{textAlign:'left',color:'black'}}>{this.state.assignedTo==null ? I18n.t('selectAssignedTo') : (
                        this.state.assignedTo.name||this.state.assignedTo.surname?
                        <Text>{this.state.assignedTo.name?this.state.assignedTo.name:''+' '+this.state.assignedTo.surname?this.state.assignedTo.surname:''}</Text>:
                          <Text>{this.state.assignedTo.username}</Text>

                        )}</Text>
                      </Left>
                    </Button>
                  </View>

                  <Text note>{I18n.t('deadline')}</Text>
                  <View style={{ borderColor: '#CCCCCC', borderWidth: 0.5, marginBottom: 15 }}>
                    <Button block style={{backgroundColor:'white'}} disabled={this.state.disabled} onPress={()=>this.setState({selectingDeadline:true})}>
                      <Left>
                        <Text style={{textAlign:'left',color:'black'}}>{this.state.deadline==null ? I18n.t('selectDeadline') : formatDate(this.state.deadline)}</Text>
                      </Left>
                    </Button>
                    <DateTimePicker
                      mode="datetime"
                      isVisible={this.state.selectingDeadline}
                      onConfirm={(date)=>{this.setState({deadline:(new Date(date)).getTime()});this.props.inputChanged();}}
                      onCancel={()=>this.setState({selectingDeadline:false})}
                      />
                  </View>

                  <Text note>{I18n.t('pendingAt')}</Text>
                  <View style={{ borderColor: '#CCCCCC', borderWidth: 0.5, marginBottom: 15 }}>
                    <Button block style={{backgroundColor:'white'}} disabled={this.state.disabled} onPress={()=>this.setState({selectingStartedAt:true})}>
                      <Left>
                        <Text style={{textAlign:'left',color:'black'}}>{this.state.startedAt==null ? I18n.t('selectPendingAt') : formatDate(this.state.startedAt)}</Text>
                      </Left>
                    </Button>
                    <DateTimePicker
                      mode="datetime"
                      isVisible={this.state.selectingStartedAt}
                      onConfirm={(date)=>{this.setState({startedAt:(new Date(date)).getTime()});this.props.inputChanged();}}
                      onCancel={()=>this.setState({selectingStartedAt:false})}
                      />
                  </View>

                  <Text note>{I18n.t('workHours')}</Text>
                  <View style={{ borderColor: '#CCCCCC', borderWidth: 0.5, marginBottom: 15 }}>
                    <Input
                      disabled={this.state.disabled}
                      value={this.state.work_time}
                      keyboardType='numeric'
                      placeholder={I18n.t('enterWorkHours')}
                      onChangeText={ value => {let result = processInteger(value);this.setState({work_time:(result?result:this.state.work_time)});this.props.inputChanged();} }
                      />
                  </View>

                  <Text note>{I18n.t('labels')}</Text>
                  <View style={{ borderColor: '#CCCCCC', borderWidth: 0.5, marginBottom: 15 }}>
                    <Button block onPress={()=>{this.setState({modalLabel:true})}}><Text>{I18n.t('selectLabels')}</Text></Button>
                    <List
                      dataArray={this.state.labels}
                      renderRow={label =>
                        <ListItem>
                          <View style={{backgroundColor:((label.color.includes('#')?'':'#')+label.color),paddingLeft:10}}>
                            <Text style={{color:'white'}}>{label.title}</Text>
                          </View>
                        </ListItem>
                      }
                      />
                  </View>

                  {
                    (this.props.task.loggedUserProjectAcl.includes('delete_task')||this.props.task.loggedUserRoleAcl.includes('delete_task'))&&
                    <Button danger block onPress={this.deleteTask.bind(this)} iconLeft style={{ flexDirection: 'row', borderColor: 'white', marginTop:5, marginBottom:20, borderWidth: 0.5 }}>
                      <Icon active style={{ color: 'white' }} name="trash" />
                      <Text style={{ color: 'white' }} >{I18n.t('delete')}</Text>
                    </Button>
                  }
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
                          <Title>{I18n.t('selectTaskLabels')}</Title>
                        </Body>
                      </Header>

                      <View style={{ borderColor: '#CCCCCC', borderWidth: 0.5, marginBottom: 15 }}>
                        <List
                          dataArray={this.props.labels}
                          renderRow={item =>
                            <TaskLabel item={item} setLabel={this.setLabel.bind(this)} inputChanged={this.props.inputChanged} selected={this.state.labels.some((label)=>item.id==label.id)}/>
                          }
                          />
                      </View>
                    </Content>
                    <Footer>

                      <FooterTab>
                        <Button style={{ flexDirection: 'row', borderColor: 'white', borderWidth: 0.5 }}
                          onPress={()=>this.setState({modalLabel:false})}>
                          <Text style={{ color: 'white' }}>{I18n.t('done')}</Text>
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
                        <Title>{I18n.t('selectCompany')}</Title>
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
                          company.title.toLowerCase().includes(this.state.filterWord.toLowerCase()) && <ListItem button key={company.id} onPress={()=>{this.setState({company:company,selectingCompany:false});this.props.inputChanged();}} >
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
                    <Title>{I18n.t('selectRequester')}</Title>
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
                      (([{id:null,name:I18n.t('noUser'), email:I18n.t('noMail')}]).concat(this.props.users)).map((user) =>
                      (user.email+user.name).toLowerCase().includes(this.state.filterWordRequester.toLowerCase()) &&
                      <ListItem button key={user.id} onPress={()=>{this.setState({requestedBy:user,selectingRequester:false});this.props.inputChanged();}} >
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
                  <Title>{I18n.t('selectAssignedTo')}</Title>
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
                      (([{id:null,name:I18n.t('noUser')}]).concat(this.props.assigners)).map((user) =>
                      ((user.name?user.name:'')+' '+(user.surname?user.surname:'')+' '+(user.name?user.name:'')+user.username).toLowerCase().includes(this.state.filterWordAssignedTo.toLowerCase()) &&
                      <ListItem button key={user.id} onPress={()=>this.setState({assignedTo:user,selectingAssignedTo:false})} >
                        <Body>
                          {
                            (user.name||user.surname)?<Text>{user.name?user.name+' ':''}{user.surname?user.surname:''}</Text>:null
                          }
                          <Text note>{user.username}</Text>
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

//creates function that maps actions (functions) to the redux store
const mapStateToProps = ({ taskR, login, userR, companyR }) => {
  const { users, assigners } = userR;
  const {token } = login;
  const { companies } = companyR;
  const { statuses, projects, task,labels} = taskR;
  return { users, companies,statuses, projects,assigners, task,labels,token};
};

//exports created Component connected to the redux store and redux actions
export default connect(mapStateToProps,{editTask, deleteTask,getAssigners})(TabAtributes);
