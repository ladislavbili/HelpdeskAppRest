import React, { Component } from 'react';
import { Input, Item, Container, Header, Title, Content, Button, Icon, Text, Left, Right, Body, View, Label, CheckBox } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import I18n from '../../translations/';
import {addCompany} from '../../redux/actions';
import {processInteger} from '../../helperFunctions';


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
        phone:''
      };
    }
  submit(){
    let company=Object.assign({},this.state,{subscription_time:parseInt(this.state.subscription_time)});
    this.props.addCompany(company);
    Actions.pop();
  }

  checkIfNumber(value){
    return /^\d*$/.test(value);
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
          onChangeText={ value => {let result = processInteger(value);this.setState({subscription_time:(result?result:this.state.subscription_time)})} }
          />
          </View>

          <Text note>{I18n.t('ico')}</Text>
          <View style={{ borderColor: '#CCCCCC', borderWidth: 0.5, marginBottom: 15 }}>
          <Input
          keyboardType='numeric'
          placeholder={I18n.t('ico')}
          value={this.state.ico}
          onChangeText={ value => {let result = this.checkIfNumber(value); this.setState({ico:(result?value:this.state.ico)})} }
          />
          </View>

          <Text note>{I18n.t('ic_dph')}</Text>
          <View style={{ borderColor: '#CCCCCC', borderWidth: 0.5, marginBottom: 15 }}>
          <Input
          keyboardType='numeric'
          placeholder={I18n.t('ic_dph')}
          value={this.state.ic_dph}
          onChangeText={ value => {let result = this.checkIfNumber(value); this.setState({ic_dph:(result?value:this.state.ic_dph)})}}
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
          onChangeText={ value => {let result = this.checkIfNumber(value); this.setState({zip:(result?value:this.state.zip)})}}
          />
          </View>

          <Text note>{I18n.t('phone')}</Text>
          <View style={{ borderColor: '#CCCCCC', borderWidth: 0.5, marginBottom: 15 }}>
          <Input
          placeholder={I18n.t('phone')}
          keyboardType='numeric'
          value={this.state.phone}
          onChangeText={value => this.setState({phone:value})}
          />
          </View>

        </Content>
      </Container>
    );
  }
}

const mapStateToProps = () => {
  return {};
};

export default connect(mapStateToProps, {addCompany})(CompanyAdd);
