import React from "react";
import { Card } from "semantic-ui-react";

class BookCard extends React.Component {
  render() {
    const { book, showBook } = this.props;
    return <Card raised image={book.cover} onClick={() => showBook(book)} />;
  }
}

export default BookCard;
