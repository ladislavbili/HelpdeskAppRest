import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ActivityIndicator } from 'react-native';

import ItemAdd from './itemAdd';
import {getUnits, startLoadingItems} from '../../redux/actions';


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

const mapStateToProps = ({ itemR, login }) => {
  const { loadingItems } = itemR;
  const { token } = login;
  return { loadingItems, token };
};

export default connect(mapStateToProps,{getUnits, startLoadingItems})(ItemAddLoader);
