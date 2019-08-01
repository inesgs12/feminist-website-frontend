import React from "react";
import { NavLink } from "react-router-dom";
import logo from "./images/FEMHUB.png";

class Header extends React.Component {
  sessionHeader = () => {
    return this.props.user ? (
      <div>
        <div className="navbar-link">
          <NavLink
            className="Homepage-link"
            to={`/${this.props.user.username}`}
          >
            PROFILE
          </NavLink>
        </div>
        <div className="navbar-link">
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
        <div className="navbar-link">
          <NavLink className="Homepage-link" to="/signin">
            SIGN IN
          </NavLink>
        </div>
        <div className="navbar-link">
          <NavLink className="Homepage-link" to="/signup">
            SIGN UP
          </NavLink>
        </div>
      </div>
    );
  };

  render() {
    return (
      <header className="App-header">
        <nav className="navbar">
          <div className="navbar-link title">
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
          <div className="navbar-link">{this.sessionHeader()}</div>
        </nav>
      </header>
    );
  }
}
export default Header;
