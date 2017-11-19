import React, { Component } from 'react';
import { Input, Item, Container, Header, Title, Content, Button, Icon, Text, Left, Right, Body, View, Label, CheckBox } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import I18n from '../../translations/';
import {addCompany} from '../../redux/actions';
import {processInteger} from '../../helperFunctions';

/**
* Allows user to add a new company
* @extends Component
*/
class CompanyAdd extends Component {

  constructor(props) {
    super(props);
    this.state = {
      title:'',
      ico:'',
      dic:'',
      ic_dph:'',
      street:'',
      city:'',
      zip:'',
      country:''
    };
  }

  /**
   * Gathers all of the data from the current state and sends them via actions to the redux. Then it returns user back to previous component
   */
  submit(){
    let company={
      title:this.state.title,
      ico:this.state.ico,
      dic:this.state.dic,
      ic_dph:this.state.ic_dph,
      street:this.state.street,
      city:this.state.city,
      zip:this.state.zip,
      country:this.state.country
    };
    this.props.addCompany(company,this.props.token);
    Actions.pop();
  }

  /**
   * Checks, if the input string is an acceptable number
   * @param  {string} value String that should be convertable into string
   * @return {boolean}       If the string contains only numbers
   */
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
            <Title>{I18n.t('addCompany')}</Title>
          </Body>
          <Right>
            {this.state.title.length!=0 &&
              <Button transparent onPress={this.submit.bind(this)}>
                <Icon active style={{ color: 'white', padding:10 }} name="ios-checkmark-circle-outline" />
              </Button>
            }
          </Right>
        </Header>
        <Content style={{ padding: 15 }}>

          <Text note>{I18n.t('companyName')}</Text>
          <View style={{ borderColor: '#CCCCCC', borderWidth: 0.5, marginBottom: 15 }}>
            <Input
              placeholder={I18n.t('enterCompanyName')}
              value={this.state.title}
              onChangeText={(value)=>this.setState({title:value})}
              />
            {
              this.state.title.length==0 && <Text note style={{color:'red'}}>You must set name of the company</Text>
          }
        </View>

        <Text note>{I18n.t('street')}</Text>
        <View style={{ borderColor: '#CCCCCC', borderWidth: 0.5, marginBottom: 15 }}>
          <Input
            placeholder={I18n.t('enterStreet')}
            value={this.state.street}
            onChangeText={(value)=>this.setState({street:value})}
            />
        </View>

        <Text note>{I18n.t('city')}</Text>
        <View style={{ borderColor: '#CCCCCC', borderWidth: 0.5, marginBottom: 15 }}>
          <Input
            placeholder={I18n.t('enterCity')}
            value={this.state.city}
            onChangeText={(value)=>this.setState({city:value})}
            />
        </View>

        <Text note>{I18n.t('country')}</Text>
        <View style={{ borderColor: '#CCCCCC', borderWidth: 0.5, marginBottom: 15 }}>
          <Input
            placeholder={I18n.t('enterCountry')}
            value={this.state.country}
            onChangeText={(value)=>this.setState({country:value})}
            />
        </View>

        <Text note>{I18n.t('ico')}</Text>
        <View style={{ borderColor: '#CCCCCC', borderWidth: 0.5, marginBottom: 15 }}>
          <Input
            keyboardType='numeric'
            placeholder={I18n.t('enterIco')}
            value={this.state.ico}
            onChangeText={ value => {let result = this.checkIfNumber(value); this.setState({ico:(result?value:this.state.ico)})} }
            />
        </View>

        <Text note>{I18n.t('icDph')}</Text>
        <View style={{ borderColor: '#CCCCCC', borderWidth: 0.5, marginBottom: 15 }}>
          <Input
            keyboardType='numeric'
            placeholder={I18n.t('enterIcDph')}
            value={this.state.ic_dph}
            onChangeText={ value => {let result = this.checkIfNumber(value); this.setState({ic_dph:(result?value:this.state.ic_dph)})}}
            />
        </View>

        <Text note>{I18n.t('dic')}</Text>
        <View style={{ borderColor: '#CCCCCC', borderWidth: 0.5, marginBottom: 15 }}>
          <Input
            placeholder={I18n.t('enterDic')}
            value={this.state.dic}
            onChangeText={(value)=>this.setState({dic:value})}
            />
        </View>

        <Text note>{I18n.t('zipCode')}</Text>
        <View style={{ borderColor: '#CCCCCC', borderWidth: 0.5, marginBottom: 15 }}>
          <Input
            placeholder={I18n.t('enterZipCode')}
            keyboardType='numeric'
            value={this.state.zip}
            onChangeText={ value => {let result = this.checkIfNumber(value); this.setState({zip:(result?value:this.state.zip)})}}
            />
        </View>

      </Content>
    </Container>
  );
}
}

//creates function that maps actions (functions) to the redux store
const mapStateToProps = ({login}) => {
  return {token} = login;
};

//exports created Component connected to the redux store and redux actions
export default connect(mapStateToProps, {addCompany})(CompanyAdd);
