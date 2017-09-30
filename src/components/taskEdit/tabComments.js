import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Button, Icon, Footer, FooterTab,View, Container, Content, Text, ListItem, List,  Left, Right } from 'native-base';
import { Actions } from 'react-native-router-flux';
import {ActivityIndicator} from 'react-native';
import I18n from '../../translations/';
import {startLoadingComments, getComments} from '../../redux/actions';
import {formatDate} from '../../helperFunctions';

class TabComments extends Component {
  componentDidMount(){
    this.props.startLoadingComments();
    this.props.getComments(this.props.id, this.props.token);
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
            (!data.internal || this.props.ACL.includes('view_internal_note')||this.props.ACL.includes('update_all_tasks'))?
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
          <Button onPress={()=>{Actions.commentAdd({id:this.props.id,ACL:this.props.ACL})}} iconLeft style={{ flexDirection: 'row', borderColor: 'white', borderWidth: 0.5 }}>
            <Icon active style={{ color: 'white' }} name="md-add" />
            <Text style={{ color: 'white' }} >{I18n.t('taskEditComment')}</Text>
          </Button>
        </FooterTab>
      </Footer>

    </Container>

    );
  }
}
const mapStateToProps = ({ taskR, login, commentR }) => {
  const { comments, loadingComments } = commentR;
  const { token } = login;
  return { comments, token, loadingComments,ACL:taskR.task.loggedUserProjectAcl.concat(taskR.task.loggedUserRoleAcl)};
};

export default connect(mapStateToProps,{startLoadingComments,getComments})(TabComments);
