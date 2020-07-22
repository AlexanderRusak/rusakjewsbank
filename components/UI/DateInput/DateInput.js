import React from "react";
import classes from "./DateInput.module.css";

export const DateInput = (props) => {
  const start = props.startDate || false;
  let min = new Date(new Date().getTime() - 365 * 24 * 60 * 60 * 1000)
    .toJSON()
    .slice(0, 10)
    .replace(/-/g, "-");
  let max = new Date().toJSON().slice(0, 10).replace(/-/g, "-");
  const onChangeDateHandler = (event) => {
    props.onChange(event.target.value, start);
  };
  return (
    <div className={classes.DateInput}>
      <label>{props.label}</label>&nbsp;
      <input
        className={"form-control"}
        value={props.defaultDate}
        type="date"
        onChange={onChangeDateHandler}
        max={props.maxDateValue ? props.maxDateValue : max}
        min={props.minDateValue ? props.minDateValue : min}
      />
    </div>
  );
};
