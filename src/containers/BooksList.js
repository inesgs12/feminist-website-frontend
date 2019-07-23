import React from "react";
import BookCard from "../components/BookCard";
import { Card } from "semantic-ui-react";
import BooksOptionsBar from "../components/BooksOptionsBar";

class BooksList extends React.Component {
  showBook = book => {
    this.props.history.push(`/books/${book.title}`);
  };

  render() {
    const { books, sortBooksByTitle, user, sortBooksByAuthor } = this.props;
    return (
      <div>
        <BooksOptionsBar
          sortBooksByTitle={sortBooksByTitle}
          sortBooksByAuthor={sortBooksByAuthor}
        />
        <Card.Group itemsPerRow={4}>
          {books.map(book => (
            <BookCard
              key={`book-${book.id}`}
              book={book}
              user={user}
              showBook={this.showBook}
            />
          ))}
        </Card.Group>
      </div>
    );
  }
}

export default BooksList;
