import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import "./App.css";
import SignInForm from "./containers/SignInForm";
import SignUpForm from "./containers/SignUpForm";
import Header from "./components/Header";
import Footer from "./components/Footer";
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
    theories: [],
    searchTerm: ""
  };

  // get random books to display in HomePage and BookId -----

  getRandomBooks = () => {
    let { books } = this.state;

    if (books.length === 0) return;

    const randomizedBooks = [...books].sort(() => Math.random() - 0.5);
    const randomBooks = [
      randomizedBooks.slice(0, 2),
      randomizedBooks.slice(2, 4)
    ];
    return randomBooks;
  };

  getBookIdRandomBooks = () => {
    let { books } = this.state;

    if (books.length === 0) return;

    const randomizedBooks = [...books].sort(() => Math.random() - 0.5);
    const twoRandomBooks = randomizedBooks.slice(4, 6);

    return twoRandomBooks;
  };

  //signin/out ----------------------------------------

  setUser = data => {
    this.setState({
      user: data.user
    });
  };

  signout = () => {
    this.setState({
      user: null
    });
    this.props.history.push("/");
    api.removeUser();
  };

  //onLoad -------------------------------------------

  componentDidMount() {
    //this should only run if there is a token not everytime the page loads, the alerts are annoying.
    if (localStorage.token) {
      api.validate().then(data => {
        if (data.error) {
          alert(data.error);
        } else {
          this.setUser(data);
        }
      });
    }
    api.getBooks().then(books => this.setState({ books: books }));
    api.getTheories().then(theories => this.setState({ theories: theories }));
    api.getAuthors().then(authors => this.setState({ authors: authors }));
  }
  // reset Search Term
  resetSearch = () => {
    this.setState({
      searchTerm: ""
    });
  };
  //sort books, authors and theories -----------------

  sortBooksByTitleDown = () => {
    this.setState({
      books: this.state.books.sort((a, b) => a.title.localeCompare(b.title))
    });
  };

  sortBooksByTitleUp = () => {
    this.setState({
      books: this.state.books.sort((a, b) => b.title.localeCompare(a.title))
    });
  };

  sortBooksByAuthor = () => {
    this.setState({
      books: this.state.books.sort((a, b) =>
        a.author.name.localeCompare(b.author.name)
      )
    });
  };

  sortBooksByYear = () => {
    this.setState({
      books: this.state.books.sort((a, b) => a.year - b.year)
    });
  };

  sortAuthorsByNameDown = () => {
    this.setState({
      authors: this.state.authors.sort((a, b) => a.name.localeCompare(b.name))
    });
  };

  sortAuthorsByNameUp = () => {
    this.setState({
      authors: this.state.authors.sort((a, b) => b.name.localeCompare(a.name))
    });
  };

  sortTheoriesByNameDown = () => {
    this.setState({
      theories: this.state.theories.sort((a, b) => a.name.localeCompare(b.name))
    });
  };

  sortTheoriesByNameUp = () => {
    this.setState({
      theories: this.state.theories.sort((a, b) => b.name.localeCompare(a.name))
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

  // Search Bars --------------------------------------

  updateSearchTerm = event => {
    event.preventDefault();
    this.setState({
      searchTerm: event.target.value
    });
  };

  // ---------------------------------------

  render() {
    const {
      setUser,
      signout,
      addFavouriteBook,
      removeFavouriteBook,
      addFavouriteAuthor,
      removeFavouriteAuthor,
      addFavouriteTheory,
      removeFavouriteTheory,
      sortAuthorsByNameDown,
      sortAuthorsByNameUp,
      sortBooksByTitleUp,
      sortBooksByTitleDown,
      sortBooksByAuthor,
      sortBooksByYear,
      sortTheoriesByNameDown,
      sortTheoriesByNameUp,
      updateSearchTerm,
      resetSearch
    } = this;
    const { user, books, authors, theories, searchTerm } = this.state;
    const randomBooks = this.getRandomBooks();
    const twoRandomBooks = this.getBookIdRandomBooks();

    return (
      <div className="App">
        <Header user={user} signout={signout} setUser={setUser} />
        <div className="push-content" />
        <Switch>
          <Route
            exact
            path="/"
            render={props => (
              <HomePage
                {...props}
                randomBooks={randomBooks}
                authors={authors}
                theories={theories}
              />
            )}
          />
          <Route
            path="/signin"
            render={props => (
              <SignInForm setUser={setUser} user={user} {...props} />
            )}
          />
          <Route
            path="/signup"
            component={props => <SignUpForm setUser={setUser} {...props} />}
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
                sortBooksByTitleUp={sortBooksByTitleUp}
                sortBooksByTitleDown={sortBooksByTitleDown}
                sortBooksByAuthor={sortBooksByAuthor}
                sortBooksByYear={sortBooksByYear}
                books={books}
                randomBooks={randomBooks}
                updateSearchTerm={updateSearchTerm}
                searchTerm={searchTerm}
                resetSearch={resetSearch}
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
                books={books}
                addFavouriteBook={addFavouriteBook}
                removeFavouriteBook={removeFavouriteBook}
                isLiked={
                  user &&
                  user.favourite_books
                    .map(b => b.title)
                    .includes(props.match.params.title)
                }
                authors={authors}
                twoRandomBooks={twoRandomBooks}
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
                sortAuthorsByNameDown={sortAuthorsByNameDown}
                sortAuthorsByNameUp={sortAuthorsByNameUp}
                updateSearchTerm={updateSearchTerm}
                searchTerm={searchTerm}
                resetSearch={resetSearch}
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
                sortTheoriesByNameDown={sortTheoriesByNameDown}
                sortTheoriesByNameUp={sortTheoriesByNameUp}
                theories={theories}
                updateSearchTerm={updateSearchTerm}
                searchTerm={searchTerm}
                resetSearch={resetSearch}
                {...props}
              />
            )}
          />
          {/* <Route component={() => <h1> Page not found </h1>} /> */}
        </Switch>
        <div className="push" />
        <Footer />
      </div>
    );
  }
}
export default withRouter(App);
// by exporting withRouter I will also allow APP to have match, location and history props.
