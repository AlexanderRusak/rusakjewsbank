import React from "react";
import classes from "./Menu.module.css";

export const Menu = (props) => {
  const cls = [classes.Menu, "fa"];
  if (props.isOpen) {
    cls.push("fa-times");
    cls.push(classes.open);
  } else {
    cls.push("fa-bars");
  }
  return (
    <div>
      <i className={cls.join(" ")} onClick={props.onToggle}></i>
      <div className={classes.Menu}></div>
    </div>
  );
};
