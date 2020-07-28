import React from "react";
import Feedback from "../../components/Feedback/Feedback";
import { connect } from "react-redux";

class FeedbackPage extends React.Component {
  render() {
    return (
      <div>
        <Feedback
          userName={this.props.userName}
          userEmail={this.props.userEmail}
          userFeedback={this.props.userFeedback}
          isSend={(value) => {
            this.setState(() => {
              return {
                alert: value,
              };
            });
          }}
        />
        {console.log(this.props.userEmail)}
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    userName: state.signIn.name,
    userEmail: state.signIn.email,
//userFeedback: state.singIn.feedback,
  };
}
export default connect(mapStateToProps, null)(FeedbackPage);
