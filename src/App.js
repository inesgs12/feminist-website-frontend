import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import "./App.css";
import SignInForm from "./containers/SignInForm";
import SignUpForm from "./containers/SignUpForm";
import Header from "./components/Header";
import HomePage from "./containers/HomePage";
import Dashboard from "./containers/Dashboard";
import { validate } from "./services/api";
import BooksList from "./containers/BooksList";
import BookId from "./containers/BookId";

const booksUrl = "http://localhost:3000/books";
class App extends React.Component {
  state = {
    user: {},
    books: []
  };

  signin = user => {
    this.setState({
      user: user
    });
    localStorage.setItem("token", user.token);
    // this.props.history.push(`/${user.username}`);
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
    this.getBooks();
  }

  getBooks = () => {
    fetch(booksUrl)
      .then(response => response.json())
      .then(books => this.setState({ books: books }));
  };

  render() {
    const { signin, signout, getBooks, selectBook } = this;
    const { user, books, selectedBook } = this.state;

    return (
      <div className="App">
        <Header user={user} signout={signout} signin={signin} />
        <Switch>
          <Route exact path="/" render={props => <HomePage {...props} />} />
          <Route
            path="/signin"
            render={props => (
              <SignInForm signin={signin} user={user} {...props} />
            )}
          />
          <Route
            path="/signup"
            component={props => <SignUpForm signin={signin} {...props} />}
          />
          <Route
            path={`/${user.username}`}
            render={props => <Dashboard user={user} {...props} />}
          />
          <Route
            exact
            path="/books"
            render={props => (
              <BooksList
                user={user}
                books={books}
                selectBook={selectBook}
                getBooks={getBooks}
                {...props}
              />
            )}
          />
          <Route
            exact
            path="/books/:title"
            render={props => (
              <BookId user={user} book={selectedBook} {...props} />
            )}
          />
          {/* <Route component={() => <h1> Page not found </h1>} /> */}
        </Switch>
      </div>
    );
  }
}
export default withRouter(App);
// by exporting withRouter I will also allow APP to have match, location and history props.
