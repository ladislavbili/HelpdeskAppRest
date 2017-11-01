import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Input, Picker, Item, Footer, FooterTab, Container, Header, Title, Content, Button, Icon, Text, Left, Body, View, Right } from 'native-base';
import { Actions } from 'react-native-router-flux';
import I18n from '../../translations/';
import {saveItemEdit} from '../../redux/actions';

class ItemEdit extends Component {
  constructor(props){
    super(props);
    this.state = {
      unit:this.props.data.unit.id,
      itemQuantity:this.props.data.amount.toString(),
      title:this.props.data.title,
      itemPrice:this.props.data.unit_price.toString(),
    };
    this.setPrice.bind(this);
    this.setQuantity.bind(this);
  }

  submit(){
    let title = this.state.title;
    let amount = parseFloat('0'+this.state.itemQuantity);
    let unit_price = parseFloat('0'+this.state.itemPrice);
    this.props.saveItemEdit({title,amount,unit_price},this.props.data.id,this.state.unit,this.props.taskId,this.props.token);
    Actions.pop();
  }

  setPrice(input){
    var valid = (input.match(/^-?\d*(\.\d*)?$/));
    if(valid){
      this.setState({itemPrice:input});
    }
  }

  setQuantity(input){
    var valid = (input.match(/^-?\d*(\.\d*)?$/));
    if(valid){
      this.setState({itemQuantity:input});
    }
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
            <Title>{I18n.t('editItem')}</Title>
          </Body>
          <Right>
          {
            this.state.title.length!=0 &&
            <Button transparent onPress={this.submit.bind(this)}>
            <Icon active style={{ color: 'white', padding:10 }} name="ios-checkmark-circle-outline" />
            </Button>
          }
          </Right>
        </Header>
        <Content style={{ padding: 15 }}>
          <Text note>{I18n.t('title')}</Text>
          <View style={{ borderColor: '#CCCCCC', borderWidth: 0.5, marginBottom: 15 }}>
            <Input
              value={this.state.title}
              placeholder={I18n.t('enterTitle')}
              onChangeText={ value => this.setState({title:value}) }
            />
            {
              this.state.title.length==0 && <Text note style={{color:'red'}}>{I18n.t('itemNameError')}</Text>
            }
          </View>
          <Text note>{I18n.t('pricePerUnit')}</Text>
          <View style={{ borderColor: '#CCCCCC', borderWidth: 0.5, marginBottom: 15 }}>
            <Input
              value={this.state.itemPrice}
              placeholder={I18n.t('enterPricePerUnit')}
              keyboardType='numeric'
              onChangeText={ value => this.setPrice(value) }
            />
          </View>
          <Text note>{I18n.t('unitSelect')}</Text>
          <View style={{ borderColor: '#CCCCCC', borderWidth: 0.5, marginBottom: 15 }}>
            <Picker
              supportedOrientations={['portrait', 'landscape']}
              selectedValue={this.state.unit}
              onValueChange={(value)=>this.setState({unit:value})}>
              {this.props.units.map(
                (unit)=> <Item label={unit.shortcut+' ('+unit.title+')'} key={unit.id} value={unit.id} />
              )}
            </Picker>
          </View>
          <Text note>{I18n.t('quantity')}</Text>
          <View style={{ borderColor: '#CCCCCC', borderWidth: 0.5, marginBottom: 15 }}>
            <Input
              value={this.state.itemQuantity}
              placeholder={I18n.t('enterQuantity')}
              keyboardType='numeric'
              onChangeText={ value => this.setQuantity(value) }
            />
          </View>
        </Content>
      </Container>
    );
  }
}
const mapStateToProps = ({ itemR, login }) => {
  const { units, item } = itemR;
  const { token } = login;
  return { units, item, token };
};

export default connect(mapStateToProps,{saveItemEdit})(ItemEdit);
