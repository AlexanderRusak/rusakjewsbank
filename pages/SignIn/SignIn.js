import React from "react";
import classes from "./SignIn.module.css";
import { Input } from "../../components/UI/Input/Input";
import { Button } from "../../components/UI/Button/Button";
import { Form } from "../../components/Form/Form";
import is from "is_js";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import signIn from "../../store/actions/signIn";

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEmail: false,
      email: "",
      isCorrectPassword: false,
      password: "",
    };
  }
  onEmailChange = (value) => {
    this.setState(() => {
      return { isEmail: is.email(value) };
    });
    is.email(value) &&
      this.setState(() => {
        return { email: value };
      });
 
  };
  onPasswordChange = (value) => {
    value.length >= 6
      ? this.setState(() => {
          return { isCorrectPassword: true };
        })
      : this.setState(() => {
          return { isCorrectPassword: false };
        });
    value.length >= 6 &&
      this.setState(() => {
        return { password: value };
      });
  };
  signInHandler = () => {
    this.props.signIn(this.state.email, this.state.password);
  };
  render() {
    return (
      <Form title={"Вход"}>
        <div className={classes.SignIn}>
          <Input
            type="text"
            label="Email"
            valid={this.state.isEmail}
            onChange={this.onEmailChange}
          />
          <Input
            type="password"
            label="Пароль"
            
            onChange={this.onPasswordChange}
            valid={true}
          />
          <div className={classes.btnSection}>
            <Button
              title="Войти"
              onClick={this.signInHandler}
              disabled={this.state.isCorrectPassword && this.state.isEmail}
            />
            <Button
              disabled={true}
              title="Регистрация"
              link={
                <NavLink className="btn btn-light" to="registration">
                  Регистрация
                </NavLink>
              }
            />
          </div>
        </div>
      </Form>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    signIn: (email, password) => dispatch(signIn(email, password)),
  };
}

export default connect(null, mapDispatchToProps)(SignIn);
