import React from "react";
import classes from "./Checkbox.module.css";

class Checkbox extends React.Component {
  render() {
    return (
      
        <div className={classes.Checkbox}>{this.props.children}</div>
      
    );
  }
}

export default Checkbox;
