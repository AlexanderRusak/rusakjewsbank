import React from "react";
import classes from "./MainPage.module.css";
import CurrencyConverter from "../../components/CurrencyConverter/CurrencyConverter";
import Chart from "../../components/Chart/Chart";
import Alert from "../../Alert/Alert";

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
   
            <CurrencyConverter title="Калькулятор валют" />
            <Chart />
          

{/*           <Feedback
            userName={this.props.userName}
            userEmail={this.props.userEmail}
            isSend={(value) => {
              this.setState(() => {
                return {
                  alert: value,
                };
              });
            }}
          /> */}
        </div>
      </>
    );
  }
}


export default MainPage;
