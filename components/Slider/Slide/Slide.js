import React from "react";
import classes from "./Slide.module.css";

export const Slide = (props) => {
  return (
    <div className={classes.Slide}>
      <p className={classes.counter}>
        {props.current}/{props.count}
      </p>
      <h1>{props.title}</h1>
      <p className={classes.information}>{props.information}</p>

     
      {props.link && <a href={props.link}>{props.link}</a>}
    </div>
  );
};
