import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Title ,Header, Body, Content, Text, List, ListItem, Icon, Container, Left, Right, Badge } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { ActivityIndicator } from 'react-native';

import { closeDrawer } from '../../redux/actions';
import styles from './style';
import I18n from '../../translations/';

/**
 * Displays user a list of all projects and filters
 * @extends Component
 */
class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showProjects:true,
      showFilters:true,
      showArchived:false,
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
          <ListItem button noBorder onPress={() => this.setState({showFilters:!this.state.showFilters})} >
            <Text>{I18n.t('filters')}</Text>
          </ListItem>
          {
            this.state.showFilters &&
            <List
              dataArray={this.props.sidebar.filters} renderRow={data =>
                <ListItem button noBorder onPress={() => {this.props.closeDrawer();}} >
                  <Left>
                    <Icon active name="ios-color-filter-outline" style={{ color: '#777', fontSize: 26, width: 30 }} />
                    <Text style={styles.text}>{data.title}</Text>
                  </Left>
                </ListItem>
              }
              />
          }
          <ListItem button noBorder onPress={() => this.setState({showProjects:!this.state.showProjects})} >
            <Text>{I18n.t('projects')}</Text>
          </ListItem>
          {this.state.showProjects &&
            <List
              dataArray={this.props.sidebar.projects} renderRow={data =>
                <ListItem button noBorder onPress={() => {this.props.closeDrawer();}} >
                  <Left>
                    <Icon active name="ios-folder-outline" style={{ color: '#777', fontSize: 26, width: 30 }} />
                    <Text style={styles.text}>{data.title}</Text>
                  </Left>
                  {(data.numberOfTasks) &&
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
          }
          <ListItem button noBorder onPress={() => this.setState({showArchived:!this.state.showArchived})} >
            <Text>{I18n.t('archived')}</Text>
          </ListItem>
          {this.state.showArchived &&
            <List
              dataArray={this.props.sidebar.archived} renderRow={data =>
                <ListItem button noBorder onPress={() => {this.props.closeDrawer();}} >
                  <Left>
                    <Icon active name="ios-folder-outline" style={{ color: '#777', fontSize: 26, width: 30 }} />
                    <Text style={styles.text}>{data.title}</Text>
                  </Left>
                  {(data.numberOfTasks) &&
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
          }
        </Content>
      </Container>
    );
  }
}

//creates function that maps actions (functions) to the redux store
const mapStateToProps = ({ sidebarReducer }) => {
  const { sidebar } = sidebarReducer;
  return { sidebar};
};

//exports created Component connected to the redux store and redux actions
export default connect(mapStateToProps, {closeDrawer})(SideBar);
