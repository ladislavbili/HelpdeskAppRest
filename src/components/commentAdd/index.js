
import React, { Component } from 'react';
import { Tab, Tabs, Container} from 'native-base';
import { connect } from 'react-redux';
import TabComment from './tabComment';
import TabEmail from './tabEmail';
import I18n from '../../translations/';

/**
 * Creates tabs that allows the user to send either comments or comments and e-mails
 * @extends Component
 */
class CommentAdd extends Component {

  render() {
    return (
      <Container>
        <Tabs>
          <Tab heading={'+' + I18n.t('comment')}>
            <TabComment id={this.props.id} ACL={this.props.ACL} />
          </Tab>
          {
            this.props.ACL.includes('sent_emails_from_comments') &&
            <Tab heading={"+"+ I18n.t('email')}>
              <TabEmail id={this.props.id} ACL={this.props.ACL} />
            </Tab>
          }
        </Tabs>
      </Container>
    );
  }
}

//creates function that maps actions (functions) to the redux store
const mapStateToProps = () => {
  return {};
};

//exports created Component connected to the redux store and redux actions
export default connect(mapStateToProps,{})(CommentAdd);
