
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Title ,Header, Body, Content, Text, List, ListItem, Icon, Container, Left, Right, Badge } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { ActivityIndicator } from 'react-native';
import { closeDrawer } from '../../redux/actions';
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
          <List
            dataArray={this.props.projects} renderRow={data =>
              <ListItem button noBorder onPress={() => {this.props.closeDrawer();Actions.taskList();}} >
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

const mapStateToProps = ({ taskData }) => {
  const { projects } = taskData;
  return { projects };
};

export default connect(mapStateToProps, {closeDrawer})(SideBar);
