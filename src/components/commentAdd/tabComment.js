
import React, { Component } from 'react';
import { Title, View, Container, Content,Input, Text, Footer, FooterTab, Button, Icon, Item, Label, CheckBox } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import I18n from '../../translations/';
import {addComment} from '../../redux/actions';

class TabComment extends Component { // eslint-disable-line
    constructor(props) {
      super(props);
      this.state = {
        message:'',
        messageHeight:50,
        internal:false,
      };
    }

    submitForm(){
      this.props.addComment({createdBy:this.props.userData,createdAt:(new Date()).getTime(),title:null,body:this.state.message,internal:this.state.internal,email_to:null});
      Actions.pop();
    }

    render() {
      return (
        <Container>
          <Content style={{ padding: 15 }}>

          {
            (this.props.ACL.view_internal_note||this.props.userACL.update_all_tasks) &&
            <Item inlineLabel style={{marginBottom:20, borderWidth:0,marginTop:10,paddingBottom:5}}>
              <CheckBox checked={this.state.internal} color='#3F51B5' onPress={()=>this.setState({internal:!this.state.internal})}/>
              <Label style={{marginLeft:15}}>{I18n.t('internal')}</Label>
            </Item>

          }

            <Text note>{I18n.t('commentAddBody')}</Text>
            <View style={{ borderColor: '#CCCCCC', borderWidth: 0.5, marginBottom: 15}}>
              <Input
                style={{height:Math.max(35, this.state.messageHeight)}}
                multiline={true}
                onContentSizeChange={(event) => this.setState({ messageHeight: event.nativeEvent.contentSize.height })}
                onChange={ event => this.setState({message:event.nativeEvent.text}) }
                placeholder={I18n.t('commentAddMessagePlaceholder')}
                value={this.state.message}
              />
            </View>
          </Content>
          <Footer>
            <FooterTab>
              <Button iconLeft style={{ flexDirection: 'row', borderColor: 'white', borderWidth: 0.5 }} onPress={Actions.pop}>
                <Icon active style={{ color: 'white' }} name="trash" />
                <Text style={{ color: 'white' }} >{I18n.t('cancel')}</Text>
              </Button>
            </FooterTab>
            <FooterTab>
              <Button iconLeft style={{ flexDirection: 'row', borderColor: 'white', borderWidth: 0.5 }} onPress={this.submitForm.bind(this)}>
                <Icon active style={{ color: 'white' }} name="add" />
                <Text style={{ color: 'white' }} >{I18n.t('add')}</Text>
              </Button>
            </FooterTab>
          </Footer>
        </Container>
      );
    }
  }
  const mapStateToProps = ({ login,taskData }) => {
    const {userData} = login;
    const {task} = taskData;
    return {userData,ACL:task.ACL,userACL:login.ACL};
  };
  export default connect(mapStateToProps,{addComment})(TabComment);
