import React from "react";
import classes from "./Button.module.css";
export const Button = (props) => {
  const link = props.link;
  const cls = [classes.Button, "btn"];
  const title = props.title || "Отправить";
  const type = props.type ? `btn-${props.type}` : "btn-light";
  cls.push(type);

  return (
   
    <button
      disabled={!(props.disabled)}
      onClick={props.onClick}
      className={cls.join(" ")}
    >
      {props.link ? link : title}
    </button>
  );
};
