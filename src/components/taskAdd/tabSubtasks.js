import React, { Component } from 'react';
import { Right, Left, Container, Content, Card, CardItem, Text, Footer, FooterTab, Button, Icon, CheckBox, Input, View } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { ActivityIndicator, Alert } from 'react-native';
import { connect } from 'react-redux';


import i18n from 'i18next';
import {clearSubtasks,addFakeSubtask,editFakeSubtask,deleteFakeSubtask} from '../../redux/actions';

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
    this.props.clearSubtasks();
    this.deleteSubtask.bind(this);
  }

  /**
  * Delete's a single item
  * @param  {int} id    ID of an item that is meant to be deleted
  * @param  {string} title Title of the item
  */
  deleteSubtask(id,title){
    Alert.alert(
      i18n.t('deletingSubtask'),
      i18n.t('deletingSubtaskMessage')+title+'?',
      [
        {text: i18n.t('cancel'), style: 'cancel'},
        {text: i18n.t('ok'), onPress: () =>{
          this.props.deleteFakeSubtask(id);
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
              <CardItem style={{paddingLeft:0, paddingRight:0}}>
                <Left style={{maxWidth:50}}>
                  <Button
                    transparent
                    style={{ padding:5, margin:0}}
                    onPress={()=>{this.props.editFakeSubtask({...item,done: !item.done})}}>
                    <CheckBox
                      style={{padding:0, marginRight:5}}
                      checked={item.done}
                      color='#3F51B5'
                      onPress={()=>{this.props.editFakeSubtask({...item,done: !item.done})}}
                      />
                  </Button>
                </Left>
                <Left>
                  <Input
                    placeholder={"Subtask name"}
                    onFocus={()=>this.setState({editedID:item.id,editedTitle:item.title})}
                    onChange={ event => this.setState({editedTitle:event.nativeEvent.text}) }
                    onSubmitEditing={()=>{
                      this.props.editFakeSubtask({ ...item, title: this.state.editedTitle });
                      this.setState({editedID:null})
                    }}
                    onBlur={()=>{
                      if(this.state.editedID===null){
                        return;
                      }
                      this.props.editFakeSubtask({ ...item, title: this.state.editedTitle });
                      this.setState({editedID:null})
                    }}
                    value={this.state.editedID===item.id?this.state.editedTitle:item.title}
                    />
                </Left>
                <Right style={{maxWidth:45}}>
                  <Button
                    transparent
                    style={{ paddingLeft:15,paddingRight:15}}
                    onPress={()=>this.deleteSubtask(item.id,item.title)}>
                    <Icon name="md-trash" style={{ color: 'black' }} />
                  </Button>
                </Right>
              </CardItem>
            </Card>)}

            <Card>
              <CardItem style={{paddingLeft:0, paddingRight:0}}>
                <Left style={{maxWidth:50}}>
                  <Button
                    transparent
                    style={{ padding:5, margin:0}}
                    onPress={()=>this.setState({newDone:!this.state.newDone})}>
                    <CheckBox checked={this.state.newDone} color='#3F51B5' style={{padding:0, marginRight:5}} onPress={()=>this.setState({newDone:!this.state.newDone})}/>
                  </Button>
                </Left>
                <Left>
                  <Input
                    onChange={ event => this.setState({newTitle:event.nativeEvent.text}) }
                    placeholder={i18n.t('enterNewSubtask')}
                    value={this.state.newTitle}
                    />
                </Left>
                <Right style={{maxWidth:45}}>
                  <Button
                    transparent
                    style={{ paddingLeft:15,paddingRight:15}}
                    onPress={()=>{
                      if(this.state.newTitle==='')return;
                      this.props.addFakeSubtask({id:this.props.subtasks.length, done: this.state.newDone, title: this.state.newTitle });
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
  const mapStateToProps = ({ subtaskReducer }) => {
    const { subtasks } = subtaskReducer;
    return { subtasks };
  };

  //exports created Component connected to the redux store and redux actions
  export default connect(mapStateToProps,{clearSubtasks,addFakeSubtask,editFakeSubtask,deleteFakeSubtask})(TabSubtasks);
