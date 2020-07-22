import React from "react";
import classes from "./MainLayout.module.css";

export default class MainLayout extends React.Component {
  render() {
    return (
      <div className={classes.MainLayout}>
        {this.props.children}
      </div>
    );
  }
}
