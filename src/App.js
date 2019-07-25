import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import "./App.css";
import SignInForm from "./containers/SignInForm";
import SignUpForm from "./containers/SignUpForm";
import Header from "./components/Header";
import HomePage from "./containers/HomePage";
import Dashboard from "./containers/Dashboard";

import api from "./services/api";

import BooksList from "./containers/BooksList";
import BookId from "./containers/BookId";
import AuthorsList from "./containers/AuthorsList";
import AuthorId from "./containers/AuthorId";
import TheoriesList from "./containers/TheoriesList";

class App extends React.Component {
  state = {
    user: null,
    books: [],
    authors: [],
    theories: []
  };

  //signin/out ----------------------------------------

  signin = user => {
    this.setState({
      user: user
    });
    localStorage.setItem("token", user.token);
    // this.props.history.push(`/${user.username}`);
  };

  signout = () => {
    this.setState({
      user: null
    });
    this.props.history.push("/");
    localStorage.removeItem("token");
  };

  //onLoad -------------------------------------------

  componentDidMount() {
    //this should only run if there is a token not everytime the page loads, the alerts are annoying.
    if (localStorage.token) {
      api.validate().then(data => {
        if (data.error) {
          alert(data.error);
        } else {
          this.signin(data);
        }
      });
    }
    api.getBooks().then(books => this.setState({ books: books }));
    api.getTheories().then(theories => this.setState({ theories: theories }));
    api.getAuthors().then(authors => this.setState({ authors: authors }));
  }

  //sort books, authors and theories -----------------

  sortBooksByTitle = () => {
    this.setState({
      books: this.state.books.sort((a, b) => a.title.localeCompare(b.title))
    });
  };

  sortBooksByAuthor = () => {
    this.setState({
      books: this.state.books.sort((a, b) =>
        a.author.name.localeCompare(b.author.name)
      )
    });
  };

  sortAuthorsByName = () => {
    this.setState({
      authors: this.state.authors.sort((a, b) => a.name.localeCompare(b.name))
    });
  };

  sortTheoriesByName = () => {
    this.setState({
      theories: this.state.theories.sort((a, b) => a.name.localeCompare(b.name))
    });
  };

  // add favourites ---------------------------------

  addFavouriteBook = (book, user) => {
    api.createFavouriteBook(book.id, user.id);
    this.setState({
      user: {
        ...this.state.user,
        favourite_books: [...this.state.user.favourite_books, book]
      }
    });
  };

  removeFavouriteBook = (book, user) => {
    api.deleteFavouriteBook(book.id, user.id);
    this.setState({
      user: {
        ...this.state.user,
        favourite_books: this.state.user.favourite_books.filter(
          b => b.id !== book.id
        )
      }
    });
  };

  addFavouriteAuthor = (author, user) => {
    api.createFavouriteAuthor(author.id, user.id);
    this.setState({
      user: {
        ...this.state.user,
        favourite_authors: [...this.state.user.favourite_authors, author]
      }
    });
  };

  removeFavouriteAuthor = (author, user) => {
    api.deleteFavouriteAuthor(author.id, user.id);
    this.setState({
      user: {
        ...this.state.user,
        favourite_authors: this.state.user.favourite_authors.filter(
          a => a.id !== author.id
        )
      }
    });
  };

  addFavouriteTheory = (theory, user) => {
    api.createFavouriteTheory(theory.id, user.id);
    this.setState({
      user: {
        ...this.state.user,
        favourite_theories: [...this.state.user.favourite_theories, theory]
      }
    });
  };

  removeFavouriteTheory = (theory, user) => {
    api.deleteFavouriteTheory(theory.id, user.id);
    this.setState({
      user: {
        ...this.state.user,
        favourite_theories: this.state.user.favourite_theories.filter(
          t => t.id !== theory.id
        )
      }
    });
  };

  // Reviews ------------------------------------------

  render() {
    const {
      signin,
      signout,
      addFavouriteBook,
      removeFavouriteBook,
      addFavouriteAuthor,
      removeFavouriteAuthor,
      addFavouriteTheory,
      removeFavouriteTheory,
      sortAuthorsByName,
      sortBooksByTitle,
      sortBooksByAuthor,
      sortTheoriesByName
    } = this;
    const { user, books, authors, theories } = this.state;

    return (
      <div className="App">
        <Header user={user} signout={signout} signin={signin} />
        <Switch>
          <Route
            exact
            path="/"
            render={props => (
              <HomePage
                {...props}
                books={books}
                authors={authors}
                theories={theories}
              />
            )}
          />
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
          {user && (
            <Route
              path={`/${user.username}`}
              render={props => <Dashboard user={user} {...props} />}
            />
          )}
          <Route
            exact
            path="/books"
            render={props => (
              <BooksList
                user={user}
                addFavouriteBook={addFavouriteBook}
                removeFavouriteBook={removeFavouriteBook}
                sortBooksByTitle={sortBooksByTitle}
                sortBooksByAuthor={sortBooksByAuthor}
                books={books}
                {...props}
              />
            )}
          />
          <Route
            exact
            path="/books/:title"
            render={props => (
              <BookId
                user={user}
                addFavouriteBook={addFavouriteBook}
                removeFavouriteBook={removeFavouriteBook}
                isLiked={
                  user &&
                  user.favourite_books
                    .map(b => b.title)
                    .includes(props.match.params.title)
                }
                authors={authors}
                {...props}
              />
            )}
          />
          <Route
            exact
            path="/authors"
            render={props => (
              <AuthorsList
                user={user}
                authors={authors}
                addFavouriteAuthor={addFavouriteAuthor}
                removeFavouriteAuthor={removeFavouriteAuthor}
                sortAuthorsByName={sortAuthorsByName}
                {...props}
              />
            )}
          />
          <Route
            exact
            path="/authors/:name"
            render={props => (
              <AuthorId
                user={user}
                addFavouriteAuthor={addFavouriteAuthor}
                removeFavouriteAuthor={removeFavouriteAuthor}
                books={books}
                isLiked={
                  user &&
                  user.favourite_authors
                    .map(a => a.name)
                    .includes(props.match.params.name)
                }
                {...props}
              />
            )}
          />
          <Route
            exact
            path="/theories"
            render={props => (
              <TheoriesList
                user={user}
                addFavouriteTheory={addFavouriteTheory}
                removeFavouriteTheory={removeFavouriteTheory}
                sortTheoriesByName={sortTheoriesByName}
                theories={theories}
                {...props}
              />
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
