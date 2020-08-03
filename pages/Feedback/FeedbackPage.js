import React from "react";
import Feedback from "../../components/Feedback/Feedback";
import classes from "./FeedbackPage.module.css";
import { connect } from "react-redux";
import feedbackMessage from "../../store/actions/feedback";
class FeedbackPage extends React.Component {
  state = {
    feedbackMessage: "",
  };
  render() {
    return (
      <div className={classes.FeedbackPage}>
        <Feedback
          userName={this.props.userName}
          userEmail={this.props.userEmail}
          isSend={(value) => {
            this.props.feedback("Ваш отзыв отправлен!");
          }}
        />
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    userName: state.signIn.name,
    userEmail: state.signIn.email,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    feedback: (message) => dispatch(feedbackMessage(message)),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(FeedbackPage);
