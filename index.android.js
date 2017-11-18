import { AppRegistry, StatusBar } from 'react-native';
import React, {Component} from 'react';
import { Provider } from 'react-redux';
import createStore from './src/redux/store';
import Navigation from './src/navigation';

/**
 * Creates store for the Navigation to use
 * @type {store}
 */
const store=createStore();

//Provider delivers store to the navigation that takes control over the app
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
//register the main app
AppRegistry.registerComponent('HelpdeskAppRest', () => HelpdeskAppRest);
