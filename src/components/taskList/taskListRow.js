import React, { Component } from 'react';
import { Icon, Text, Right, Body, ListItem, Item, Container} from 'native-base';
import { connect } from 'react-redux';
import styles from './styles';
import I18n from '../../translations/';
import {startLoading} from '../../redux/actions';
import { Actions } from 'react-native-router-flux';
import {formatDate} from '../../helperFunctions';

class TaskListRow extends Component {
  render() {
    return (
      <ListItem button onPress={()=>{this.props.startLoading();Actions.taskEdit({id:this.props.task.id})}} >
              <Body>
                <Text>{this.props.task.title?this.props.task.title:''}</Text>
                <Text numberOfLines={1} note>
                  {I18n.t('project')}: {this.props.task.project?this.props.task.project.title:'None'}
                </Text>
                <Text numberOfLines={1} note>{I18n.t('assignedTo')}: {this.props.task.assignedTo?this.props.task.assignedTo.name:I18n.t('nobody')}</Text>
                <Text numberOfLines={1} note>{I18n.t('deadline')}: {this.props.task.deadline?formatDate(this.props.task.deadline):I18n.t('noDate')}</Text>
                <Item style={{backgroundColor:this.props.task.status.color,flex:1,flexDirection:'column'}}>
                  <Text style={{color:'white',paddingLeft:10,paddingRight:10,flex:1,flexDirection:'column'}}>{this.props.task.status.title}</Text>
                </Item>
              </Body>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </ListItem>
    );
  }
}
const mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps,{startLoading})(TaskListRow);
