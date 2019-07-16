import React from "react";
import { Link } from "@material-ui/core";

const Header = props => (
  <header className="femhub-header">
    <h1>
      {props.user.username
        ? `Welcome back, ${props.user.first_name}!`
        : "Welcome to FemHub"}
      {props.user.username && <Link onClick={props.signout}>Sign Out</Link>}
    </h1>
  </header>
);

export default Header;
