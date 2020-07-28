import React from "react";
import classes from "./Label.module.css";
export const Label = (props) => {
  return (
    <div>
      <label className={classes.Title}>{props.label}</label>
      <div
        className={props.type !== "textarea" ? classes.Label : classes.Textarea}
      >
        <label>{props.value}</label>
        
      </div>
    </div>
  );
};
