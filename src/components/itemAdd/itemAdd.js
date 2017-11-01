import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Input, Picker, Item, Footer, FooterTab, Container, Header, Title, Content, Button, Icon, Text, Left, Body, View, Right } from 'native-base';
import { Actions } from 'react-native-router-flux';
import I18n from '../../translations/';
import {addItem} from '../../redux/actions';

class ItemAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      unit:this.props.units[0].id,
      itemQuantity:'0',
      title:'',
      itemPrice:'0',
    };
    this.setPrice.bind(this);
    this.setQuantity.bind(this);
  }

  submit(){
    let title = this.state.title;
    let amount = this.state.itemQuantity.length==0 ? parseFloat(0) : parseFloat(this.state.itemQuantity);
    let unit_price = this.state.itemPrice.length==0 ? parseFloat(0) : parseFloat(this.state.itemPrice);
    this.props.addItem({title,amount,unit_price},this.props.id,this.state.unit,this.props.token);
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
            <Title>{I18n.t('addItem')}</Title>
          </Body>
          <Right>
          { this.state.title.length!=0 &&
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
              keyboardType='numeric'
              placeholder={I18n.t('enterQuantity')}
              onChangeText={ value => this.setQuantity(value) }
            />
          </View>

        </Content>
      </Container>
    );
  }
}
const mapStateToProps = ({ itemR, login }) => {
  const { units } = itemR;
  const { token } = login;
  return { token,units };
};

export default connect(mapStateToProps,{addItem})(ItemAdd);
