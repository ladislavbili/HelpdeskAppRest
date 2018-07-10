import React, { Component } from 'react';
import { Provider } from 'react-redux';
import createStore from './src/redux/store';
import Navigation from './src/navigation';

const store=createStore();

export default class App extends Component<Props> {
  render() {
    return (
      <Provider store={store} >
        <Navigation />
      </Provider>
    );
  }
}
