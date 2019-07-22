import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import "./App.css";
import SignInForm from "./containers/SignInForm";
import SignUpForm from "./containers/SignUpForm";
import Header from "./components/Header";
import HomePage from "./containers/HomePage";
import Dashboard from "./containers/Dashboard";

import {
  validate,
  createFavouriteBook,
  deleteFavouriteBook,
  createFavouriteAuthor,
  deleteFavouriteAuthor,
  createFavouriteTheory,
  deleteFavouriteTheory
} from "./services/api";

import BooksList from "./containers/BooksList";
import BookId from "./containers/BookId";
import AuthorsList from "./containers/AuthorsList";
import AuthorId from "./containers/AuthorId";
import TheoriesList from "./containers/TheoriesList";

const booksUrl = "http://localhost:3000/books";
const authorsUrl = "http://localhost:3000/authors";
const favouriteBooksUrl = "http://localhost:3000/favourite_books";
const favouriteAuthorsUrl = "http://localhost:3000/favourite_authors";
const favouriteTheoriesUrl = "http://localhost:3000/favourite_theories";

class App extends React.Component {
  state = {
    user: {},
    books: [],
    authors: [],
    theories: [],
    myBooks: [],
    myAuthors: [],
    myTheories: []
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
    this.getAuthors();
    this.getMyBooks();
    this.getMyAuthors();
  }

  getBooks = () => {
    fetch(booksUrl)
      .then(response => response.json())
      .then(books => this.setState({ books: books }));
  };

  getAuthors = () => {
    fetch(authorsUrl)
      .then(response => response.json())
      .then(authors => this.setState({ authors: authors }));
  };

  getMyBooks = () => {
    fetch(favouriteBooksUrl)
      .then(response => response.json())
      .then(favouriteBooks => this.mapFavouriteBooks(favouriteBooks));
  };

  mapFavouriteBooks = favouriteBooks => {
    let myArray = favouriteBooks.map(data => data.book);
    this.setState({
      myBooks: myArray
    });
  };

  getMyAuthors = () => {
    fetch(favouriteAuthorsUrl)
      .then(response => response.json())
      .then(favouriteAuthors => this.mapFavouriteAuthors(favouriteAuthors));
  };

  mapFavouriteAuthors = favouriteAuthors => {
    let myArray = favouriteAuthors.map(data => data.author);
    this.setState({
      myAuthors: myArray
    });
  };

  getMyTheories = () => {
    fetch(favouriteTheoriesUrl)
      .then(response => response.json())
      .then(favouriteTheories => this.mapFavouriteTheories(favouriteTheories));
  };

  mapFavouriteTheories = favouriteTheories => {
    let myArray = favouriteTheories.map(data => data.theory);
    this.setState({
      myTheories: myArray
    });
  };

  addFavouriteBook = (book, user) => {
    this.setState({
      myBooks: [...this.state.myBooks, book]
    });
    createFavouriteBook(book.id, user.id);
    //too optimistic
  };

  removeFavouriteBook = (book, user) => {
    this.setState({
      myBooks: this.state.myBooks.filter(b => b.id !== book.id)
    });
    deleteFavouriteBook(book.id, user.id);
  };

  addFavouriteAuthor = (author, user) => {
    this.setState({
      myAuthors: [...this.state.myAuthors, author]
    });
    createFavouriteAuthor(author.id, user.id);
    //too optimistic
  };

  removeFavouriteAuthor = (author, user) => {
    this.setState({
      myAuthors: this.state.myAuthors.filter(a => a.id !== author.id)
    });
    deleteFavouriteAuthor(author.id, user.id);
  };

  addFavouriteTheory = (theory, user) => {
    this.setState({
      myTheories: [...this.state.myTheories, theory]
    });
    createFavouriteTheory(theory.id, user.id);
    //too optimistic
  };

  removeFavouriteTheory = (theory, user) => {
    this.setState({
      myTheories: this.state.myTheories.filter(t => t.id !== theory.id)
    });
    deleteFavouriteTheory(theory.id, user.id);
  };

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
    } = this;
    const {
      user,
      books,
      authors,
      theories,
      myBooks,
      myAuthors,
      myTheories
    } = this.state;

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
                myBooks={myBooks}
                addFavouriteBook={addFavouriteBook}
                removeFavouriteBook={removeFavouriteBook}
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
                myBooks={myBooks}
                addFavouriteBook={addFavouriteBook}
                removeFavouriteBook={removeFavouriteBook}
                isLiked={myBooks
                  .map(b => b.title)
                  .includes(props.match.params.title)}
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
                myAuthors={myAuthors}
                addFavouriteAuthor={addFavouriteAuthor}
                removeFavouriteAuthor={removeFavouriteAuthor}
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
                myAuthors={myAuthors}
                isLiked={myAuthors
                  .map(a => a.name)
                  .includes(props.match.params.name)}
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
                myTheories={myTheories}
                addFavouriteTheory={addFavouriteTheory}
                removeFavouriteTheory={removeFavouriteTheory}
                theories={theories}
                isLiked={myTheories
                  .map(t => t.name)
                  .includes(props.match.params.name)}
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
