import React from "react";
import { Form, Button, Grid } from "semantic-ui-react";
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
        <Grid segment centered>
          <Form className="sign-in-form" onSubmit={handleSubmit}>
            <h3>Sign in</h3>
            <Form.Group>
              <Form.Input
                id="usernameInput"
                label="Username"
                value={username}
                onChange={handleChange}
                name="username"
              />
              <Form.Input
                id="passwordInput"
                label="Password"
                value={password}
                onChange={handleChange}
                name="password"
                type="password"
              />
              <Button onClick={handleSubmit}>Submit</Button>
            </Form.Group>
          </Form>
        </Grid>
      </div>

      // <div className="sign-in-form">
      //   <h3>SIGN IN</h3>
      //   <form onSubmit={handleSubmit}>
      //     <TextField
      //       id="usernameInput"
      //       label="Username"
      //       value={username}
      //       onChange={handleChange}
      //       margin="normal"
      //       name="username"
      //     />
      //     <br />
      //     <TextField
      //       id="passwordInput"
      //       label="Password"
      //       value={password}
      //       onChange={handleChange}
      //       margin="normal"
      //       name="password"
      //       type="password"
      //     />
      //     <br />
      //     <br />
      //     <Button onClick={handleSubmit} variant="contained" color="inherit">
      //       SUBMIT
      //     </Button>
      //   </form>
      // </div>
    );
  }
}

export default SignInForm;
