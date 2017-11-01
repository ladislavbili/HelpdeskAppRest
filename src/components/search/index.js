
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ActivityIndicator } from 'react-native';

import Search from './search';
import { getSearchAttributes } from '../../redux/actions';

class SearchLoader extends Component {
  componentWillMount(){
    this.props.getSearchAttributes(this.props.token);
  }
  render() {
    console.log(this.props.loadingSearch);
    if(this.props.loadingSearch){
      return (
        <ActivityIndicator
        animating size={ 'large' }
        color='#007299' />
      )
    }
    return (
      <Search/>
    );
  }
}

const mapStateToProps = ({login, taskR}) => {
  const {token} = login;
  const {loadingSearch} = taskR;
  return {token, loadingSearch};
};

export default connect(mapStateToProps,{getSearchAttributes})(SearchLoader);
