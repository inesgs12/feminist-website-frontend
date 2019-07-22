import React from "react";
import { Button, Icon } from "semantic-ui-react";

class BookId extends React.Component {
  state = {
    book: null
  };

  getBookInfo = () => {
    const title = this.props.match.params.title;
    const url = `http://localhost:3000/books/${title}`;
    fetch(url)
      .then(resp => resp.json())
      .then(book => this.setState({ book }));
  };

  addBook = book => {
    this.props.myBooks.push(book);
    this.props.updateFavouriteBooks(book, this.props.user);
  };

  componentDidMount() {
    this.getBookInfo();
  }

  render() {
    const { book } = this.state;
    const { addBook } = this;

    if (book === null) return <h1>No book.</h1>;

    return (
      <div className="book-details">
        <h1>{book.title}</h1> <br />
        <Button icon onClick={() => addBook(book)}>
          <Icon name="like" />
        </Button>{" "}
        <br />
        <img src={book.cover} alt={book.title} />
        <p>Year: {book.year} </p>
        <p>Publisher: {book.publisher} </p>
        <p>Isbn-13: {book.isbn13} </p>
        <p>Language: {book.language} </p>
        <h4>Synopsis: {book.synopsis} </h4>
      </div>
    );
  }
}

export default BookId;
