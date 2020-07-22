import React from "react";
import classes from "./Drawer.module.css";
import { NavLink } from "react-router-dom";
import Backdrop from "../../components/UI/Backdrop/Backdrop";

class Drawer extends React.Component {
  renderLinks(links) {
    return links.map((link, index) => {
      return <li key={index}>{link}</li>;
    });
  }

  render() {
    const links = [];
    const cls = [classes.Drawer];
    if (!this.props.isOpen) {
      cls.push(classes.close);
    }

    if (this.props.isAuthenticated) {
      links.push(<NavLink onClick={this.props.onClose} to="/">Главная</NavLink>);
      links.push(<NavLink onClick={this.props.onClose} to="/main">Основная</NavLink>);
      links.push(<NavLink onClick={this.props.onClose} to="/feedback">Отзыв</NavLink>);
      links.push(<NavLink onClick={this.props.onClose} to="/logout">Выйти</NavLink>);
    } else {
      links.push(<NavLink onClick={this.props.onClose} to="/">Главная</NavLink>);
      links.push(<NavLink onClick={this.props.onClose} to="/signin">Войти</NavLink>);
      links.push(<NavLink onClick={this.props.onClose}  to="/registration">Регистрация</NavLink>);
    }
    return (
      <>
        <nav className={cls.join(" ")}>
          <ul>{this.renderLinks(links)}</ul>
        </nav>
        {this.props.isOpen ? <Backdrop onClick={this.props.onClose} /> : null}
      </>
    );
  }
}
export default Drawer;
