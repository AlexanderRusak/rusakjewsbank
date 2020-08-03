import React from "react";
import classes from "./Form.module.css";

export const Form = (props) => {
  const cls = [classes.Form, props.classesForm, "center-block"];
  props.widthCol
    ? cls.push(
        ` col-xs-${props.widthCol} col-md-${props.widthCol} col-lg-${props.widthCol} col-sm-${props.widthCol}`
      )
    : cls.push(` col-xs-4 col-md-4 col-lg-4 col-sm-4`);

  return (
    <div className={cls.join(" ")}>
      {props.title && <h2>{props.title}</h2>}
      {props.children}
    </div>
  );
};
