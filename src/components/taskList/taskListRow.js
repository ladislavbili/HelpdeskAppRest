import React, { Component } from 'react';
import { Icon, Text, Right, Body, ListItem, Item} from 'native-base';
import { connect } from 'react-redux';

import I18n from '../../translations/';
import {startLoading} from '../../redux/actions';
import { Actions } from 'react-native-router-flux';
import {formatDate} from '../../helperFunctions';

class TaskListRow extends Component {
  render() {
    let project=this.props.task.project;
    let assigned=this.props.task.taskHasAssignedUsers?this.props.task.taskHasAssignedUsers[0]:false;
    return (
      <ListItem button onPress={()=>{this.props.startLoading();Actions.taskEdit({id:this.props.task.id,fromFilter:false})}} >
              <Body>
                <Text>{this.props.task.title?this.props.task.title:''}</Text>
                <Text numberOfLines={1} note>
                  {I18n.t('project')}: {project?project.title:'None'}
                </Text>
                <Text numberOfLines={1} note>{I18n.t('assignedTo')}: {assigned?assigned.user.username:I18n.t('nobody')}</Text>
                <Text numberOfLines={1} note>{I18n.t('deadline')}: {this.props.task?'tu bude deadline':I18n.t('noDate')}</Text>
                { assigned &&
                  <Item style={{backgroundColor:assigned.status.color,flex:1,flexDirection:'column'}}>
                    <Text style={{color:'white',paddingLeft:10,paddingRight:10,flex:1,flexDirection:'column'}}>{assigned.status.title}</Text>
                  </Item>
                  }
              </Body>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </ListItem>
    );
  }
}
const mapStateToProps = () => {
  return {};
};

export default connect(mapStateToProps,{startLoading})(TaskListRow);
