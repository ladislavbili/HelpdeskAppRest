import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleProvider, Drawer } from 'native-base';
import { Router, Scene } from 'react-native-router-flux';

import { closeDrawer } from './redux/actions';
import material from '../native-base-theme/variables/material';
import getTheme from '../native-base-theme/components';

import Login from './components/login';
import TaskList from './components/taskList';
import TaskEdit from './components/taskEdit';
import TaskAdd from './components/taskAdd';
import CommentAdd from './components/commentAdd';

const RouterWithRedux = connect()(Router);

class AppNavigator extends Component {

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

  render() {
    return (
      <StyleProvider style={getTheme((this.props.themeState === 'material') ? material : undefined)}>
        <Drawer
          ref={(ref) => { this._drawer = ref; }}
          content={<Login navigator={this._navigator} />}
          onClose={() => this.closeDrawer()}
        >
          <RouterWithRedux>
            <Scene key="root" hideNavBar>
              <Scene key="login" component={Login} initial={true} />
              <Scene key="taskList" component={TaskList} />
              <Scene key="taskEdit" component={TaskEdit} />
              <Scene key="taskAdd" component={TaskAdd} />
              <Scene key="commentAdd" component={CommentAdd} />
            </Scene>
          </RouterWithRedux>
        </Drawer>
      </StyleProvider>
    );
  }
}

const mapStateToProps = ({ drawer, navigation }) => {
  return { drawerState: drawer.drawerState, themeState:drawer.themeState, navigation };
};


export default connect(mapStateToProps, {closeDrawer})(AppNavigator);
