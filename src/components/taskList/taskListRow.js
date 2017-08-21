import React, { Component } from 'react';
import { Icon, Text, Right, Body, ListItem, Item, Container} from 'native-base';
import { Actions } from 'react-native-router-flux';
import styles from './styles';

class TaskListRow extends Component {
  render() {
    return (
      <ListItem button onPress={()=>Actions.taskEdit({data:this.props.data})} >
              <Body>
                <Text>{this.props.data.title?this.props.data.title:'None'}</Text>
                <Text numberOfLines={1} note>
                  Projekt: {this.props.data.project?this.props.data.project.title:'None'}
                </Text>
                <Text numberOfLines={1} note>Riešiteľ: {this.props.data.taskHasAssignedUsers.length>0?this.props.data.taskHasAssignedUsers[0].user.username:'Nobody'}</Text>
                <Text numberOfLines={1} note>Deadline: {this.props.data.deadline?this.props.data.deadline:'No Date'}</Text>
                {
                  this.props.data.taskHasAssignedUsers.length > 0 && this.props.data.taskHasAssignedUsers.map((record, i) =>
                    <Item key={i} style={{backgroundColor:record.status.color,flex:1,flexDirection:'column'}}>
                    <Text style={{color:'white',paddingLeft:10,paddingRight:10,flex:1,flexDirection:'column'}}>{record.status.title}</Text>
                    </Item>)
                }
              </Body>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </ListItem>
    );
  }
}

export default TaskListRow;
