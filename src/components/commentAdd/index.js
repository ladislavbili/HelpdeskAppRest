
import React, { Component } from 'react';
import { Tab, Tabs, Container} from 'native-base';
import { connect } from 'react-redux';
import TabComment from './tabComment';
import TabEmail from './tabEmail';
import I18n from '../../translations/';

class CommentAdd extends Component {

  render() {
    return (
      <Container>
        <Tabs>
            <Tab heading={I18n.t('commentAddtabComment')}>
                <TabComment id={this.props.id} ACL={this.props.ACL} />
            </Tab>
            {
              this.props.ACL.includes('sent_emails_from_comments') &&
              <Tab heading="+ Email">
                  <TabEmail id={this.props.id} ACL={this.props.ACL} />
              </Tab>
          }
        </Tabs>
      </Container>
    );
  }
}

const mapStateToProps = () => {
  return {};
};
export default connect(mapStateToProps,{})(CommentAdd);
