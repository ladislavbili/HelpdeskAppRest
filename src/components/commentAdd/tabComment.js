
import React, { Component } from 'react';
import { Title, View, Container, Content,Input, Text, Footer, FooterTab, Button, Icon, Item, Label, CheckBox } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import I18n from '../../translations/';
import {addComment} from '../../redux/actions';

/**
 * This component allows user to comment the task
 * @extends Component
 */
class TabComment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title:'',
      message:'',
      messageHeight:50,
      internal:false,
    };
  }

/**
 * Gathers all of the data from the current state and sends them via actions to the redux. Then it returns user back to previous component
 */
  submitForm(){
    this.props.addComment({title:this.state.title,body:this.state.message,internal:this.state.internal,email:false},this.props.id,this.props.token);
    Actions.pop();
  }

  render() {
    return (
      <Container>
        <Content style={{ padding: 15 }}>

          {
            (this.props.ACL.includes('view_internal_note')||this.props.ACL.includes('update_all_tasks')) &&
            <Item inlineLabel style={{marginBottom:20, borderWidth:0,marginTop:10,paddingBottom:5}}>
              <CheckBox checked={this.state.internal} color='#3F51B5' onPress={()=>this.setState({internal:!this.state.internal})}/>
              <Label style={{marginLeft:15}}>{I18n.t('internal')}</Label>
            </Item>

          }
          <Text note>{I18n.t('emailSubject')}</Text>
          <View style={{ borderColor: '#CCCCCC', borderWidth: 0.5, marginBottom: 15}}>
            <Input
              onChange={ event => this.setState({title:event.nativeEvent.text}) }
              placeholder={I18n.t('enterEmailSubject')}
              value={this.state.title}
              />
          </View>

          <Text note>{I18n.t('emailMessage')}</Text>
          <View style={{ borderColor: '#CCCCCC', borderWidth: 0.5, marginBottom: 15}}>
            <Input
              style={{height:Math.max(35, this.state.messageHeight)}}
              multiline={true}
              onContentSizeChange={(event) => this.setState({ messageHeight: event.nativeEvent.contentSize.height })}
              onChange={ event => this.setState({message:event.nativeEvent.text}) }
              placeholder={I18n.t('enterEmailMessage')}
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
              <Text style={{ color: 'white' }} >{I18n.t('send')}</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}

//creates function that maps actions (functions) to the redux store
const mapStateToProps = ({ login }) => {
  const {userData,token} = login;
  return {userData,token};
};

//exports created Component connected to the redux store and redux actions
export default connect(mapStateToProps,{addComment})(TabComment);
