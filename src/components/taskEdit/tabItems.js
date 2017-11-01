import React, { Component } from 'react';
import { Right, Left, Container, Content, Card, CardItem, Text, Footer, FooterTab, Button, Icon } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { ActivityIndicator, Alert } from 'react-native';
import { connect } from 'react-redux';


import I18n from '../../translations/';
import {startLoadingItems, getItemsAndUnits, openAddingOfItem, deleteItem, openEditingOfItem} from '../../redux/actions';

class TabItems extends Component{
  componentDidMount(){
    this.props.startLoadingItems();
    this.props.getItemsAndUnits(this.props.id, this.props.token);
  }

  deleteInvoiceItem(id,title){
    Alert.alert(
      I18n.t('deletingItem'),
      I18n.t('deletingItemMessage')+title,
      [
        {text: I18n.t('cancel'), style: 'cancel'},
        {text: I18n.t('ok'), onPress: () =>{
          this.props.deleteItem(id,this.props.id,this.props.token);
        }},
      ],
      { cancelable: false }
    )
  }

  render() {
    if(this.props.loadingItems){
      return (<ActivityIndicator animating size={ 'large' } color='#007299' />);
    }
    let total=0;
    this.props.items.map((item)=>total+=item.amount*item.unit_price);
    return (
      <Container>
        <Content padder style={{ marginTop: 0 }}>
        {
          this.props.items.map((item)=>
            <Card key={item.id}>
              <CardItem>
                <Left>
                  <Text note>{I18n.t('title')}</Text>
                </Left>
                <Right>
                  <Text>{item.title}</Text>
                </Right>
              </CardItem>
              <CardItem>
                <Left>
                  <Text note>{I18n.t('pricePerUnit')}</Text>
                </Left>
                <Right>
                  <Text>{(item.unit_price).toString()}</Text>
                </Right>
              </CardItem>
              <CardItem>
                <Left>
                  <Text note>{I18n.t('unit')}</Text>
                </Left>
                <Right>
                  <Text>{item.unit?this.props.units[this.props.units.findIndex((unit)=>unit.id==item.unit.id)].shortcut:'Missing unit'}</Text>
                </Right>
              </CardItem>
              <CardItem>
                <Left>
                  <Text note>{I18n.t('quantity')}</Text>
                </Left>
                <Right>
                  <Text>{(item.amount).toString()}</Text>
                </Right>
              </CardItem>
              <CardItem>
                <Left>
                  <Text note>{I18n.t('totalPrice')}</Text>
                </Left>
                <Right>
                  <Text>{(item.amount*item.unit_price).toString()}</Text>
                </Right>
              </CardItem>
            {
              (this.props.ACL.includes('resolve_task') || this.props.ACL.includes('update_all_tasks')) &&
              <CardItem>
                <Left>
                  <Button active block onPress={()=>this.deleteInvoiceItem(item.id,item.title)}>
                  <Icon name="trash" />
                  <Text>{I18n.t('delete')}</Text>
                  </Button>
                </Left>
                <Right>
                  <Button active block onPress={()=>{Actions.itemEdit({data:item,taskId:this.props.task.id});}}>
                  <Icon name="open" />
                  <Text>{I18n.t('edit')}</Text>
                  </Button>
                </Right>
              </CardItem>
              }
            </Card>
          )
        }

          <Card>
            <CardItem>
            <Left>
              <Text note>{I18n.t('totalPrice')}</Text>
            </Left>
            <Right>
              <Text>{total}</Text>
            </Right>
          </CardItem>
          </Card>


      </Content>
      { (this.props.ACL.includes('resolve_task') || this.props.ACL.includes('update_all_tasks')) &&
      <Footer>
        <FooterTab>
          <Button onPress={()=>Actions.itemAdd({id:this.props.id}) } iconLeft style={{ flexDirection: 'row', borderColor: 'white', borderWidth: 0.5 }}>
            <Icon active style={{ color: 'white' }} name="md-add" />
            <Text style={{ color: 'white' }}>{I18n.t('item')}</Text>
          </Button>
        </FooterTab>
      </Footer>
}
      </Container>
    );
  }
}
const mapStateToProps = ({ taskR, login, itemR }) => {
  const { items, loadingItems ,units } = itemR;
  const { task } = taskR;
  const { token } = login;
  return { items, loadingItems,token, units, task, ACL:task.loggedUserProjectAcl.concat(task.loggedUserRoleAcl) };
};



export default connect(mapStateToProps,{startLoadingItems,getItemsAndUnits,openAddingOfItem, deleteItem, openEditingOfItem})(TabItems);
