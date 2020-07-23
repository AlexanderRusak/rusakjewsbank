import React from "react";
import classes from "./Select.module.css";

export const Select = (props) => {
 
  const onChangeSelect = (event) => {
    props.onSelect && props.onSelect(event.target.value, props.id);
  };
  const cls = [classes.Select];
  return (
    <div className={cls.join(" ")}>
      <select onChange={onChangeSelect}>
        {props.options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.name}
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            {option.official_name}
          </option>
        ))}
      </select>
    </div>
  );
};
