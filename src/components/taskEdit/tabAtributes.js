import React, { Component } from 'react';
import { Modal } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { View, Body, Container, Content, Icon, Input, Item, Label, Text, Footer, FooterTab, Button, Picker,  ListItem, Header,Title , Left, Right, List } from 'native-base';
import styles from './styles';

class TabAtributes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      taskName:this.props.data.title,
      taskDescription:this.props.data.description,
      assignedTo:this.props.data.assignedUser?this.props.users[this.props.users.findIndex((item)=>item.id==this.props.data.assignedUser.id)]:null,
      requester:this.props.data.requester?this.props.users[this.props.users.findIndex((item)=>item.id==this.props.data.requester.id)]:null,
      status:this.props.data.status?this.props.data.status:{color:'blue',name:'Statusss'},
      duration:this.props.data.duration?this.props.data.duration.toString():'0',
      descriptionHeight:100,
      company:this.props.data.company?this.props.companies[this.props.companies.findIndex((item)=>item.id==this.props.data.company.id)]:null,
      project:this.props.data.project?this.props.data.project.id:this.props.projects[0].id,
      statusChangedAt:this.props.data.statusChangedAt?this.props.data.statusChangedAt.toString():'',
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
    let statusButtonStyle={flex:1};
    if(this.state.status=='' && this.props.data.status){
      statusButtonStyle={backgroundColor:this.props.data.status.color,flex:1};
    }
    else if (this.state.status!='') {
      statusButtonStyle={backgroundColor:this.state.status.color,flex:1};
    }
    return (
      <Container>
        <Content style={{ padding: 15 }}>

          <Text note>Task Name</Text>
          <View style={{ borderColor: '#CCCCCC', borderWidth: 0.5, marginBottom: 15 }}>
            <Input
              placeholder="Enter task name"
              value={ this.state.taskName }
              onChangeText={ value => this.setState({taskName:value}) }
            />
          </View>

          <View style={{flexDirection:'row'}}>
            <Text note>Status</Text>
            <Text note  style={{textAlign: 'right',flex:1}}>{this.state.statusChangedAt}</Text>
          </View>

          <View style={{ borderColor: '#CCCCCC', borderWidth: 0.5, marginBottom: 15 }}>
            <Button style={statusButtonStyle} onPress={()=>this.setState({pickingStatus:!this.state.pickingStatus})}><Text style={{color:'white',flex:1,textAlign:'center'}}>{this.state.status =='' && this.props.data.status ? this.props.data.status.name : this.state.status ==''?'Choose status':this.state.status.name}</Text></Button>
              {
              this.state.pickingStatus && this.props.statuses.map((status)=>
                  this.state.status!=status && !(this.props.data.status.id==status.id && this.state.status=='') &&
                  <Button style={{backgroundColor:status.color,flex:1}} onPress={()=>this.setState({status:status,pickingStatus:false})} key={status.id} >
                    <Text style={{color:'white',flex:1,textAlign:'center'}}>{status.name}</Text>
                  </Button>)
              }
          </View>

          <Text note>Description</Text>
          <View style={{ borderColor: '#CCCCCC', borderWidth: 0.5, marginBottom: 15 }}>
            <Input
              style={{height:Math.max(35, this.state.descriptionHeight)}}
              multiline={true}
              onChange={ event => this.setState({taskDescription:event.nativeEvent.text,descriptionHeight:event.nativeEvent.text.length/1.2}) }
              value={ this.state.taskDescription }
              placeholder="Popis"
            />
          </View>


          <Text note>Project</Text>
          <View style={{ borderColor: '#CCCCCC', borderWidth: 0.5, marginBottom: 15 }}>
            <Picker
              supportedOrientations={['portrait', 'landscape']}
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

          <Text note>Requester</Text>
          <View style={{ borderColor: '#CCCCCC', borderWidth: 0.5, marginBottom: 15 }}>
            <Button block style={{backgroundColor:'white'}} onPress={()=>this.setState({selectingRequester:true})}>
              <Left>
                <Text style={{textAlign:'left',color:'black'}}>{this.state.requester==null ? "Určite žiadateľa" : (
                  (this.state.requester.firstName||this.state.requester.surName)?<Text>
                    {
                    this.state.requester.firstName?
                    this.state.requester.firstName+' ':
                    ''+this.state.requester.surName?this.state.requester.surName:''
                  }</Text>:
                <Text>{this.state.requester.email}</Text>

                )}</Text>
              </Left>
            </Button>
          </View>

          <Text note>Company</Text>
          <View style={{ borderColor: '#CCCCCC', borderWidth: 0.5, marginBottom: 15 }}>
            <Button block style={{backgroundColor:'white'}} onPress={()=>this.setState({selectingCompany:true})}>
              <Left>
                <Text style={{textAlign:'left',color:'black'}}>{this.state.company==null ? "Výber firmy" : this.state.company.name}</Text>
              </Left>
            </Button>
          </View>

          <Text note>Assigned to</Text>
          <View style={{ borderColor: '#CCCCCC', borderWidth: 0.5, marginBottom: 15 }}>
            <Button block style={{backgroundColor:'white'}} onPress={()=>this.setState({selectingAssignedTo:true})}>
              <Left>
                <Text style={{textAlign:'left',color:'black'}}>{this.state.assignedTo==null ? "Výber riešiteľa" : (
                  (this.state.assignedTo.firstName||this.state.assignedTo.surName)?<Text>
                    {
                    this.state.assignedTo.firstName?
                    this.state.assignedTo.firstName+' ':
                    ''+this.state.assignedTo.surName?this.state.assignedTo.surName:''
                  }</Text>:
                <Text>{this.state.assignedTo.email}</Text>
                )}</Text>
              </Left>
            </Button>
          </View>

          <Text note>Work hours</Text>
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
              <Title>Výber firmy</Title>
              </Body>
            </Header>
            <Content style={{ padding: 15 }}>

            <ListItem>
              <Item rounded>
                <Icon name="ios-search" />
                <Input placeholder="Hľadanie" value={this.state.filterWord} onChangeText={((value)=>this.setState({filterWord:value}))} />
              </Item>
            </ListItem>

            <List>
            {
              this.props.companies.map((company) =>
              company.name.toLowerCase().includes(this.state.filterWord.toLowerCase()) && <ListItem button key={company.id} onPress={()=>this.setState({company:company,selectingCompany:false})} >
                <Body>
                  <Text>{company.name}</Text>
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
              <Title>Výber žiadateľa</Title>
              </Body>
            </Header>
            <Content style={{ padding: 15 }}>

            <ListItem>
              <Item rounded>
                <Icon name="ios-search" />
                <Input placeholder="Vyhľadávanie" value={this.state.filterWordRequester} onChangeText={((value)=>this.setState({filterWordRequester:value}))} />
              </Item>
            </ListItem>

            <List>
            {
              (([{id:null,firstName:"Nikto", email:"žiadny"}]).concat(this.props.users)).map((user) =>
              {
              return ((user.email+user.firstName+' '+user.surName+' '+user.firstName).toLowerCase().includes(this.state.filterWordRequester.toLowerCase()) &&
              <ListItem button key={user.id} onPress={()=>this.setState({requester:user,selectingRequester:false})} >
                <Body>
                {
                  (user.firstName || user.surName)?<Text>{((user.firstName?(user.firstName+' '):'')+ (user.surName?user.surName:''))}</Text>:null
                }
                <Text note>{user.email}</Text>
                </Body>
                <Right>
                  <Icon name="arrow-forward" />
                </Right>
              </ListItem>);
              }
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
              <Title>Vyber riešiteľa</Title>
              </Body>
            </Header>
            <Content style={{ padding: 15 }}>

            <ListItem>
              <Item rounded>
                <Icon name="ios-search" />
                <Input placeholder="Vyhľadávanie" value={this.state.filterWordAssignedTo} onChangeText={((value)=>this.setState({filterWordAssignedTo:value}))} />
              </Item>
            </ListItem>

            <List>
            {
              (([{id:null,firstName:'Nikto', email:'Žiadny'}]).concat(this.props.users)).map((user) =>
              (user.email+user.firstName+' '+user.surName+' '+user.firstName).toLowerCase().includes(this.state.filterWordAssignedTo.toLowerCase()) &&
              <ListItem button key={user.id} onPress={()=>this.setState({assignedTo:user,selectingAssignedTo:false})} >
                <Body>
                {
                  (user.firstName || user.surName)?<Text>{((user.firstName?(user.firstName+' '):'')+ (user.surName?user.surName:''))}</Text>:null
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
            <Text style={{ color: 'white' }} >Zrušiť</Text>
          </Button>
        </FooterTab>

        <FooterTab>
          <Button iconLeft style={{ flexDirection: 'row', borderColor: 'white', borderWidth: 0.5 }}
          onPress={this.submitForm.bind(this)}
          >
            <Icon active name="md-add" style={{ color: 'white' }} />
            <Text style={{ color: 'white' }} >Uložiť</Text>
          </Button>
        </FooterTab>
    </Footer>
    </Container>
    );
  }
}

const mapStateToProps = ({ task }) => {
  return { users, companies,statuses, projects} = task;
};

export default connect(mapStateToProps,{})(TabAtributes);
