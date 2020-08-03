import React, { Component } from "react";
import "./App.css";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import MainPage from "./pages/MainPage/MainPage";
import { Home } from "./pages/Home/Home";
import Layout from "./hoc/Layout/Layout";
import SignIn from "./pages/SignIn/SignIn";
import Registration from "./pages/Registration/Registration";
import MainLayout from "./hoc/MainLayout/MainLayout";
import { connect } from "react-redux";
import Logout from "./components/Logout/Logout";
import { autoLogin } from "./store/actions/signIn";
import Alert from "./Alert/Alert";
import FeedbackPage from "./pages/Feedback/FeedbackPage";

class App extends Component {
  componentDidMount() {
    this.props.autoLogin();
  }

  render() {
    let routes = (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/signin" component={SignIn} />
        <Route exact path="/registration" component={Registration} />
        <Redirect to="/" />
      </Switch>
    );
    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route exact path="/main" component={MainPage} />
          <Route exact path="/logout" component={Logout} />
          <Route exact path="/feedback" component={FeedbackPage} />
          <Route exact path="/" component={Home} />]
          <Redirect to="/main" />
        </Switch>
      );
    }

    return (
      <MainLayout>
        
        {(this.props.errorMessage ||
          this.props.message ||
          this.props.feedback) && (
          <Alert
            text={
              this.props.errorMessage ||
              this.props.message ||
              this.props.feedback
            }
          />
        )}

        <Layout>{routes}</Layout>
      </MainLayout>
    );
  }
}
function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.signIn.token,
    errorMessage: state.signIn.errorMessage,
    message: state.registration.errorMessage,
    feedback: state.feedback.feedbackMessage,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    autoLogin: () => dispatch(autoLogin()),
  };
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
