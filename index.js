import { AppRegistry } from 'react-native';
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import createStore from './src/redux/store';
import Login from './src/components/login';

const store=createStore();

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
