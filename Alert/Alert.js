import React, { useState } from "react";
import classes from "./Alert.module.css";

export default function Alert(props) {
  const [isShow, setShow] = useState(!!props.text);
  const cls=[`${classes.Alert} col col-md-4 alert  alert-dismissible `];
  setTimeout(()=>{
   
    setShow(false)
  },5000)

  const alert = isShow ? (
    <div
      className={cls.join(" ")}
      role="alert"
    >
      <p>{props.text}</p>
      <button
        type="button"
        className="close"
        data-dismiss="alert"
        aria-label="Close"
        onClick={() => setShow(!isShow)}
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  ) : null;

  return alert;
}
