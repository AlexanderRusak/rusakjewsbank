import React from "react";
import classes from "./Check.module.css";

export const Check = (props) => {
  const htmlFor = `checkbox-${Math.random()}`;
  return (
    <div className={classes.Check}>
      <input
        
        defaultChecked
        onClick={props.onChange}
        id={htmlFor}
        type="checkbox"
        value={props.value}
      />
      &nbsp;
      <label htmlFor={htmlFor}>{props.label}</label>
    </div>
  );
};
