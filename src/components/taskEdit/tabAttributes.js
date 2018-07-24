import React, { Component } from 'react';
import { Modal } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { View, Body, Container, Content, Icon, Input, Item, Label, Text, Footer, FooterTab, Button, Picker,  ListItem, Header,Title , Left, Right, List , CheckBox } from 'native-base';
import DateTimePicker from 'react-native-modal-datetime-picker';

import I18n from '../../translations';
import {editTask,getTaskSolvers,deleteFollower,addFollower} from '../../redux/actions';
import {formatDate,processInteger} from '../../helperFunctions';
import TaskTag from './tag';
import TaskFollower from './follower';

const workTypes=['vzdialena podpora','servis IT','servis serverov','programovanie www','instalacie klientskeho os','bug reklamacia','navrh','material','cenova ponuka','administrativa','konzultacia','refakturacia','testovanie'];

/**
 * Tab of the main menu that is responsible for adding a new task
 * @extends Component
 */
class TabAtributes extends Component {
  constructor(props) {
    super(props);
    let task = this.props.task;
    this.state = {
      important:task.important,
      title:task.title,
      tag:this.props.tags.filter((item)=>task.tags.some((item2)=>item.id===item2.id)),
      tagOpen:false,
      description:task.description,
      descriptionHeight:100,
      status:this.props.statuses.find((item)=>item.id===task.status.id),
      statusOpen:false,
      project:task.project.id,
      requestedBy:this.props.users[this.props.users.findIndex((user)=>user.id===task.requestedBy.id)],
      requestedByOpen:false,
      requestedByFilter:'',
      company:this.props.companies.length===0?'null':this.props.companies.find((item)=>item.id===task.company.id),
      companyOpen:false,
      companyFilter:'',
      assigned:task.taskHasAssignedUsers.length===0?{id:null,name:I18n.t('noUser')}:this.props.users.find((item)=>item.id===Object.values(task.taskHasAssignedUsers)[0].user.id),
      assignedOpen:false,
      assignedFilter:'',
      workType:task.work_type?task.work_type:workTypes[0],
      workTime:task.work_time?task.work_time:'0',
      startedAt:task.startedAt?task.startedAt*1000:null,
      startedAtOpen:false,
      deadline:task.deadline?task.deadline*1000:null,
      deadlineOpen:false,
      followers:this.props.users.filter((item)=>task.followers.some((item2)=>item.id===item2.id)),
      followersFilter:'',
      followersOpen:false,
      submitError:false,
    }
    this.props.getTaskSolvers(this.state.project,this.props.token);
    this.props.saveFunction(this.submitForm.bind(this),this.props.task?this.props.task.canEdit:false);
  }

/**
 * this function is used by each separate tag to add and remove itself from the tag list
 * @param {boolean} removing If the item is meant to be removed
 * @param {Tag} tag    Object containing all of the data about the tag
 */
  setTag(removing,tag){
    this.props.inputChanged(true);
    if(removing){
      let index=this.state.tag.findIndex((item)=>item.id==tag.id);
      if(index==-1){
        return;
      }
      let newTags=[...this.state.tag];
      newTags.splice(index,1);
      this.setState({tag:newTags});
    }
    else{
      let index=this.state.tag.findIndex((item)=>item.id==tag.id);
      if(index==-1){
        this.setState({tag:[...this.state.tag,tag]});
      }
    }
  }

  /**
   * this function is used by each separate follower to add and remove itself from the follower list
   * @param {boolean} removing If the item is meant to be removed
   * @param {Follower} follower    Object containing all of the data about the follower
   */
    setFollower(removing,follower){
      if(removing){
        let index=this.state.followers.findIndex((item)=>item.id===follower.id);
        if(index===-1){
          return;
        }
        this.props.deleteFollower(follower.id,this.props.task.id,this.props.token);
        let newFollowers=[...this.state.followers];
        newFollowers.splice(index,1);
        this.setState({followers:newFollowers});
      }
      else{
        let index=this.state.followers.findIndex((item)=>item.id===follower.id);
        if(index===-1){
          this.props.addFollower(follower.id,this.props.task.id,this.props.token);
          this.setState({followers:[...this.state.followers,follower]});
        }
      }
    }

  /**
   * Gathers all of the data from the current state and sends them via actions to the redux. Then it returns user back to previous component
   */
  submitForm(){
    this.setState({ submitError: true });
		//checks if all requirements for creating were met
		if (
			this.state.title === '' ||
			this.state.project === 'null' ||
			this.state.company === 'null'
		) {
			return;
		}
		//as a tags we send titles not ids
		let tags = [];
		this.state.tag.map(addTag => tags.push(this.props.tags.find(tag => tag.id === addTag.id).title));
    let closedAt = this.props.task.closedAt?this.props.task.closedAt*1000:(new Date()).getTime();
    if(this.props.statuses.find((item)=>item.id.toString()===this.state.status.id.toString()).title!=='Closed'){
      closedAt = 'null';
    }
		this.props.editTask(
			{
				title: this.state.title,
				closedAt,
				description: this.state.description === '' ? 'null' : this.state.description,
				deadline: this.state.deadline !== null ? this.state.deadline.valueOf() / 1000 : 'null',
				startedAt: this.state.startedAt !== null ? this.state.startedAt.valueOf() / 1000 : 'null',
				important: this.state.important,
				workType: this.state.workType,
				workTime: this.state.workTime.length === 0 ? undefined : this.state.workTime,
				tag: JSON.stringify(tags),
				assigned: this.state.assigned.id !== null ? JSON.stringify([{ userId: parseInt(this.state.assigned.id) }]) : null
			},
      this.props.task.id,
			this.state.project,
			this.state.status.id,
			this.state.requestedBy.id,
			this.state.company.id,
			this.props.token
		);
    this.props.inputChanged(false);
  }

  render() {
    let statusButtonStyle={backgroundColor:this.state.status.color,flex:1};
    return (
      <Container>
        <Content style={{ padding: 15 }}>

          <Item inlineLabel style={{marginBottom:20, borderBottomWidth:0,marginTop:10,paddingBottom:5}} onPress={()=>this.setState({important:!this.state.important})}>
            <CheckBox checked={this.state.important} color='#3F51B5' onPress={()=>{    this.props.inputChanged(true);this.setState({important:!this.state.important})}}/>
            <Label style={{marginLeft:15}}>Important</Label>
          </Item>

          <Text note>{I18n.t('taskName')}</Text>
          <View style={{ borderColor: '#CCCCCC', borderWidth: 0.5, marginBottom: 15 }}>
            <Input
              placeholder={I18n.t('enterTaskName')}
              value={ this.state.title }
              onChangeText={ value =>{ this.props.inputChanged(true);this.setState({title:value}) }}
              />
            {this.state.submitError && this.state.title==='' && <Text style={{color:'red'}}>{I18n.t('restrictionMustEnterTaskTitle')}</Text>}
          </View>

          <Text note>{I18n.t('tags')}</Text>
          <View style={{ borderColor: '#CCCCCC', borderWidth: 0.5, marginBottom: 15 }}>
            <Button block onPress={()=>{this.setState({tagOpen:true})}}><Text>{I18n.t('selectTags')}</Text></Button>
            <List
              dataArray={this.state.tag}
              renderRow={tag =>
                <ListItem>
                  <View style={{backgroundColor:((tag.color.includes('#')?'':'#')+tag.color),paddingLeft:10}}>
                    <Text style={{color:'white'}}>{tag.title}</Text>
                  </View>
                </ListItem>
              }
              />
          </View>

          <Text note>{I18n.t('taskDescription')}</Text>
          <View style={{ borderColor: '#CCCCCC', borderWidth: 0.5, marginBottom: 15 }}>
            <Input
              style={{height:Math.max(35, this.state.descriptionHeight)}}
              multiline={true}
              onChange={ event =>{this.props.inputChanged(true); this.setState({description:event.nativeEvent.text})} }
              onContentSizeChange={(event) => this.setState({ descriptionHeight: event.nativeEvent.contentSize.height })}
              value={ this.state.description }
              placeholder={I18n.t('enterTaskDescription')}
              />
          </View>

          <Text note>{I18n.t('status')}</Text>
          <View style={{ borderColor: '#CCCCCC', borderWidth: 0.5, marginBottom: 15 }}>
            <Button style={statusButtonStyle} onPress={()=>this.setState({statusOpened:!this.state.statusOpened})}><Text style={{color:'white',flex:1,textAlign:'center'}}>{this.state.status.title}</Text></Button>
            {
              this.state.statusOpened && this.props.statuses.map((status)=>
              !(this.state.status.id===status.id) &&
              <Button style={{backgroundColor:status.color,flex:1}} onPress={()=>this.setState({status:status,statusOpened:false})} key={status.id} >
                <Text style={{color:'white',flex:1,textAlign:'center'}}>{status.title}</Text>
              </Button>)
            }
          </View>

          <Text note>{I18n.t('project')}</Text>
          <View style={{ borderColor: '#CCCCCC', borderWidth: 0.5, marginBottom: 15 }}>
            <Picker
              supportedOrientations={['portrait', 'landscape']}
              iosHeader={I18n.t('selectOne')}
              mode="dropdown"
              selectedValue={this.state.project}
              onValueChange={(value)=>{this.props.inputChanged(true);this.setState({project : value,assigned:{id:null,name:I18n.t('noUser')}});this.props.getTaskSolvers(value,this.props.token);}}>
              {
                this.props.projects.map((project)=>
                (<Item label={project.title?project.title:''} key={project.id} value={project.id} />)
              )
            }
          </Picker>
          {this.state.submitError && this.state.project==='null' && <Text style={{color:'red'}}>{I18n.t('restrictionMustSelectTaskProject')}</Text>}
        </View>

        <Text note>{I18n.t('requester')}</Text>
        <View style={{ borderColor: '#CCCCCC', borderWidth: 0.5, marginBottom: 15 }}>
          <Button block style={{backgroundColor:'white'}} onPress={()=>this.setState({requestedByOpen:true})}>
            <Left>
              <Text style={{textAlign:'left',color:'black'}}>{
                  (this.state.requestedBy.name)?<Text>
                  {this.state.requestedBy.name}</Text>:
                  <Text>{this.state.requestedBy.email}</Text>}</Text>
              </Left>
            </Button>
          </View>

          <Text note>{I18n.t('company')}</Text>
          <View style={{ borderColor: '#CCCCCC', borderWidth: 0.5, marginBottom: 15 }}>
            <Button block style={{backgroundColor:'white'}} onPress={()=>this.setState({companyOpen:true})}>
              <Left>
                <Text style={{textAlign:'left',color:'black'}}>{this.state.company==null ? I18n.t('selectCompany') : this.state.company.title}</Text>
              </Left>
            </Button>
            {this.state.submitError && this.state.company==='null' && <Text style={{color:'red'}}>{I18n.t('restrictionMustSelectTaskCompany')}</Text>}
          </View>

          <Text note>{I18n.t('assigned')}</Text>
          <View style={{ borderColor: '#CCCCCC', borderWidth: 0.5, marginBottom: 15 }}>
            <Button block style={{backgroundColor:'white'}} onPress={()=>this.setState({assignedOpen:true})}>
              <Left>
                <Text style={{textAlign:'left',color:'black'}}>{this.state.assigned==null ? I18n.t('selectAssignedTo') : (
                    this.state.assigned.name||this.state.assigned.surname?
                    <Text>{this.state.assigned.name?this.state.assigned.name:''+' '+this.state.assigned.surname?this.state.assigned.surname:''}</Text>:
                      <Text>{this.state.assigned.username}</Text>

                    )}</Text>
                  </Left>
                </Button>
              </View>

          <Text note>{I18n.t('taskWork')}</Text>
          <View style={{ borderColor: '#CCCCCC', borderWidth: 0.5, marginBottom: 15 }}>
            <Picker
              supportedOrientations={['portrait', 'landscape']}
              iosHeader={I18n.t('selectOne')}
              mode="dropdown"
              selectedValue={this.state.workType}
              onValueChange={(value)=>{this.props.inputChanged(true);this.setState({workType : value})}}>
              {
                workTypes.map((work)=>
                (<Item label={work} key={work} value={work} />)
              )
            }
          </Picker>
        </View>

          <Text note>{I18n.t('workHours')}</Text>
          <View style={{ borderColor: '#CCCCCC', borderWidth: 0.5, marginBottom: 15 }}>
            <Input
              value={this.state.work_time}
              keyboardType='numeric'
              placeholder={I18n.t('enterWorkHours')}
              onChangeText={ value => {this.props.inputChanged(true);let result = processInteger(value);this.setState({work_time:(result?result:this.state.work_time)})} }
              />
          </View>

          <Text note>{I18n.t('startsAt')}</Text>
          <View style={{ borderColor: '#CCCCCC', borderWidth: 0.5, marginBottom: 15 }}>
            <Button block style={{backgroundColor:'white'}} onPress={()=>this.setState({startedAtOpen:true})}>
              <Left>
                <Text style={{textAlign:'left',color:'black'}}>{this.state.startedAt==null ? I18n.t('selectPendingAt') : formatDate(this.state.startedAt)}</Text>
              </Left>
            </Button>
            <DateTimePicker
              mode="datetime"
              isVisible={this.state.startedAtOpen}
              onConfirm={(date)=>{this.props.inputChanged(true);this.setState({startedAt:(new Date(date)).getTime(),startedAtOpen:false})}}
              onCancel={()=>this.setState({startedAtOpen:false})}
              />
          </View>

          <Text note>{I18n.t('deadline')}</Text>
          <View style={{ borderColor: '#CCCCCC', borderWidth: 0.5, marginBottom: 15 }}>
            <Button block style={{backgroundColor:'white'}} onPress={()=>this.setState({deadlineOpen:true})}>
              <Left>
                <Text style={{textAlign:'left',color:'black'}}>{this.state.deadline==null ? I18n.t('selectDeadline') : formatDate(this.state.deadline)}</Text>
              </Left>
            </Button>
            <DateTimePicker
              mode="datetime"
              isVisible={this.state.deadlineOpen}
              onConfirm={(date)=>{this.props.inputChanged(true);this.setState({deadline:(new Date(date)).getTime(),deadlineOpen:false})}}
              onCancel={()=>this.setState({deadlineOpen:false})}
              />
          </View>

          <Text note>{I18n.t('followers')}</Text>
          <View style={{ borderColor: '#CCCCCC', borderWidth: 0.5, marginBottom: 15 }}>
            <Button block style={{backgroundColor:'white'}} onPress={()=>this.setState({followersOpen:true})}>
              <Left>
                <Text style={{textAlign:'left',color:'black'}}>{I18n.t('selectFollowers')}</Text>
                  </Left>
                </Button>
                {
                  this.state.followers.map((item)=><Text key={item.id} style={{textAlign:'left',color:'black'}}>
                      {item.name||item.surname?
                      <Text>{item.name?item.name:''+' '+item.surname?item.surname:''}</Text>:
                        <Text>{item.username}</Text>}
                </Text>)
                }
              </View>
              <Modal
                animationType={"fade"}
                transparent={false}
                style={{flex:1}}
                visible={this.state.tagOpen}
                onRequestClose={() => this.setState({tagOpen:false})}
                >
                <Content style={{ padding: 15 }}>
                  <Header>
                    <Body>
                      <Title>{I18n.t('selectTaskTags')}</Title>
                    </Body>
                  </Header>

                  <View style={{ borderColor: '#CCCCCC', borderWidth: 0.5, marginBottom: 15 }}>
                    <List
                      dataArray={this.props.tags}
                      renderRow={item =>
                        <TaskTag item={item} setTag={this.setTag.bind(this)} selected={this.state.tag.some((tag)=>item.id===tag.id)}/>
                      }
                      />
                  </View>

                </Content>
                <Footer>

                  <FooterTab>
                    <Button style={{ flexDirection: 'row', borderColor: 'white', borderWidth: 0.5 }}
                      onPress={()=>this.setState({tagOpen:false})}>
                      <Text style={{ color: 'white' }}>{I18n.t('done')}</Text>
                    </Button>
                  </FooterTab>
                </Footer>
              </Modal>

              <Modal
                animationType={"fade"}
                transparent={false}
                style={{flex:1}}
                visible={this.state.companyOpen}
                onRequestClose={() => this.setState({companyOpen:false})}>
                <Header>
                  <Body>
                    <Title>{I18n.t('selectCompany')}</Title>
                  </Body>
                </Header>
                <Content style={{ padding: 15 }}>

                  <ListItem>
                    <Item rounded>
                      <Icon name="ios-search" />
                      <Input placeholder={I18n.t('search')} value={this.state.companyFilter} onChangeText={((value)=>this.setState({companyFilter:value}))} />
                    </Item>
                  </ListItem>

                  <List>
                    {
                      this.props.companies.map((company) =>
                      company.title.toLowerCase().includes(this.state.companyFilter.toLowerCase()) &&
                      <ListItem button key={company.id} onPress={()=>{this.props.inputChanged(true);this.setState({company:company,companyOpen:false})}} >
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
            visible={this.state.requestedByOpen}
            onRequestClose={() => this.setState({requestedByOpen:false})}>
            <Header>
              <Body>
                <Title>{I18n.t('selectRequester')}</Title>
              </Body>
            </Header>
            <Content style={{ padding: 15 }}>

              <ListItem>
                <Item rounded>
                  <Icon name="ios-search" />
                  <Input placeholder={I18n.t('search')} value={this.state.requestedByFilter}
                    onChangeText={((value)=>{this.props.inputChanged(true);this.setState({requestedByFilter:value})})} />
                </Item>
              </ListItem>

              <List>
                {this.props.users.map((user) =>
                  (user.email+user.name).toLowerCase().includes(this.state.requestedByFilter.toLowerCase()) &&
                  <ListItem button key={user.id} onPress={()=>this.setState({requestedBy:user,requestedByOpen:false})} >
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
          visible={this.state.assignedOpen}
          onRequestClose={() => this.setState({assignedOpen:false})}>
          <Header>
            <Body>
              <Title>{I18n.t('selectAssignedTo')}</Title>
            </Body>
          </Header>
          <Content style={{ padding: 15 }}>

            <ListItem>
              <Item rounded>
                <Icon name="ios-search" />
                <Input placeholder={I18n.t('search')} value={this.state.assignedFilter} onChangeText={((value)=>this.setState({assignedFilter:value}))} />
              </Item>
            </ListItem>

            <List>
                {
                  (([{id:null,name:I18n.t('noUser')}]).concat(this.props.taskSolvers)).map((user) =>
                  ((user.name?user.name:'')+' '+(user.surname?user.surname:'')+' '+(user.name?user.name:'')+user.username).toLowerCase().includes(this.state.assignedFilter.toLowerCase()) &&
                  <ListItem button key={user.id} onPress={()=>{this.props.inputChanged(true);this.setState({assigned:user,assignedOpen:false})}} >
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
        <Modal
          animationType={"fade"}
          transparent={false}
          style={{flex:1}}
          visible={this.state.followersOpen}
          onRequestClose={() => this.setState({followersOpen:false})}
          >
          <Content style={{ padding: 15 }}>
            <Header>
              <Body>
                <Title>{I18n.t('selectTaskFollowers')}</Title>
              </Body>
            </Header>

            <View style={{ borderColor: '#CCCCCC', borderWidth: 0.5, marginBottom: 15 }}>
              <List
                dataArray={this.props.users}
                renderRow={item =>
                  <TaskFollower item={item} setFollower={this.setFollower.bind(this)} selected={this.state.followers.some((follower)=>item.id===follower.id)}/>
                }
                />
            </View>

          </Content>
          <Footer>

            <FooterTab>
              <Button style={{ flexDirection: 'row', borderColor: 'white', borderWidth: 0.5 }}
                onPress={()=>this.setState({followersOpen:false})}>
                <Text style={{ color: 'white' }}>{I18n.t('done')}</Text>
              </Button>
            </FooterTab>
          </Footer>
        </Modal>
      </Content>
    </Container>
  );
  }
}

//creates function that maps actions (functions) to the redux store
const mapStateToProps = ({ taskReducer, loginReducer, userReducer }) => {
  const {users} = userReducer;
  const {token, user} = loginReducer;
  const { companies ,statuses, projects,tags, taskSolvers, task} = taskReducer;
  return { users,user, token, companies,statuses, projects,tags, taskSolvers, task};
};

//exports created Component connected to the redux store and redux actions
export default connect(mapStateToProps,{editTask,getTaskSolvers, deleteFollower,addFollower})(TabAtributes);
