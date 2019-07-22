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
  deleteFavouriteBook
} from "./services/api";
import BooksList from "./containers/BooksList";
import BookId from "./containers/BookId";
import AuthorsList from "./containers/AuthorsList";
import AuthorId from "./containers/AuthorId";

const booksUrl = "http://localhost:3000/books";
const authorsUrl = "http://localhost:3000/authors";
const favouriteBooksUrl = "http://localhost:3000/favourite_books";
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

  render() {
    const { signin, signout, addFavouriteBook, removeFavouriteBook } = this;
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
                {...props}
                isLiked={myBooks
                  .map(b => b.title)
                  .includes(props.match.params.title)}
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
                {...props}
              />
            )}
          />
          <Route
            exact
            path="/authors/:name"
            render={props => (
              <AuthorId user={user} myAuthors={myAuthors} {...props} />
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
