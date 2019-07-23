import React from "react";
import { Icon } from "semantic-ui-react";

class BookId extends React.Component {
  state = {
    book: null,
    author: null
  };

  getBookInfo = () => {
    const title = this.props.match.params.title;
    const url = `http://localhost:3000/books/${title}`;
    fetch(url)
      .then(resp => resp.json())
      .then(book => {
        this.setState({ book });
      });
  };

  updateFavouriteBooks = (book, user) => {
    !this.props.isLiked
      ? this.props.addFavouriteBook(book, user)
      : this.props.removeFavouriteBook(book, user);
  };

  setAuthor = () => {
    // debugger;
    // let author = this.props.authors.filter(
    //   author => author.id === this.state.book.author_id
    // );
    // this.setState({
    //   author: author
    // });
  };

  componentDidMount() {
    this.getBookInfo();
  }

  render() {
    const { book } = this.state;
    const { user } = this.props;

    if (book === null) return <h1>No book.</h1>;

    return (
      <div className="book-details">
        <h1>{book.title}</h1> <br />
        <div onClick={() => this.updateFavouriteBooks(book, user)}>
          <Icon
            className={this.props.isLiked ? "book-liked" : "book-not-liked"}
            name="like"
            size="big"
          />
        </div>
        <br />
        <img src={book.cover} alt={book.title} />
        <p>Year: {book.year} </p>
        <p>Publisher: {book.publisher} </p>
        <p>Isbn-13: {book.isbn13} </p>
        <p>Language: {book.language} </p>
        <h4>Synopsis: {book.synopsis} </h4>
        {/* <h5>Author: {this.setAuthor().name} </h5> */}
      </div>
    );
  }
}

export default BookId;
