import React, { Component } from "react";
import { ListItem, Text, Thumbnail, Left, Body, CheckBox, Item, View} from "native-base";


class Label extends Component {
  constructor(props) {
    super(props);
    this.state={selected:this.props.selected}
 }

  render() {
    return (
      <ListItem thumbnail onPress={()=>{this.props.setLabel(this.state.selected,this.props.item);this.setState({selected:!this.state.selected});}}>
        <Left>
            <CheckBox checked={this.state.selected}  onPress={()=>{this.props.setLabel(this.state.selected,this.props.item);this.setState({selected:!this.state.selected});}} />
        </Left>
        <Body>
          <View style={{backgroundColor:((this.props.item.color.includes('#')?'':'#')+this.props.item.color),paddingLeft:10}}>
            <Text style={{color:'white'}}>{this.props.item.title}</Text>
          </View>
        </Body>
      </ListItem>
    );
  }
}

export default Label;
