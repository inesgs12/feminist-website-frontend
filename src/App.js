import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import "./App.css";
import SignInForm from "./pages/SignInForm";
import Header from "./pages/Header";
import HomePage from "../src/pages/Homepage";
import MyAccount from "../src/pages/MyAccount";
import { validate } from "./services/api";

class App extends React.Component {
  state = {
    user: {}
  };

  signin = user => {
    this.setState({
      user: user
    });
    localStorage.setItem("token", user.token); 
    this.props.history.push(`/${user.username}`);
  };

  signout = () => {
    this.setState({
      user: {}
    });
    this.props.history.push("/");
    localStorage.removeItem("token");
  };

  componentDidMount() {
    //this should only run if there is a token not everytime the page loads, the alerts are annoying.
    if (localStorage.token) {
      validate().then(data => {
        if (data.error) {
          alert(data.error);
        } else {
          this.signin(data);
        }
      });
    }
  }

  render() {
    const { signin, signout } = this;
    const { user } = this.state;

    return (
      <div className="App">
        <Header user={user} signout={signout} />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route
            path="/signin"
            component={props => <SignInForm signin={signin} {...props} />}
          />
          <Route
            path={`/${user.username}`}
            component={props => <MyAccount user={user} {...props} />}
          />
          {/* <Route component={() => <h1> Page not found </h1>} /> */}
        </Switch>
      </div>
    );
  }
}
export default withRouter(App);
// by exporting withRouter I will also allow APP to have match, location and history props.
