import React from "react";
import classes from "./Form.module.css";

export const Form = (props) => {
const cls=[classes.Form,props.classesForm]

  return (
    <div className={cls.join(" ")}>
      {props.title && <h2>{props.title}</h2>}
      {props.children}
    </div>
  );
};
