import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleProvider, Drawer } from 'native-base';
import { Router, Scene } from 'react-native-router-flux';

import { closeDrawer } from './redux/actions';
import material from '../native-base-theme/variables/material';
import getTheme from '../native-base-theme/components';

import SideBar from './components/sidebar';
import Login from './components/login';
import Settings from './components/settings';
import TaskList from './components/taskList';
import TaskEdit from './components/taskEdit';
import TaskAdd from './components/taskAdd';
import CommentAdd from './components/commentAdd';
import ItemAdd from './components/itemAdd';
import ItemEdit from './components/itemEdit';
import UserList from './components/userList';
import UserAdd from './components/userAdd';
import UserEdit from './components/userEdit';
import CompanyList from './components/companyList';
import CompanyAdd from './components/companyAdd';
import CompanyEdit from './components/companyEdit';
const RouterWithRedux = connect()(Router);

class AppNavigator extends Component {

  render() {
    return (
      <StyleProvider style={getTheme((this.props.themeState === 'material') ? material : undefined)}>
        <Drawer
          ref={(ref) => { this._drawer = ref; }}
          content={<SideBar navigator={this._navigator} />}
          onClose={() => this.closeDrawer()}
        >
          <RouterWithRedux>
            <Scene key="root" hideNavBar>
              <Scene key="login" component={Login} initial={true} />
              <Scene key="settings" component={Settings} />
              <Scene key="taskList" component={TaskList} />
              <Scene key="taskEdit" component={TaskEdit} />
              <Scene key="taskAdd" component={TaskAdd} />
              <Scene key="commentAdd" component={CommentAdd} />
              <Scene key="itemAdd" component={ItemAdd} />
              <Scene key="itemEdit" component={ItemEdit} />
              <Scene key="userList" component={UserList} />
              <Scene key="userAdd" component={UserAdd} />
              <Scene key="userEdit" component={UserEdit} />
              <Scene key="companyList" component={CompanyList} />
              <Scene key="companyAdd" component={CompanyAdd} />
              <Scene key="companyEdit" component={CompanyEdit} />
            </Scene>
          </RouterWithRedux>
        </Drawer>
      </StyleProvider>
    );
  }

  componentDidUpdate() {
    if (this.props.drawerState === 'opened') {
      this.openDrawer();
    }

    if (this.props.drawerState === 'closed') {
      this._drawer._root.close();
    }
  }

  openDrawer() {
    this._drawer._root.open();
  }

  closeDrawer() {
    if (this.props.drawerState === 'opened') {
      this.props.closeDrawer();
    }
  }
}

const mapStateToProps = ({ drawer, navigation }) => {
  return { drawerState: drawer.drawerState, themeState:drawer.themeState, navigation };
};


export default connect(mapStateToProps, {closeDrawer})(AppNavigator);
