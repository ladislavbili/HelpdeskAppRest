import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Input, Picker, Item, Footer, FooterTab, Container, Header, Title, Content, Button, Icon, Text, Left, Body, View } from 'native-base';
import { Actions } from 'react-native-router-flux';
import I18n from '../../translations/';
import {addItem} from '../../redux/actions';

class ItemAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      unit:this.props.units[0].id,
      itemQuantity:'0',
      itemName:'',
      itemPrice:'0',
    };
    this.setPrice.bind(this);
    this.setQuantity.bind(this);
  }

  submit(){
    let title = this.state.itemName;
    let amount = parseInt(this.state.itemQuantity);
    let unit ={id:this.state.unit};
    let price = parseInt(this.state.itemPrice);
    this.props.addItem({title,amount,unit,price});
    Actions.pop();
  }

  setPrice(input){
    if(!/^\d*$/.test(input)){
      return;
    }
    if(input.length==2 && input[0]=='0'){
      this.setState({itemPrice:input[1]});
    }
    else{
      this.setState({itemPrice:input});
    }
  }

  setQuantity(input){
    if(!/^\d*$/.test(input)){
      return;
    }
    if(input.length==2 && input[0]=='0'){
      this.setState({itemQuantity:input[1]});
    }
    else{
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
            <Title>{I18n.t('taskEditAddItem')}</Title>
          </Body>
        </Header>
        <Content style={{ padding: 15 }}>
          <Text note>{I18n.t('title')}</Text>
          <View style={{ borderColor: '#CCCCCC', borderWidth: 0.5, marginBottom: 15 }}>
            <Input
              value={this.state.itemName}
              onChangeText={ value => this.setState({itemName:value}) }
            />
          </View>
          <Text note>{I18n.t('taskEditPricePerUnit')}</Text>
          <View style={{ borderColor: '#CCCCCC', borderWidth: 0.5, marginBottom: 15 }}>
            <Input
              value={this.state.itemPrice}
              keyboardType='numeric'
              onChangeText={ value => this.setPrice(value) }
            />
          </View>
          <Text note>{I18n.t('taskEditUnit')}</Text>
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
          <Text note>{I18n.t('taskEditQuantity')}</Text>
          <View style={{ borderColor: '#CCCCCC', borderWidth: 0.5, marginBottom: 15 }}>
            <Input
              value={this.state.itemQuantity}
              keyboardType='numeric'
              onChangeText={ value => this.setQuantity(value) }
            />
          </View>

        </Content>
        <Footer>
          <FooterTab>
            <Button onPress={Actions.pop} iconLeft style={{ flexDirection: 'row', borderColor: 'white', borderWidth: 0.5 }}>
              <Icon active style={{ color: 'white' }} name="trash" />
              <Text style={{ color: 'white' }} >{I18n.t('delete')}</Text>
            </Button>
          </FooterTab>
          <FooterTab>
            <Button onPress={this.submit.bind(this)} iconLeft style={{ flexDirection: 'row', borderColor: 'white', borderWidth: 0.5 }}>
              <Icon active style={{ color: 'white' }} name="add" />
              <Text style={{ color: 'white' }} >{I18n.t('save')}</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}
const mapStateToProps = ({ taskData }) => {
  const { units } = taskData;
  return { units };
};

export default connect(mapStateToProps,{addItem})(ItemAdd);
