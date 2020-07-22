import React, { useState } from "react";
import classes from "./Select.module.css";

export const Select = (props) => {
  const [isOpen, isOpenChange] = useState(false);
  const onChangeSelect = (event) => {
    props.onSelect && props.onSelect(event.target.value, props.id);
  };
  const cls = [classes.Select];
  return (
    <div className={cls.join(" ")}>
      <select
        onClick={() => {
          isOpenChange(!isOpen);
        }}
        onChange={onChangeSelect}
      >
        {props.options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.name}&nbsp;{!isOpen && option.official_name}
          </option>
        ))}
      </select>
    </div>
  );
};
