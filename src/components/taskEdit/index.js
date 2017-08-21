
import React, { Component } from 'react';
import { Tab, Tabs, Container, Header, Title, Button, Icon, Left, Right, Body} from 'native-base';
import { Actions } from 'react-native-router-flux';
import TabAtributes from './tabAtributes';
import styles from './styles';


class TaskEdit extends Component {

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
            <Title>Task Edit</Title>
          </Body>
          <Right />
        </Header>
           <Tabs>
               <Tab heading="Attributes">
                   <TabAtributes data={this.props.data} />
               </Tab>
           </Tabs>
      </Container>
    );
  }
}

export default TaskEdit;
