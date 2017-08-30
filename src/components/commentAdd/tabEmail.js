
import React, { Component } from 'react';
import { Title, Header, View, Container, Content,Input, Text, Footer, FooterTab, Button, Icon, Item, Label, List, CheckBox, Left,Right, Body } from 'native-base';
import { Actions } from 'react-native-router-flux';
import styles from './styles';
import { connect } from 'react-redux';
import I18n from '../../translations/';
import {addComment} from '../../redux/actions';

class TabEmail extends Component { // eslint-disable-line
    constructor(props) {
      super(props);
      this.state = {
        message:'',
        messageHeight:50,
        title:'',
        internal:false,
        email_to:[],
        newMail:'',
      };
    }

    submitForm(){
      this.props.addComment({createdBy:this.props.userData,createdAt:(new Date()).getTime(),title:this.state.title,
        body:this.state.message,internal:this.state.internal,email_to:(this.state.email_to.length>0?this.state.email_to:null)});
      Actions.pop();
    }

    render() {
      return (
        <Container style={styles.container}>
          <Content style={{ padding: 15 }}>

          {
            (this.props.ACL.view_internal_note||this.props.userACL.update_all_tasks) &&
            <Item inlineLabel style={{marginBottom:20, borderWidth:0,marginTop:10,paddingBottom:5}}>
              <Label>{I18n.t('internal')}</Label>
              <CheckBox checked={this.state.internal} color='#3F51B5' onPress={()=>this.setState({internal:!this.state.internal})}/>
            </Item>
          }

          <Text note>{I18n.t('commentAddEmails')}</Text>
          <View style={{ borderColor: '#CCCCCC', borderWidth: 0.5, marginBottom: 15 }}>
          <List
          dataArray={this.state.email_to}
          renderRow={data=>
            <Text style={{color:'#007299'}}>{data}</Text>}
            />
            <View style={{flex:1, flexDirection:'row'}}>
            <Body style={{flex:5,flexDirection:'row'}}>
            <Input
            keyboardType="email-address"
            style={{flex:1,flexDirection:'row'}}
            placeholder={I18n.t('commentAddEmail')}
            value={ this.state.newMail }
            onChangeText={ value => this.setState({newMail:value}) }
            />
            </Body>
            <Right style={{flex:1}}>
            <Button block  onPress={()=>this.setState({email_to:[this.state.newMail,...this.state.email_to],newMail:''})}>
            <Icon active style={{ color: 'white' }} name="add" />
            </Button>
            </Right>
            </View>
            </View>

          <Text note>{I18n.t('commentAddTitle')}</Text>
          <View style={{ borderColor: '#CCCCCC', borderWidth: 0.5, marginBottom: 15 }}>
            <Input
              placeholder={I18n.t('commentAddTitle')}
              value={ this.state.title }
              onChangeText={ value => this.setState({title:value}) }
            />
          </View>

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

  export default connect(mapStateToProps,{addComment})(TabEmail);
