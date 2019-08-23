import React from "react";
import { NavLink } from "react-router-dom";
import logo from "./images/logo.png";

class Header extends React.Component {
  state = {
    navbarResponsive: false
  };

  handleClickHamburger = () => {
    console.log("Hamburger clicked!");
    this.setState({
      navbarResponsive: !this.state.navbarResponsive
    });
  };

  sessionHeader = () => {
    const { navbarResponsive } = this.state;
    return this.props.user ? (
      <div>
        <div
          className={
            navbarResponsive && navbarResponsive
              ? "navbar-link-responsive"
              : "navbar-link"
          }
        >
          <NavLink
            className="Homepage-link"
            to={`/${this.props.user.username}`}
          >
            PROFILE
          </NavLink>
        </div>
        <div
          className={
            navbarResponsive && navbarResponsive
              ? "navbar-link-responsive"
              : "navbar-link"
          }
        >
          <NavLink
            onClick={this.props.signout}
            className="Homepage-link"
            to="/"
          >
            SIGN OUT
          </NavLink>
        </div>
      </div>
    ) : (
      <div>
        <div
          className={
            navbarResponsive && navbarResponsive
              ? "navbar-link-responsive"
              : "navbar-link"
          }
        >
          <NavLink className="Homepage-link" to="/signin">
            SIGN IN
          </NavLink>
        </div>
        <div
          className={
            navbarResponsive && navbarResponsive
              ? "navbar-link-responsive"
              : "navbar-link"
          }
        >
          <NavLink className="Homepage-link" to="/signup">
            SIGN UP
          </NavLink>
        </div>
      </div>
    );
  };

  render() {
    const { handleClickHamburger } = this;
    const { navbarResponsive } = this.state;
    return (
      <header className="App-header">
        <nav
          className={
            navbarResponsive && navbarResponsive
              ? "navbar-responsive"
              : "navbar"
          }
        >
          <div className="navbar-logo title">
            <NavLink to="/">
              <img src={logo} className="App-logo" alt="logo" />
            </NavLink>
          </div>
          <div className="navbar-link">
            <NavLink className="Homepage-link" to="/">
              HOME
            </NavLink>
          </div>
          <div className="navbar-link">
            <NavLink className="Homepage-link" to="/books">
              BOOKS
            </NavLink>
          </div>
          <div className="navbar-link">
            <NavLink className="Homepage-link" to="/authors">
              AUTHORS
            </NavLink>
          </div>
          <div className="navbar-link">
            <NavLink className="Homepage-link" to="/theories">
              THEORIES
            </NavLink>
          </div>
          <div
            className={
              navbarResponsive && navbarResponsive
                ? "navbar-link-responsive"
                : "navbar-link"
            }
          >
            {this.sessionHeader()}
          </div>
          <div className="hamburger" onClick={handleClickHamburger}>
            <i className="fa fa-bars" />
          </div>
        </nav>
      </header>
    );
  }
}
export default Header;
