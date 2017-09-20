import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Input, Picker, Item, Container, Header, Title, Content, Button, Icon, Text, Left, Body } from 'native-base';
import { Actions } from 'react-native-router-flux';
import I18n from '../../translations/';
import TaskList from './taskList';
import { searchTasks } from '../../redux/actions';

class Search extends Component {

  constructor(props) {
    super(props);
    this.state = {
      filterCategory:'title',
      filterWord:'',
    }
}

  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={() => Actions.pop()}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>{I18n.t('search')}</Title>
          </Body>
        </Header>
        <Content>
          <Item rounded>
            <Icon name="ios-search" />
            <Input placeholder={I18n.t('search')} value={this.state.filterWord} onChangeText={((value)=>this.setState({filterWord:value}))} />
            <Icon name="ios-people" />
          </Item>
          <Picker
            supportedOrientations={['portrait', 'landscape']}
            iosHeader={I18n.t('selectOne')}
            mode="dropdown"
            selectedValue={this.state.filterCategory}
            onValueChange={(value)=>this.setState({filterCategory:value})}>
            <Item label={I18n.t('title')} value="title" />
            <Item label={I18n.t('assignedTo')} value="assignedUser" />
            <Item label={I18n.t('requester')} value="requester" />
            <Item label={I18n.t('company')} value="company" />
            <Item label={I18n.t('project')} value="project" />
            <Item label={I18n.t('status')} value="status" />
            <Item label={I18n.t('workHours')} value="duration" />
            <Item label={I18n.t('createdBy')} value="createdBy" />
            <Item label={I18n.t('description')} value="description" />
          </Picker>
          <Button onPress={()=>this.props.searchTasks(this.state.filterCategory,this.state.filterWord)} primary block style={{ margin: 15 }}>
            <Text>{I18n.t('search')}</Text>
          </Button>
        {
          <TaskList/>
        }
      </Content>
    </Container>
    );
  }
}

const mapStateToProps = () => {
  return {};
};

export default connect(mapStateToProps, {searchTasks})(Search);
