import React from "react";
import classes from "./Registration.module.css";
import { Input } from "../../components/UI/Input/Input";
import { Form } from "../../components/Form/Form";
import is from "is_js";
import { Button } from "../../components/UI/Button/Button";
import { NavLink } from "react-router-dom";

import { connect } from "react-redux";
import { registration } from "../../store/actions/registration";

class Registration extends React.Component {
  state = {
    name: "",
    email: "",
    pass: "",
    
    valid: false,
    //// for local state

    isPass: false,
    matchingPass: "",

    isMatchPassword: false,
    errorMessage: "",
  };

  nameHandler = (value) => {
    this.setState(() => {
      return {
        ...this.state,
        name: value,
        valid: !!(this.state.name && this.state.email && this.state.pass),
      };
    });
    console.log(this.state.valid);
  };
  validEmailHandler = (value) => {
    is.email(value)
      ? this.setState(() => {
          return {
            ...this.state,
            email: value,
            isValidEmail: true,
            valid: !!(this.state.name && this.state.email && this.state.pass),
          };
        })
      : this.setState(() => {
          return {
            ...this.state,
            email: "",
            isValidEmail: false,
            valid: !!(this.state.name && this.state.email && this.state.pass),
          };
        });
    console.log(this.state.valid);
    return is.email(value);
  };

  ///////
  validPasswordHandler = (value) => {
    value.length >= 6
      ? this.setState(() => {
          return {
            ...this.state,
            pass: value,
            isPass: true,
            valid: !!(this.state.name && this.state.email && this.state.pass),
          };
        })
      : this.setState(() => {
          return {
            ...this.state,
            isPass: false,
            isMatchPassword: false,
            errorMessage: "Пароль должен содержать больше 6 симвлов",
            valid: false,
          };
        });
    console.log(this.state.valid);
  };
  checkPasswordHandler = (value) => {
    value === this.state.pass
      ? this.setState(() => {
          return {
            ...this.state,
            matchingPass: value,
            isMatchPassword: true,
            valid: !!(this.state.name && this.state.email && this.state.pass),
          };
        })
      : this.setState(() => {
          return {
            ...this.state,
            matchingPass: value,
            isMatchPassword: false,
            valid: !!(this.state.name && this.state.email && this.state.pass),
          };
        });
  };
  isMatchPasswordCheck = () => {
    return this.state.pass === this.state.matchingPass ? true : false;
  };

  registerHandler = () => {
    this.props.registration(this.state.email, this.state.pass, this.state.name);
    this.setState(() => {
      return {
        valid: false,
      };
    });
  };

  render() {
    return (
      <Form title="Регистрация">
        <div className={classes.Registration}>
          <Input label="Имя" valid={true} onChange={this.nameHandler} />
          <Input
            label="Электронная почта"
            onChange={this.validEmailHandler}
            valid={this.state.isValidEmail}
            errorMessage="Неверный формат электронной почты"
          />
          <Input
            type="password"
            label="Придумайте пароль"
            onChange={this.validPasswordHandler}
            valid={this.state.isPass}
            errorMessage={this.state.errorMessage}
          />
          <Input
            type="password"
            label="Потвердите пароль"
            onChange={this.checkPasswordHandler}
            valid={this.state.isMatchPassword}
            errorMessage="Пароли должны совпадать"
          />
          <div className={classes.btnSection}>
            <Button
              disabled={this.state.valid && this.state.isMatchPassword}
              onClick={this.registerHandler}
              type="light"
              title="Зарегистрироваться"
            />
            <Button
              disabled={true}
              type="light"
              link={<NavLink to="/SignIn">Войти</NavLink>}
            />
          </div>
        </div>
      </Form>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    registration: (email, password, name) => {
      dispatch(registration(email, password, name));
    },
  };
}

export default connect(null, mapDispatchToProps)(Registration);
