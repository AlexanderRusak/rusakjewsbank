import React, { useState } from "react";
import classes from "./Input.module.css";

export const Input = (props) => {
  const inputType = props.type || "text";
  const cls = [
    `${classes.Input} ${props.type === "date" ? classes.date : "input-group"}`,
  ];
  const htmlFor = `${inputType}-${Math.random()}`;
  const [touched, setTouched] = useState(false);
  const onChangeTouched = (event) => {
    setTouched(true);
    props.onChange && props.onChange(event.target.value, props.id && props.id);
  };
  ////
  touched && !props.valid && cls.push(classes.error);
  ////
  return (
    <div className={classes.Input}>
      {props.label && <label htmlFor={htmlFor}>{props.label}</label>}
      {props.type !== "textarea" ? (
        <input
          style={{
            height: `${props.height ? props.height : "auto"}`,
          }}
          value={props.value && props.value}
          placeholder={props.type !== "password" ? props.label : ""}
          onChange={onChangeTouched}
          id={htmlFor}
          type={inputType}
          className={cls.join(" ")}
        />
      ) : (
        <textarea
          value={props.value && props.value}
          onChange={onChangeTouched}
          id={htmlFor}
          style={{
            height: `${props.height ? props.height : "auto"}`,
          }}
          className={cls.join(" ")}
          rows={props.rows}
          cols={props.cols}
        ></textarea>
      )}
      {touched && !props.valid ? (
        <span style={{ color: "red" }}>
          {props.errorMessage || "Некорректные данные"}
        </span>
      ) : null}
    </div>
  );
};
