import { AppRegistry } from 'react-native';
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import createStore from './src/redux/store';
import Login from './src/components/login';
import './src/translations';
import i18n from 'i18next';

const store=createStore();
t=i18n.t;
class App extends Component<Props> {
  render() {
    return (
      <Provider store={store} >
        <Login />
      </Provider>
    );
  }
}


AppRegistry.registerComponent('HelpdeskAppRest', () => App);
