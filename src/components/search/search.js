import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal } from 'react-native';
import { Input, Picker, Item, Container, Header, Title, Content, Button, Icon, Text, Left, Body, View, List, ListItem, Footer, FooterTab } from 'native-base';
import { Actions } from 'react-native-router-flux';
import I18n from '../../translations/';
import SearchLabel from './label';
import ModalRow from './modalRow';
import UserRow from './userRow';

class Search extends Component {

  constructor(props) {
    super(props);
    this.state = {
      title:'',
      modalCreatedBy:false,
      createdBy:[],
      modalRequestedBy:false,
      requestedBy:[],
      modalAssignedTo:false,
      assignedTo:[],
      modalStatuses:false,
      statuses:[],
      modalProjects:false,
      projects:[],
      modalCompanies:false,
      companies:[],
      modalLabel:false,
      labels:[]
    }
  }

  setCreatedBy(removing,createdBy){
   if(removing){
     let index=this.state.createdBy.findIndex((item)=>item.id==createdBy.id);
     if(index==-1){
       return;
     }
     let newcreatedBy=[...this.state.createdBy];
     newcreatedBy.splice(index,1);
     this.setState({createdBy:newcreatedBy});
   }
   else{
     let index=this.state.createdBy.findIndex((item)=>item.id==createdBy.id);
     if(index==-1){
       this.setState({createdBy:[...this.state.createdBy,createdBy]});
     }
   }
  }

  setRequestedBy(removing,requestedBy){
   if(removing){
     let index=this.state.requestedBy.findIndex((item)=>item.id==requestedBy.id);
     if(index==-1){
       return;
     }
     let newrequestedBy=[...this.state.requestedBy];
     newrequestedBy.splice(index,1);
     this.setState({requestedBy:newrequestedBy});
   }
   else{
     let index=this.state.requestedBy.findIndex((item)=>item.id==requestedBy.id);
     if(index==-1){
       this.setState({requestedBy:[...this.state.requestedBy,requestedBy]});
     }
   }
  }

  setAssignedTo(removing,assignedTo){
   if(removing){
     let index=this.state.assignedTo.findIndex((item)=>item.id==assignedTo.id);
     if(index==-1){
       return;
     }
     let newassignedTo=[...this.state.assignedTo];
     newassignedTo.splice(index,1);
     this.setState({assignedTo:newassignedTo});
   }
   else{
     let index=this.state.assignedTo.findIndex((item)=>item.id==assignedTo.id);
     if(index==-1){
       this.setState({assignedTo:[...this.state.assignedTo,assignedTo]});
     }
   }
  }

  setStatus(removing,status){
   if(removing){
     let index=this.state.statuses.findIndex((item)=>item.id==status.id);
     if(index==-1){
       return;
     }
     let newstatuses=[...this.state.statuses];
     newstatuses.splice(index,1);
     this.setState({statuses:newstatuses});
   }
   else{
     let index=this.state.statuses.findIndex((item)=>item.id==status.id);
     if(index==-1){
       this.setState({statuses:[...this.state.statuses,status]});
     }
   }
  }

  setProject(removing,project){
   if(removing){
     let index=this.state.projects.findIndex((item)=>item.id==project.id);
     if(index==-1){
       return;
     }
     let newprojects=[...this.state.projects];
     newprojects.splice(index,1);
     this.setState({projects:newprojects});
   }
   else{
     let index=this.state.projects.findIndex((item)=>item.id==project.id);
     if(index==-1){
       this.setState({projects:[...this.state.projects,project]});
     }
   }
  }

  setCompany(removing,company){
   if(removing){
     let index=this.state.companies.findIndex((item)=>item.id==company.id);
     if(index==-1){
       return;
     }
     let newCompanies=[...this.state.companies];
     newCompanies.splice(index,1);
     this.setState({companies:newCompanies});
   }
   else{
     let index=this.state.companies.findIndex((item)=>item.id==company.id);
     if(index==-1){
       this.setState({companies:[...this.state.companies,company]});
     }
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

  submit(){
    let labels = "";
    this.state.labels.map((item)=> labels+= item.id+',');

    let companies = "";
    this.state.companies.map((item)=> companies+= item.id+',');

    let projects = "";
    this.state.projects.map((item)=> projects+= item.id+',');

    let statuses = "";
    this.state.statuses.map((item)=> statuses+= item.id+',');

    let assignedTo = "";
    this.state.assignedTo.map((item)=> assignedTo+= item.id+',');

    let requestedBy = "";
    this.state.requestedBy.map((item)=> requestedBy+= item.id+',');

    let createdBy = "";
    this.state.createdBy.map((item)=> createdBy+= item.id+',');

    Actions.taskList({
      filter:{
        search:this.state.title,
        tag:labels.substring(0,labels.length-1),
        company:companies.substring(0,companies.length-1),
        project:projects.substring(0,projects.length-1),
        status:statuses.substring(0,statuses.length-1),
        assigned:assignedTo.substring(0,assignedTo.length-1),
        requester:requestedBy.substring(0,requestedBy.length-1),
        creator:createdBy.substring(0,createdBy.length-1),
    }});
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
            <Title>{I18n.t('search')}</Title>
          </Body>
        </Header>
        <Content style={{ padding: 15 }}>
          <View style={{ borderColor: '#CCCCCC', borderWidth: 0.5, marginBottom: 15 }}>
            <Input
              placeholder="Task title"
              value={ this.state.title }
              onChangeText={ value => this.setState({title:value}) }
            />
          </View>

          <Text note>Created by to</Text>
          <View style={{ borderColor: '#CCCCCC', borderWidth: 0.5, marginBottom: 15 }}>
            <Button block onPress={()=>{this.setState({modalCreatedBy:true})}}><Text>Filter by created by</Text></Button>
            <List
              dataArray={this.state.createdBy}
              renderRow={item =>
                <ListItem>
                <Body>
                    {
                      (item.detailData.name||item.detailData.surname)?<Text>{item.detailData.name?item.detailData.name+' ':''}{item.detailData.surname?item.detailData.surname:''}</Text>:null
                    }
                    <Text note>{item.email}</Text>
                  </Body>
                </ListItem>
                }
            />
          </View>
          <Modal
            animationType={"fade"}
            transparent={false}
            style={{flex:1}}
            visible={this.state.modalCreatedBy}
            onRequestClose={() => this.setState({modalCreatedBy:false})}
            >
            <Content style={{ padding: 15 }}>
            <Header>
              <Body>
                <Title>Select created by</Title>
              </Body>
            </Header>

           <View style={{ borderColor: '#CCCCCC', borderWidth: 0.5, marginBottom: 15 }}>
             <List
               dataArray={this.props.users}
               renderRow={item =>
                 <UserRow item={item} setData={this.setCreatedBy.bind(this)} selected={this.state.createdBy.some((createdBy)=>item.id==createdBy.id)}/>
                 }
             />
           </View>
           </Content>
           <Footer>

             <FooterTab>
               <Button style={{ flexDirection: 'row', borderColor: 'white', borderWidth: 0.5 }}
                 onPress={()=>this.setState({modalCreatedBy:false})}>
                 <Text style={{ color: 'white' }}>DONE</Text>
               </Button>
             </FooterTab>
           </Footer>
          </Modal>

          <Text note>Requested by to</Text>
          <View style={{ borderColor: '#CCCCCC', borderWidth: 0.5, marginBottom: 15 }}>
            <Button block onPress={()=>{this.setState({modalRequestedBy:true})}}><Text>Filter by requested by</Text></Button>
            <List
              dataArray={this.state.requestedBy}
              renderRow={item =>
                <ListItem>
                <Body>
                    {
                      (item.detailData.name||item.detailData.surname)?<Text>{item.detailData.name?item.detailData.name+' ':''}{item.detailData.surname?item.detailData.surname:''}</Text>:null
                    }
                    <Text note>{item.email}</Text>
                  </Body>
                </ListItem>
                }
            />
          </View>
          <Modal
            animationType={"fade"}
            transparent={false}
            style={{flex:1}}
            visible={this.state.modalRequestedBy}
            onRequestClose={() => this.setState({modalRequestedBy:false})}
            >
            <Content style={{ padding: 15 }}>
            <Header>
              <Body>
                <Title>Select requested by</Title>
              </Body>
            </Header>

           <View style={{ borderColor: '#CCCCCC', borderWidth: 0.5, marginBottom: 15 }}>
             <List
               dataArray={this.props.users}
               renderRow={item =>
                 <UserRow item={item} setData={this.setRequestedBy.bind(this)} selected={this.state.requestedBy.some((requestedBy)=>item.id==requestedBy.id)}/>
                 }
             />
           </View>
           </Content>
           <Footer>

             <FooterTab>
               <Button style={{ flexDirection: 'row', borderColor: 'white', borderWidth: 0.5 }}
                 onPress={()=>this.setState({modalRequestedBy:false})}>
                 <Text style={{ color: 'white' }}>DONE</Text>
               </Button>
             </FooterTab>
           </Footer>
          </Modal>

          <Text note>Assigned to</Text>
          <View style={{ borderColor: '#CCCCCC', borderWidth: 0.5, marginBottom: 15 }}>
            <Button block onPress={()=>{this.setState({modalAssignedTo:true})}}><Text>Filter by assigned to</Text></Button>
            <List
              dataArray={this.state.assignedTo}
              renderRow={item =>
                <ListItem>
                <Body>
                    {
                      (item.detailData.name||item.detailData.surname)?<Text>{item.detailData.name?item.detailData.name+' ':''}{item.detailData.surname?item.detailData.surname:''}</Text>:null
                    }
                  <Text note>{item.email}</Text>
                </Body>
                </ListItem>
                }
            />
          </View>
          <Modal
            animationType={"fade"}
            transparent={false}
            style={{flex:1}}
            visible={this.state.modalAssignedTo}
            onRequestClose={() => this.setState({modalAssignedTo:false})}
            >
            <Content style={{ padding: 15 }}>
            <Header>
              <Body>
                <Title>Select assigned to</Title>
              </Body>
            </Header>

           <View style={{ borderColor: '#CCCCCC', borderWidth: 0.5, marginBottom: 15 }}>
             <List
               dataArray={this.props.users}
               renderRow={item =>
                 <UserRow item={item} setData={this.setAssignedTo.bind(this)} selected={this.state.assignedTo.some((assignedTo)=>item.id==assignedTo.id)}/>
                 }
             />
           </View>
           </Content>
           <Footer>

             <FooterTab>
               <Button style={{ flexDirection: 'row', borderColor: 'white', borderWidth: 0.5 }}
                 onPress={()=>this.setState({modalAssignedTo:false})}>
                 <Text style={{ color: 'white' }}>DONE</Text>
               </Button>
             </FooterTab>
           </Footer>
          </Modal>

          <Text note>Statuses</Text>
          <View style={{ borderColor: '#CCCCCC', borderWidth: 0.5, marginBottom: 15 }}>
            <Button block onPress={()=>{this.setState({modalStatuses:true})}}><Text>Filter by statuses</Text></Button>
            <List
              dataArray={this.state.statuses}
              renderRow={status =>
                <ListItem>
                  <View style={{backgroundColor:((status.color.includes('#')?'':'#')+status.color),paddingLeft:10}}>
                    <Text style={{color:'white'}}>{status.title}</Text>
                  </View>
                </ListItem>
                }
            />
          </View>
          <Modal
            animationType={"fade"}
            transparent={false}
            style={{flex:1}}
            visible={this.state.modalStatuses}
            onRequestClose={() => this.setState({modalStatuses:false})}
            >
            <Content style={{ padding: 15 }}>
            <Header>
              <Body>
                <Title>Select statuses</Title>
              </Body>
            </Header>

           <View style={{ borderColor: '#CCCCCC', borderWidth: 0.5, marginBottom: 15 }}>
             <List
               dataArray={this.props.statuses}
               renderRow={item =>
                 <SearchLabel item={item} setData={this.setStatus.bind(this)} selected={this.state.statuses.some((status)=>item.id==status.id)}/>
                 }
             />
           </View>
           </Content>
           <Footer>

             <FooterTab>
               <Button style={{ flexDirection: 'row', borderColor: 'white', borderWidth: 0.5 }}
                 onPress={()=>this.setState({modalStatuses:false})}>
                 <Text style={{ color: 'white' }}>DONE</Text>
               </Button>
             </FooterTab>
           </Footer>
          </Modal>

          <Text note>Projects</Text>
          <View style={{ borderColor: '#CCCCCC', borderWidth: 0.5, marginBottom: 15 }}>
            <Button block onPress={()=>{this.setState({modalProjects:true})}}><Text>Filter by projects</Text></Button>
            <List
              dataArray={this.state.projects}
              renderRow={project =>
                <ListItem>
                  <Text>{project.title}</Text>
                </ListItem>
                }
            />
          </View>
          <Modal
            animationType={"fade"}
            transparent={false}
            style={{flex:1}}
            visible={this.state.modalProjects}
            onRequestClose={() => this.setState({modalProjects:false})}
            >
            <Content style={{ padding: 15 }}>
            <Header>
              <Body>
                <Title>Select projects</Title>
              </Body>
            </Header>

           <View style={{ borderColor: '#CCCCCC', borderWidth: 0.5, marginBottom: 15 }}>
             <List
               dataArray={this.props.projects}
               renderRow={item =>
                 <ModalRow item={item} setData={this.setProject.bind(this)} selected={this.state.projects.some((project)=>item.id==project.id)}/>
                 }
             />
           </View>
           </Content>
           <Footer>

             <FooterTab>
               <Button style={{ flexDirection: 'row', borderColor: 'white', borderWidth: 0.5 }}
                 onPress={()=>this.setState({modalProjects:false})}>
                 <Text style={{ color: 'white' }}>DONE</Text>
               </Button>
             </FooterTab>
           </Footer>
          </Modal>

          <Text note>Companies</Text>
          <View style={{ borderColor: '#CCCCCC', borderWidth: 0.5, marginBottom: 15 }}>
            <Button block onPress={()=>{this.setState({modalCompanies:true})}}><Text>Filter by companies</Text></Button>
            <List
              dataArray={this.state.companies}
              renderRow={company =>
                <ListItem>
                  <Text>{company.title}</Text>
                </ListItem>
                }
            />
          </View>
          <Modal
            animationType={"fade"}
            transparent={false}
            style={{flex:1}}
            visible={this.state.modalCompanies}
            onRequestClose={() => this.setState({modalCompanies:false})}
            >
            <Content style={{ padding: 15 }}>
            <Header>
              <Body>
                <Title>Select companies</Title>
              </Body>
            </Header>

           <View style={{ borderColor: '#CCCCCC', borderWidth: 0.5, marginBottom: 15 }}>
             <List
               dataArray={this.props.companies}
               renderRow={item =>
                 <ModalRow item={item} setData={this.setCompany.bind(this)} selected={this.state.companies.some((company)=>item.id==company.id)}/>
                 }
             />
           </View>
           </Content>
           <Footer>

             <FooterTab>
               <Button style={{ flexDirection: 'row', borderColor: 'white', borderWidth: 0.5 }}
                 onPress={()=>this.setState({modalCompanies:false})}>
                 <Text style={{ color: 'white' }}>DONE</Text>
               </Button>
             </FooterTab>
           </Footer>
          </Modal>

          <Text note>Labels</Text>
          <View style={{ borderColor: '#CCCCCC', borderWidth: 0.5, marginBottom: 15 }}>
            <Button block onPress={()=>{this.setState({modalLabel:true})}}><Text>Filter by labels</Text></Button>
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
                 <SearchLabel item={item} setData={this.setLabel.bind(this)} selected={this.state.labels.some((label)=>item.id==label.id)}/>
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

          <Button onPress={this.submit.bind(this)} primary block style={{ margin: 15 }}>
            <Text>{I18n.t('search')}</Text>
          </Button>
      </Content>
    </Container>
    );
  }
}
const mapStateToProps = ({ taskR, login, userR, companyR }) => {
  const { users } = userR;
  const { companies } = companyR;
  const { statuses, projects,labels} = taskR;
  return { users, companies,statuses, projects, labels};
};

export default connect(mapStateToProps,{})(Search);
