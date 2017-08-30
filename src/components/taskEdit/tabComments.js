import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Input, Label, Button, Icon, Item, Footer, FooterTab,View, Thumbnail, Container, Content, Card, CardItem, Text, ListItem, List,  Left, Body, Right } from 'native-base';
import { Actions } from 'react-native-router-flux';
import {ActivityIndicator} from 'react-native';
import styles from './styles';
import I18n from '../../translations/';
import {startLoadingComments, getComments} from '../../redux/actions';
import {formatDate} from '../../helperFunctions';

class TabComments extends Component {
  componentDidMount(){
    this.props.startLoadingComments();
    this.props.getComments();
  }
  render() {
    if(this.props.loadingComments){
      return (
        <ActivityIndicator
        animating size={ 'large' }
        color='#007299' />
      )
    }
    return (
      <Container>
        <Content padder style={{ marginTop: 0 }}>
          <List
          dataArray={this.props.comments}
          renderRow={data =>
            <ListItem avatar key={data.id}>
                   <Body>
                     <Text note>{data.createdBy?(data.createdBy.name||data.createdBy.surname?((data.createdBy.name?(data.createdBy.name+' '):'')+(data.createdBy.surname?data.createdBy.surname:'')):data.createdBy.username):I18n.t('nobody')}</Text>
                     {data.email_to &&
                       <Text>Mailed to:</Text>
                     }
                     {data.email_to &&
                       <List
                        dataArray={data.email_to}
                        renderRow={mail=>
                            <Text note>{mail}</Text>
                        }
                       />
                      }
                     <Text>Title: <Text style={{color:'#007299'}}> {data.title?data.title:''}</Text></Text>
                     <Text>Message: {data.body}</Text>
                   </Body>
                   <Right>
                     <Text note>{formatDate(data.createdAt)}</Text>
                     {data.internal?<Text style={{color:'red'}}>Internal</Text>:null}
                   </Right>
               </ListItem>
          }
          />
      </Content>

      <Footer>
        <FooterTab>
          <Button onPress={()=>{Actions.commentAdd({id:this.props.id})}} iconLeft style={{ flexDirection: 'row', borderColor: 'white', borderWidth: 0.5 }}>
            <Icon active style={{ color: 'white' }} name="md-add" />
            <Text style={{ color: 'white' }} >{I18n.t('taskEditComment')}</Text>
          </Button>
        </FooterTab>
      </Footer>

    </Container>

    );
  }
}
const mapStateToProps = ({ taskData, login }) => {
  const { comments, loadingComments } = taskData;
  const {ACL} = login;
  return { comments,loadingComments, ACL};
};

export default connect(mapStateToProps,{startLoadingComments,getComments})(TabComments);
