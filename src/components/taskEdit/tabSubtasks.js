import React, { Component } from 'react';
import { Right, Left, Container, Content, Card, CardItem, Text, Footer, FooterTab, Button, Icon, CheckBox, Input } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { ActivityIndicator, Alert } from 'react-native';
import { connect } from 'react-redux';


import I18n from '../../translations/';
import {addSubtask,deleteSubtask,editSubtask} from '../../redux/actions';

/**
* Display's all of the items used in this task
* @extends Component
*/
class TabSubtasks extends Component{
  constructor(props){
    super(props);
    this.state={
      newDone:false,
      newTitle:'',
      editedTitle:'',
      editedID:null,
    }
    this.deleteSubtask.bind(this);
  }
  /**
  * Delete's a single item
  * @param  {int} id    ID of an item that is meant to be deleted
  * @param  {string} title Title of the item
  */
  deleteSubtask(id,title){
    console.log('nom');
    Alert.alert(
      I18n.t('deletingSubtask'),
      I18n.t('deletingSubtaskMessage')+title,
      [
        {text: I18n.t('cancel'), style: 'cancel'},
        {text: I18n.t('ok'), onPress: () =>{
          this.props.deleteSubtask(
            id,
            this.props.id,
            this.props.token
          );
        }},
      ],
      { cancelable: false }
    )
  }

  render() {
    return (
      <Container>
        <Content padder style={{ marginTop: 0 }}>
          {
            this.props.subtasks.map((item)=>
            <Card key={item.id}>
              <CardItem>
                <Left style={{maxWidth:30}}>
                  <CheckBox checked={item.done} color='#3F51B5' onPress={()=>{
                    this.props.editSubtask(
                      { done: !item.done, title: item.title },
                      item.id,
                      this.props.id,
                      this.props.token
                    )}}/>
                </Left>
                <Left>
                  <Input
                    placeholder={"Subtask name"}
                    onFocus={()=>this.setState({editedID:item.id,editedTitle:item.title})}
                    onChange={ event => this.setState({editedTitle:event.nativeEvent.text}) }
                    onSubmitEditing={()=>{
                      this.props.editSubtask(
                        { done: item.done, title: this.state.editedTitle },
                        item.id,
                        this.props.id,
                        this.props.token
                      );
                      this.setState({editedID:null})
                    }}
                    onBlur={()=>{
                      if(this.state.editedID===null){
                        return;
                      }
                      this.props.editSubtask(
                        { done: item.done, title: this.state.editedTitle },
                        item.id,
                        this.props.id,
                        this.props.token
                      );
                      this.setState({editedID:null})
                    }}
                    value={this.state.editedID===item.id?this.state.editedTitle:item.title}
                    />
                </Left>
                <Right style={{maxWidth:30}}>
                  <Button transparent  onPress={()=>this.deleteSubtask(item.id,item.title)}>
                    <Icon name="md-trash" style={{ color: 'black' }} />
                  </Button>
                </Right>
              </CardItem>
            </Card>)}
            <Card>
              <CardItem>
                <Left style={{maxWidth:30}}>
                  <CheckBox checked={this.state.newDone} color='#3F51B5' onPress={()=>this.setState({newDone:!this.state.newDone})}/>
                </Left>
                <Left>
                  <Input
                    onChange={ event => this.setState({newTitle:event.nativeEvent.text}) }
                    placeholder={"Enter new subtask"}
                    value={this.state.newTitle}
                    />
                </Left>
                <Right style={{maxWidth:30}}>
                  <Button
                    transparent
                    onPress={()=>{
                      if(this.state.newTitle==='')return;
                      this.props.addSubtask({ done: false, title: this.state.newTitle },this.props.id,this.props.token);
                      this.setState({newDone:false,newTitle:''});
                    }}>
                    <Icon name="md-add" style={{ color: this.state.newTitle!==''?'black':'grey' }} />
                  </Button>
                </Right>
              </CardItem>
            </Card>
          </Content>
        </Container>
      );
    }
  }
//md-add
  //creates function that maps actions (functions) to the redux store
  const mapStateToProps = ({ subtaskReducer, loginReducer, taskReducer}) => {
    const { subtasks } = subtaskReducer;
    const { token } = loginReducer;
    return { subtasks,token, ACL:taskReducer.task.loggedUserProjectAcl.concat(taskReducer.task.loggedUserRoleAcl) };
  };

  //exports created Component connected to the redux store and redux actions
  export default connect(mapStateToProps,{addSubtask,deleteSubtask,editSubtask})(TabSubtasks);
