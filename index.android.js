import { AppRegistry, StatusBar } from 'react-native';
import React, {Component} from 'react';
import { Provider } from 'react-redux';
import createStore from './src/redux/store';
import Navigation from './src/navigation';

const store=createStore();

export default class HelpdeskAppRest extends Component {
  render() {
    return (
      <Provider store={store} >
        <Navigation />
      </Provider>
    );
  }
}
StatusBar.setBarStyle('default');
AppRegistry.registerComponent('HelpdeskAppRest', () => HelpdeskAppRest);
