import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ActivityIndicator } from 'react-native';

import ItemAdd from './itemAdd';
import {getUnits, startLoadingItems} from '../../redux/actions';

/**
* Load all of the attributes required for the user to create a new item
* @extends Component
*/
class ItemAddLoader extends Component {
  componentWillMount(){
    this.props.startLoadingItems();
    this.props.getUnits(this.props.token);
  }
  render() {
    if(this.props.loadingItems){
      return (
        <ActivityIndicator
          animating size={ 'large' }
          color='#007299' />
      )
    }

    return (
      <ItemAdd id={this.props.id}/>
    );
  }
}


//creates function that maps actions (functions) to the redux store
const mapStateToProps = ({ itemR, login }) => {
  const { loadingItems } = itemR;
  const { token } = login;
  return { loadingItems, token };
};

//exports created Component connected to the redux store and redux actions
export default connect(mapStateToProps,{getUnits, startLoadingItems})(ItemAddLoader);
