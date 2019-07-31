import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import api from "../services/api";

class SignInForm extends React.Component {
  state = {
    username: "",
    password: ""
  };

  handleSubmit = () => {
    api.signin(this.state.username, this.state.password).then(data => {
      if (data.error) {
        alert(data.error);
      } else {
        this.props.setUser(data);
        this.props.history.push(`/${this.props.user.username}`);
      }
    });
  };

  handleChange = event =>
    this.setState({ [event.target.name]: event.target.value });

  render() {
    const { username, password } = this.state;
    const { handleChange, handleSubmit } = this;

    return (
      <div className="sign-in-form">
        <h3>SIGN IN</h3>
        <TextField
          id="usernameInput"
          label="Username"
          value={username}
          onChange={handleChange}
          margin="normal"
          name="username"
        />
        <br />
        <TextField
          id="passwordInput"
          label="Password"
          value={password}
          onChange={handleChange}
          margin="normal"
          name="password"
          type="password"
        />
        <br />
        <br />
        <Button onClick={handleSubmit} variant="contained" color="inherit">
          SUBMIT
        </Button>
      </div>
    );
  }
}

export default SignInForm;
