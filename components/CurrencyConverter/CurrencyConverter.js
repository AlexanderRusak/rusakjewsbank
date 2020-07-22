import React from "react";
import classes from "./CurrencyConverter.module.css";
import { Input } from "../UI/Input/Input";
import { Select } from "../UI/Select/Select";
import { Form } from "../../components/Form/Form";

import { connect } from "react-redux";
import { fetchCurrencies } from "../../store/actions/converter";
import Loader from "../UI/Loader/Loader";

class CurrencyConverter extends React.Component {
  state = {
    currencyValueID1: 1,
    currencyValueID2: 1,
    inputValue1: "",
    inputValue2: "",
  };
  onSelectHandler = (value, id) => {
    id === 1
      ? this.setState(() => {
          return {
            currencyValueID1: value,
            inputValue1: "",
            inputValue2: "",
          };
        })
      : this.setState(() => {
          return {
            currencyValueID2: value,
            inputValue1: "",
            inputValue2: "",
          };
        });
  };

  onChangeHandler = (value, id) => {
    console.log(value);
    this.setState(() => {
      return {
        inputValue1:
          id === 2
            ? value *
              (this.state.currencyValueID2 / this.state.currencyValueID1)
            : value,
        inputValue2:
          id === 1
            ? value *
              (this.state.currencyValueID1 / this.state.currencyValueID2)
            : value,
      };
    });
  };
  componentDidMount() {
    this.props.fetchCurrencies();
  }
  render() {
    return (
      <Form title="Конвертер валют">
        {this.props.loading ? (
          <Loader />
        ) : (
          <div className={classes.CurrencyConverter}>
            <div className={classes.Section}>
              <Input
                value={this.state.inputValue1 && this.state.inputValue1}
                type="number"
                valid={true}
                id={1}
                onChange={this.onChangeHandler}
              />
              <Select
                id={1}
                options={this.props.currenciesData}
                onSelect={this.onSelectHandler}
              />
            </div>

            <div className={classes.Section}>
              <Input
                value={this.state.inputValue2 && this.state.inputValue2}
                type="number"
                valid={true}
                onChange={this.onChangeHandler}
                id={2}
              />
              <Select
                id={2}
                options={this.props.currenciesData}
                onSelect={this.onSelectHandler}
              />
            </div>
          </div>
        )}
      </Form>
    );
  }
}

function mapStateToProps(state) {
  return {
    currenciesData: state.converter.currenciesData,
    loading: state.converter.loading,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    fetchCurrencies: () => dispatch(fetchCurrencies()),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(CurrencyConverter);
