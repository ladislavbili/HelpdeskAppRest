import React, { Component } from "react";
import { ListItem, Text, Thumbnail, Left, Body, CheckBox, Item, View} from "native-base";


class ModalUser extends Component {
  constructor(props) {
    super(props);
    this.state={selected:this.props.selected}
 }

  render() {
    return (
      <ListItem thumbnail onPress={()=>{this.props.setData(this.state.selected,this.props.item);this.setState({selected:!this.state.selected});}}>
        <Left>
            <CheckBox checked={this.state.selected}  onPress={()=>{this.props.setData(this.state.selected,this.props.item);this.setState({selected:!this.state.selected});}} />
        </Left>
        <Body>
        {
          (this.props.item.detailData.name||this.props.item.detailData.surname)?<Text>{this.props.item.detailData.name?this.props.item.detailData.name+' ':''}{this.props.item.detailData.surname?this.props.item.detailData.surname:''}</Text>:null
        }
        <Text note>{this.props.item.email}</Text>
        </Body>
      </ListItem>
    );
  }
}

export default ModalUser;
