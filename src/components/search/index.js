import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ActivityIndicator } from 'react-native';

import Search from './search';
import { getSearchAttributes } from '../../redux/actions';

/**
 * Loads all of the data needed for user to seach for tasks
 * @extends Component
 */
class SearchLoader extends Component {
  componentWillMount(){
    this.props.getSearchAttributes(this.props.token);
  }
  render() {
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

//creates function that maps actions (functions) to the redux store
const mapStateToProps = ({login, taskR}) => {
  const {token} = login;
  const {loadingSearch} = taskR;
  return {token, loadingSearch};
};

//exports created Component connected to the redux store and redux actions
export default connect(mapStateToProps,{getSearchAttributes})(SearchLoader);
