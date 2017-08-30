
import React, { Component } from 'react';
import { Tab, Tabs, Container} from 'native-base';
import { connect } from 'react-redux';
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
            {ACL.sent_emails_from_comments && <Tab heading="+ Email">
                <TabEmail id={this.props.id} />
            </Tab>}
        </Tabs>
      </Container>
    );
  }
}

const mapStateToProps = ({ login }) => {
  return {ACL} = login;
};
export default connect(mapStateToProps,{})(CommentAdd);
