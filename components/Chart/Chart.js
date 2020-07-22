import React from "react";
import classes from "./Chart.module.css";
import {
  LineChart,
  XAxis,
  YAxis,
  Line,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import Checkbox from "../../components/UI/Checkbox/Checkbox";
import { Check } from "../../components/UI/Checkbox/Check";
import { DateInput } from "../UI/DateInput/DateInput";
import { Form } from "../Form/Form";
import Loader from "../UI/Loader/Loader";
import { connect } from "react-redux";
import { fetchDataChart } from "../../store/actions/chart";
import { USD, EUR, RUB } from "../../API/CurrenciesId";

class Chart extends React.Component {
  state = {
    isUSD: true,
    isEUR: true,
    isRUB: true,
    data: [],

    startDate: new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000)
      .toJSON()
      .slice(0, 10)
      .replace(/-/g, "-"),
    endDate: new Date().toJSON().slice(0, 10).replace(/-/g, "-"),
  };

  checkHandlerChange = (event) => {
    event.target.value === "USD" &&
      this.setState(() => {
        return {
          isUSD: !this.state.isUSD,
        };
      });
    event.target.value === "EUR" &&
      this.setState(() => {
        return {
          isEUR: !this.state.isEUR,
        };
      });
    event.target.value === "RUB" &&
      this.setState(() => {
        return {
          isRUB: !this.state.isRUB,
        };
      });
  };
  concatCurrenciesData(usd, eur, rub) {
    const resultArray = usd.concat(eur.concat(rub));
    const newArray = [];
    const newUsd = [];
    const newEur = [];
    const newRub = [];
    const newDate = [];
    Object.entries(resultArray).map((currencyEntity) => {
      let {
        Cur_ID: id,
        Cur_OfficialRate: usd,
        Cur_OfficialRate: eur,
        Cur_OfficialRate: rub,
        Date: date,
      } = currencyEntity[1];
      date = date.slice(0, 10).replace(/-/g, "-");
      if (id === USD) {
        newUsd.push(usd);
        newDate.push(date);
      }
      if (id === EUR) {
        newEur.push(eur);
      }
      if (id === RUB) {
        newRub.push(rub);
      }
      return true;
    });
    newDate.forEach((item, index) => {
      newArray.push({
        usd: newUsd[index],
        eur: newEur[index],
        rub: newRub[index],
        date: newDate[index],
      });
    });

    return newArray;
  }
  changeDateHandler = (value, start) => {
    start
      ? this.setState(() => {
          return {
            startDate: value,
          };
        })
      : this.setState(() => {
          return {
            endDate: value,
          };
        });
    start
      ? this.props.fetchDataChart(value, this.state.endDate)
      : this.props.fetchDataChart(this.state.startDate, value);
  };
  componentDidMount() {
    this.props.fetchDataChart(this.state.startDate, this.state.endDate);
  }

  render() {
    return (
      <Form title="График">
        {this.props.chartLoading ? (
          <Loader />
        ) : (
          <>
            <ResponsiveContainer height={250} width="100%">
              <LineChart
                margin={{ top: 10 }}
                data={this.concatCurrenciesData(
                  this.props.usd,
                  this.props.eur,
                  this.props.rub
                )}
              >
                {this.state.isUSD && (
                  <Line type="monotone" dataKey="usd" stroke="green" />
                )}

                {this.state.isEUR && (
                  <Line type="monotone" dataKey="eur" stroke="#f05c50" />
                )}

                {this.state.isRUB && <Line dataKey="rub" stroke="#2570c6" />}
                <XAxis
                  tick={false}
                  dataKey="date"
                  padding={{ left: 30, right: 30 }}
                />
                <YAxis domain={["dataMin - 0.1", "dataMax + 0.5"]} />
                <Legend />
                <Tooltip wrapperStyle={{ top: 20, left: 0 }} />
              </LineChart>
            </ResponsiveContainer>
            <Checkbox>
              <Check
                onChange={this.checkHandlerChange}
                value={"USD"}
                label="USD"
                checked={this.state.isUSD}
              />
              <Check
                onChange={this.checkHandlerChange}
                value={"EUR"}
                label="EUR"
                checked={this.state.isEUR}
              />
              <Check
                onChange={this.checkHandlerChange}
                value={"RUB"}
                label="RUB"
                checked={this.state.isRUB}
              />
            </Checkbox>
            <div className={classes.dateInput} >
              <DateInput
                label={"c "}
                onChange={this.changeDateHandler}
                startDate={true}
                defaultDate={this.state.startDate}
                maxDateValue={this.state.endDate}
              />
              <DateInput
                label="по"
                onChange={this.changeDateHandler}
                defaultDate={this.state.endDate}
                minDateValue={this.state.startDate}
              />
            </div>
          </>
        )}
      </Form>
    );
  }
}
function mapStateToProps(state) {
  return {
    chartData: state.chart.data,
    chartLoading: state.chart.chartLoading,
    error: state.chart.error,
    usd: state.chart.usd,
    eur: state.chart.eur,
    rub: state.chart.rub,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    fetchDataChart: (startDate, endDate) =>
      dispatch(fetchDataChart(startDate, endDate)),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Chart);
