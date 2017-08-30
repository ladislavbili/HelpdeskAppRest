
import React, { Component } from 'react';
import { Tab, Tabs, Container} from 'native-base';

import styles from './styles';
import TabComment from './tabComment';
import TabEmail from './tabEmail';
import I18n from '../../translations/';

class CommentAdd extends Component {

  render() {
    return (
      <Container style={styles.container}>
        <Tabs>
            <Tab heading={I18n.t('commentAddtabComment')}>
                <TabComment id={this.props.id} />
            </Tab>
            <Tab heading="+ Email">
                <TabEmail id={this.props.id} />
            </Tab>
        </Tabs>
      </Container>
    );
  }
}

export default CommentAdd;
