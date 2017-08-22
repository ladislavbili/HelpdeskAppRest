import React, { Component } from 'react';
import { Icon, Text, Right, Body, ListItem, Item, Container} from 'native-base';
import { connect } from 'react-redux';
import styles from './styles';
import I18n from '../../translations/';
import {getTask} from '../../redux/actions';

class TaskListRow extends Component {
  render() {
    return (
      <ListItem button onPress={this.props.getTask} >
              <Body>
                <Text>{this.props.data.name?this.props.data.name:'None'}</Text>
                <Text numberOfLines={1} note>
                  {I18n.t('project')}: {this.props.data.project?this.props.data.project.name:'None'}
                </Text>

                <Text numberOfLines={1} note>{I18n.t('assignedTo')}: {this.props.data.assignedTo?this.props.data.assignedTo.firstName+this.props.data.assignedTo.surName:I18n.t('nobody')}</Text>
                <Text numberOfLines={1} note>{I18n.t('deadline')}: {this.props.data.deadline?this.props.data.deadline:I18n.t('noDate')}</Text>
                <Item style={{backgroundColor:this.props.data.status.color,flex:1,flexDirection:'column'}}>
                  <Text style={{color:'white',paddingLeft:10,paddingRight:10,flex:1,flexDirection:'column'}}>{this.props.data.status.title}</Text>
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

export default connect(mapStateToProps,{getTask})(TaskListRow);
