import { AppRegistry, StatusBar } from 'react-native';
import React, {Component} from 'react'
import { Provider } from 'react-redux'
import { StyleProvider } from 'native-base';
import getTheme from './native-base-theme/components';
import createStore from './src/store'
import Login from './src/components/login'

const store=createStore();

export default class HelpdeskAppRest extends Component {
  render() {
    return (
      <Provider store={store} >
        <StyleProvider style={getTheme(material)}>
          <Login />
        </StyleProvider>
      </Provider>
    );
  }
}
StatusBar.setBarStyle('default');
AppRegistry.registerComponent('HelpdeskAppRest', () => HelpdeskAppRest);
