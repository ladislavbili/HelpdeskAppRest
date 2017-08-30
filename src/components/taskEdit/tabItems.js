import React, { Component } from 'react';
import { Right, Left, Container, Content, Card, CardItem, Text, Body, Footer, FooterTab, Button, Icon } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { ActivityIndicator, Alert } from 'react-native';
import { connect } from 'react-redux';

import styles from './styles';
import I18n from '../../translations/';
import {startLoadingItems, getItemsAndUnits, openAddingOfItem, deleteItem, openEditingOfItem} from '../../redux/actions';

class TabItems extends Component{
  componentDidMount(){
    this.props.startLoadingItems();
    this.props.getItemsAndUnits();
  }

  deleteInvoiceItem(id,title){
    Alert.alert(
      I18n.t('taskEditdeletingItem'),
      I18n.t('taskEditdeletingItemMessage')+title,
      [
        {text: I18n.t('cancel'), style: 'cancel'},
        {text: I18n.t('ok'), onPress: () =>{
          this.props.deleteItem(id);
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
    this.props.items.map((item)=>total+=item.amount*item.price);
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
                  <Text note>{I18n.t('taskEditPricePerUnit')}</Text>
                </Left>
                <Right>
                  <Text>{(item.price).toString()}</Text>
                </Right>
              </CardItem>
              <CardItem>
                <Left>
                  <Text note>{I18n.t('taskEditUnit')}</Text>
                </Left>
                <Right>
                  <Text>{item.unit?this.props.units[this.props.units.findIndex((unit)=>unit.id==item.unit.id)].shortcut:'None'}</Text>
                </Right>
              </CardItem>
              <CardItem>
                <Left>
                  <Text note>{I18n.t('taskEditQuantity')}</Text>
                </Left>
                <Right>
                  <Text>{(item.amount).toString()}</Text>
                </Right>
              </CardItem>
              <CardItem>
                <Left>
                  <Text note>{I18n.t('taskEditPriceTotal')}</Text>
                </Left>
                <Right>
                  <Text>{(item.amount*item.price).toString()}</Text>
                </Right>
              </CardItem>
            { (this.props.ACL.resolve_task || this.props.userACL.update_all_tasks) &&
              <CardItem>
                <Left>
                  <Button active block onPress={()=>this.deleteInvoiceItem(item.id,item.title)}>
                  <Icon name="trash" />
                  <Text>{I18n.t('delete')}</Text>
                  </Button>
                </Left>
                <Right>
                  <Button active block onPress={()=>this.props.openEditingOfItem(item.id,this.props.id)}>
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
              <Text note>{I18n.t('taskEditTotalPrice')}</Text>
            </Left>
            <Right>
              <Text>{total}</Text>
            </Right>
          </CardItem>
          </Card>


      </Content>
      { (this.props.ACL.resolve_task || this.props.userACL.update_all_tasks) &&
      <Footer>
        <FooterTab>
          <Button onPress={()=>this.props.openAddingOfItem(this.props.id)} iconLeft style={{ flexDirection: 'row', borderColor: 'white', borderWidth: 0.5 }}>
            <Icon active style={{ color: 'white' }} name="md-add" />
            <Text style={{ color: 'white' }}>{I18n.t('taskEditItem')}</Text>
          </Button>
        </FooterTab>
      </Footer>
}
      </Container>
    );
  }
}
const mapStateToProps = ({ taskData, login }) => {
  const {task,items, loadingItems,units } = taskData;
  return { items,loadingItems, units, ACL:task.ACL,userACL:login.ACL};
};

export default connect(mapStateToProps,{startLoadingItems,getItemsAndUnits,openAddingOfItem, deleteItem, openEditingOfItem})(TabItems);
