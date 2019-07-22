import React from "react";
import { NavLink } from "react-router-dom";
import logo from "./images/logo.png";

class Header extends React.Component {
  sessionHeader = () => {
    return this.props.user.username ? (
      <div>
        <div className="navbar-link">
          <NavLink
            className="Homepage-link"
            to={`/${this.props.user.username}`}
          >
            Profile
          </NavLink>
        </div>
        <div className="navbar-link">
          <NavLink
            onClick={this.props.signout}
            className="Homepage-link"
            to="/"
          >
            SignOut
          </NavLink>
        </div>
      </div>
    ) : (
      <div>
        <div className="navbar-link">
          <NavLink className="Homepage-link" to="/signin">
            SignIn
          </NavLink>
        </div>
        <div className="navbar-link">
          <NavLink className="Homepage-link" to="/signup">
            SignUp
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
              Home
            </NavLink>
          </div>
          <div className="navbar-link">
            <NavLink className="Homepage-link" to="/books">
              Books
            </NavLink>
          </div>
          <div className="navbar-link">
            <NavLink className="Homepage-link" to="/authors">
              Authors
            </NavLink>
          </div>
          <div className="navbar-link">{this.sessionHeader()}</div>
        </nav>
      </header>
    );
  }
}
export default Header;
