import React, { Component } from "react";
import { Form, Button, Grid } from "semantic-ui-react";
import swal from "sweetalert";
import { createUser } from "../services/api";

class SignUpForm extends Component {
  handleSubmit = event => {
    event.preventDefault();

    let username = event.target.username.value;
    let password = event.target.password.value;
    // let firstName = event.target.firstName.value;
    // let lastName = event.target.lastName.value;
    // debugger;
    createUser(username, password).then(data => {
      if (data.error) {
        swal(
          "Please fill out all required fields. Passwords must be 4 characters or longer."
        );
      } else {
        swal({
          title: "User Created",
          text: "Please Log In",
          icon: "success"
        });
        this.props.history.push("/signin");
      }
    });
  };

  render() {
    return (
      <div className="sign-in-up-form">
        <Grid centered>
          <Form onSubmit={this.handleSubmit} className="sign-in-up-form">
            <h3>Sign Up</h3>
            {/* <Form.Group>
              <Form.Input name="firstName" label="First Name" />
              <Form.Input name="lastName" label="Last Name" />
            </Form.Group> */}
            <Form.Group>
              <Form.Input id="usernameInput" label="Username" name="username" />
            </Form.Group>
            <Form.Group>
              <Form.Input
                id="passwordInput"
                label="Password"
                name="password"
                type="password"
              />
            </Form.Group>
            {/* <Form.Group> */}
            <Button type="submit">Submit</Button>
            {/* </Form.Group> */}
          </Form>
        </Grid>

        {/* <h3 className="form-headers">Sign Up:</h3>
        <form onSubmit={handleSubmit}>
          <p className="form-subheaders">First Name:</p>
          <TextField name="firstName" />
          <p className="form-subheaders">Last Name:</p>
          <TextField name="lastName" />
          <p className="form-subheaders">Create username:</p>
          <TextField name="username" />
          <p className="form-subheaders">Create password:</p>
          <TextField name="password" type="password" />
          <br />
          <br />
          <Button type="submit" variant="contained" color="secondary">
            SUBMIT
          </Button>
        </form> */}
      </div>
    );
  }
}

export default SignUpForm;
