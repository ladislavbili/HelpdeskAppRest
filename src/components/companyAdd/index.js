import React, { Component } from 'react';
import { Input, Picker, Item, Footer, FooterTab, Container, Header, Title, Content, Button, Icon, Text, Left, Right, Body, List, ListItem, View, Label, CheckBox } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import styles from './styles';
import I18n from '../../translations/';
import {addCompany} from '../../redux/actions';

class CompanyAdd extends Component {

  constructor(props) {
      super(props);
      this.state = {
        title:'',
        subscription_time:'',
        ico:'',
        dic:'',
        ic_dph:'',
        street:'',
        city:'',
        zip:'',
        country:'',
        is_active:true,
      };
      this.setHours.bind(this);
      this.setRegistrationNumber.bind(this);
      this.setTaxNumber.bind(this);
      this.setZIP.bind(this);
    }
  submit(){
    let company=Object.assign({},this.state,{subscription_time:parseInt(this.state.subscription_time)});
    this.props.addCompany(company);
    Actions.pop();
  }

  setHours(input){
    if(!/^\d*$/.test(input)){
      return;
    }
    if(input.length==2 && input[0]=='0'){
      this.setState({subscription_time:input[1]});
    }
    else{
      this.setState({subscription_time:input});
    }
  }
  setRegistrationNumber(input){
    if(!/^\d*$/.test(input)){
      return;
    }
    this.setState({ico:input});
  }
  setTaxNumber(input){
    if(!/^\d*$/.test(input)){
      return;
    }
    this.setState({ic_dph:input});
  }
  setZIP(input){
    if(!/^\d*$/.test(input)){
      return;
    }
    this.setState({zip:input});
  }

  render() {
    return (
      <Container style={styles.container}>
        <Header>
          <Left>
            <Button transparent onPress={() => Actions.pop()}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>{I18n.t('settingsAddCompanyTitle')}</Title>
          </Body>
          <Right>
            <Button transparent onPress={this.submit.bind(this)}>
              <Icon active style={{ color: 'white', padding:10 }} name="ios-checkmark-circle-outline" />
            </Button>
          </Right>
        </Header>
        <Content style={{ padding: 15 }}>

          <Item inlineLabel style={{marginBottom:20, borderWidth:0,marginTop:10,paddingBottom:5}}>
          <CheckBox checked={this.state.is_active} color='#3F51B5' onPress={()=>this.setState({is_active:!this.state.is_active})}/>
            <Label style={{marginLeft:15}}>{I18n.t('settingsActive')}</Label>
          </Item>

          <Text note>{I18n.t('settingsCompanyName')}</Text>
          <View style={{ borderColor: '#CCCCCC', borderWidth: 0.5, marginBottom: 15 }}>
            <Input
            placeholder={I18n.t('settingsCompanyName')}
            value={this.state.title}
            onChangeText={(value)=>this.setState({title:value})}
            />
          </View>

          <Text note>{I18n.t('street')}</Text>
          <View style={{ borderColor: '#CCCCCC', borderWidth: 0.5, marginBottom: 15 }}>
          <Input
          placeholder={I18n.t('street')}
          value={this.state.street}
          onChangeText={(value)=>this.setState({street:value})}
          />
          </View>

          <Text note>{I18n.t('city')}</Text>
          <View style={{ borderColor: '#CCCCCC', borderWidth: 0.5, marginBottom: 15 }}>
          <Input
          placeholder={I18n.t('city')}
          value={this.state.city}
          onChangeText={(value)=>this.setState({city:value})}
          />
          </View>

          <Text note>{I18n.t('country')}</Text>
          <View style={{ borderColor: '#CCCCCC', borderWidth: 0.5, marginBottom: 15 }}>
          <Input
          placeholder={I18n.t('country')}
          value={this.state.country}
          onChangeText={(value)=>this.setState({country:value})}
          />
          </View>

          <Text note>{I18n.t('subscriptionTime')}</Text>
          <View style={{ borderColor: '#CCCCCC', borderWidth: 0.5, marginBottom: 15 }}>
          <Input
          placeholder={I18n.t('subscriptionTime')}
          keyboardType='numeric'
          value={this.state.subscription_time}
          onChangeText={value => this.setHours(value)}
          />
          </View>

          <Text note>{I18n.t('ico')}</Text>
          <View style={{ borderColor: '#CCCCCC', borderWidth: 0.5, marginBottom: 15 }}>
          <Input
          keyboardType='numeric'
          placeholder={I18n.t('ico')}
          value={this.state.ico}
          onChangeText={value => this.setRegistrationNumber(value)}
          />
          </View>

          <Text note>{I18n.t('ic_dph')}</Text>
          <View style={{ borderColor: '#CCCCCC', borderWidth: 0.5, marginBottom: 15 }}>
          <Input
          keyboardType='numeric'
          placeholder={I18n.t('ic_dph')}
          value={this.state.ic_dph}
          onChangeText={value => this.setTaxNumber(value)}
          />
          </View>

          <Text note>{I18n.t('dic')}</Text>
          <View style={{ borderColor: '#CCCCCC', borderWidth: 0.5, marginBottom: 15 }}>
          <Input
          placeholder={I18n.t('dic')}
          value={this.state.dic}
          onChangeText={(value)=>this.setState({dic:value})}
          />
          </View>

          <Text note>{I18n.t('zipCode')}</Text>
          <View style={{ borderColor: '#CCCCCC', borderWidth: 0.5, marginBottom: 15 }}>
          <Input
          placeholder={I18n.t('zipCode')}
          keyboardType='numeric'
          value={this.state.zip}
          onChangeText={value => this.setZIP(value)}
          />
          </View>

        </Content>
      </Container>
    );
  }
}

const mapStateToProps = ({ taskData }) => {
  return {};
};

export default connect(mapStateToProps, {addCompany})(CompanyAdd);
