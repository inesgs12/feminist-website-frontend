import React from "react";
import BookCard from "../components/BookCard";
import { Card } from "semantic-ui-react";

class BooksList extends React.Component {
  showBook = book => {
    this.props.history.push(`/books/${book.title}`);
  };

  render() {
    return (
      <Card.Group itemsPerRow={4}>
        {this.props.books.map(book => (
          <BookCard
            key={`book-${book.id}`}
            book={book}
            user={this.props.user}
            showBook={this.showBook}
          />
        ))}
      </Card.Group>
    );
  }
}

export default BooksList;
