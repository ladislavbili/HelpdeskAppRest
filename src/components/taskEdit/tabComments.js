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
            (!data.internal || this.props.ACL.view_internal_note||this.props.userACL.update_all_tasks)?
            (<ListItem key={data.id} style={{flexDirection:'column',justifyContent:'flex-start',alignItems:'flex-start',flex:1}}>
              <View style={{flex:1,flexDirection:'row'}}>
               <Left>
                 <Text note>{data.createdBy?(data.createdBy.name?data.createdBy.name:data.createdBy.email):I18n.t('nobody')}</Text>
               </Left>
               <Right>
                 <Text note>{data.internal?<Text style={{textAlign:'right',color:'red'}}>i </Text>:null}{formatDate(data.createdAt)}</Text>
               </Right>
              </View>
            <View style={{flex:1}}>
             {data.email_to &&
               <Text>Mailed to: <Text note>{data.email_to.join(', ')}</Text></Text>
             }
              {data.title &&
                <Text style={{color:'#007299'}}> {data.title}</Text>
              }
             <Text style={{textAlign:'left'}}>{data.body}</Text>
             </View>
         </ListItem>):null
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
  const { comments, loadingComments, task } = taskData;
  return { comments,loadingComments, ACL:task.ACL,userACL:login.ACL};
};

export default connect(mapStateToProps,{startLoadingComments,getComments})(TabComments);