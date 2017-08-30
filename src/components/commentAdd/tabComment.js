
import React, { Component } from 'react';
import { Title, Header, View, Container, Content,Input, Text, Footer, FooterTab, Button, Icon, Item, Label, CheckBox } from 'native-base';
import { Actions } from 'react-native-router-flux';
import styles from './styles';
import { connect } from 'react-redux';
import I18n from '../../translations/';
import {addComment} from '../../redux/actions';

class TabComment extends Component { // eslint-disable-line
    constructor(props) {
      super(props);
      this.state = {
        message:'',
        messageHeight:50,
        title:'',
        internal:false,
      };
    }

    submitForm(){
      this.props.addComment({createdBy:this.props.userData,createdAt:(new Date()).getTime(),title:this.state.title,body:this.state.message,internal:this.state.internal,email_to:null});
      Actions.pop();
    }

    render() {
      return (
        <Container style={styles.container}>
          <Content style={{ padding: 15 }}>

          <Item inlineLabel style={{marginBottom:20, borderWidth:0,marginTop:10,paddingBottom:5}}>
            <Label>{I18n.t('internal')}</Label>
            <CheckBox checked={this.state.internal} color='#3F51B5' onPress={()=>this.setState({internal:!this.state.internal})}/>
          </Item>

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
  const mapStateToProps = ({ login }) => {
    return {userData} = login;
  };
  export default connect(mapStateToProps,{addComment})(TabComment);
