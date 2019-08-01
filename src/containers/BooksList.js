import React from "react";
import BookCard from "../components/BookCard";
import { Card } from "semantic-ui-react";
import BooksOptionsBar from "../components/BooksOptionsBar";
import SearchBar from "../components/SearchBar";

class BooksList extends React.Component {
  showBook = book => {
    this.props.history.push(`/books/${book.title}`);
  };

  componentWillUnmount = () => {
    const { resetSearch } = this.props;

    resetSearch();
  };

  render() {
    const {
      books,
      sortBooksByTitleUp,
      sortBooksByTitleDown,
      user,
      sortBooksByAuthor,
      sortBooksByYear,
      updateSearchTerm,
      searchTerm
    } = this.props;
    return (
      <div className="book-container">
        <div className="container-filter">
          <BooksOptionsBar
            sortBooksByTitleUp={sortBooksByTitleUp}
            sortBooksByTitleDown={sortBooksByTitleDown}
            sortBooksByAuthor={sortBooksByAuthor}
            sortBooksByYear={sortBooksByYear}
          />
          <SearchBar
            updateSearchTerm={updateSearchTerm}
            searchTerm={searchTerm}
          />
        </div>
        <div className="book-container">
          <Card.Group centered>
            {books
              .filter(
                book =>
                  book.title.toLowerCase().includes(searchTerm) ||
                  book.author.name.toLowerCase().includes(searchTerm)
              )
              .map(book => (
                <BookCard
                  key={`book-${book.id}`}
                  book={book}
                  user={user}
                  showBook={this.showBook}
                />
              ))}
          </Card.Group>
        </div>
      </div>
    );
  }
}

export default BooksList;
