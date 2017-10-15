
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Title ,Header, Body, Content, Text, List, ListItem, Icon, Container, Left, Right, Badge } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { ActivityIndicator } from 'react-native';

import { closeDrawer, setLastTask } from '../../redux/actions';
import styles from './style';
import I18n from '../../translations/';

class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shadowOffsetWidth: 1,
      shadowRadius: 4,
    };
  }
  render() {
    if(this.props.loadingProjects){
      return (
        <ActivityIndicator
        animating size={ 'large' }
        color='#007299' />
      )
    }
    return (
      <Container>
        <Content
          bounces={false}
          style={{ flex: 1, backgroundColor: '#fff', top: -1 }}
        >
        <Header>
          <Body>
            <Title>{I18n.t('appName')}</Title>
          </Body>
          <Right />
        </Header>
        <Text>Filters</Text>
        <List
          dataArray={this.props.filters} renderRow={data =>
            <ListItem button noBorder onPress={() => {this.props.closeDrawer();Actions.taskList({filterId:data.id,filter:null,title:data.title,id:this.props.currentTask});}} >
              <Left>
                <Icon active name={data.id=='REQUESTED'||data.id=='INBOX'?'ios-color-filter-outline':'ios-folder-outline'} style={{ color: '#777', fontSize: 26, width: 30 }} />
                <Text style={styles.text}>{data.title}</Text>
              </Left>
            </ListItem>
          }
        />
        <Text>Projects</Text>
        <List
          dataArray={this.props.projects} renderRow={data =>
            <ListItem button noBorder onPress={() => {this.props.closeDrawer();Actions.taskList({filter:{project:''+data.id},filterId:null,title:data.title,id:this.props.currentTask});}} >
              <Left>
                <Icon active name={data.id=='REQUESTED'||data.id=='INBOX'?'ios-color-filter-outline':'ios-folder-outline'} style={{ color: '#777', fontSize: 26, width: 30 }} />
                <Text style={styles.text}>{data.title}</Text>
              </Left>
              {(data.numberOfTasks>0) &&
              <Right style={{ flex: 1 }}>
                <Badge
                  style={{ borderRadius: 3, height: 25, backgroundColor: '#477EEA' }}
                >
                  <Text style={styles.badgeText}>{data.numberOfTasks.toString()}</Text>
                </Badge>
              </Right>
              }
            </ListItem>
          }
        />
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = ({ taskR, login }) => {
  const { token } = login;
  const { projects, loadingProjects,filters, currentTask } = taskR;
  return { projects, token, loadingProjects, filters,currentTask };
};

export default connect(mapStateToProps, {closeDrawer,setLastTask})(SideBar);
