import React from "react";
import classes from "./MainPage.module.css";
import CurrencyConverter from "../../components/CurrencyConverter/CurrencyConverter";
import Chart from "../../components/Chart/Chart";
import Alert from "../../Alert/Alert";
import { connect } from "react-redux";

class MainPage extends React.Component {
  state = {
    alert: false,
  };
  render() {
    return (
      <>
        {this.state.alert && <Alert text="Сообщение отправлено" />}
        <h1>Здраствуйте {this.props.userName}</h1>
        <div className={classes.MainPage}>
          <Chart />
          <CurrencyConverter title="Калькулятор валют" />
        </div>
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    userName: state.signIn.name,
  };
}
export default connect(mapStateToProps, null)(MainPage);
