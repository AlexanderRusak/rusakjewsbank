import React, { Component } from "react";
import classes from "./Layout.module.css";
import { Menu } from "../../Navigation/Menu/Menu";
import Drawer from "../../Navigation/Drawer/Drawer";
import { connect } from "react-redux";

class Layout extends Component {
  state = {
    menu: false,
  };
  toggleMenuHandler = () => {
    this.setState(() => {
      return { menu: !this.state.menu };
    });
  };
  menuCloseHandler = () => {
    this.setState(() => {
      return { menu: false };
    });
  };
  render() {
    return (
      <div className={classes.Layout}>
        <Drawer
          isOpen={this.state.menu}
          onClose={this.menuCloseHandler}
          isAuthenticated={this.props.isAuthenticated}
        />
        <Menu onToggle={this.toggleMenuHandler} isOpen={this.state.menu} />
        <main>{this.props.children}</main>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.signIn.token,
  };
}

export default connect(mapStateToProps, null)(Layout);
