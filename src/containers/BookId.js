import React from "react";
import { Icon } from "semantic-ui-react";
import { NavLink } from "react-router-dom";

class BookId extends React.Component {
  state = {
    book: null,
    // author: null
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

  // componentDidUpdate(prevProps) {
  //   if (
  //     prevProps.authors.length !== this.props.authors.length &&
  //     this.props.authors.length > 0
  //   ) {
  //     this.setAuthor();
  //   }
  // }

  // setAuthor = () => {
  //   // console.log(this.props.authors);
  //   let author = this.props.authors.find(
  //     author => author.id === this.state.book.author_id
  //   );
  //   this.setState({
  //     author: author
  //   });
  // };

  componentDidMount() {
    this.getBookInfo();
  }

  render() {
    const { book } = this.state;
    const { user } = this.props;

    if (book === null) return <h1>No book.</h1>;

    return (
      <div className="book-details" key={book.id}>
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
        <p>Synopsis: {book.synopsis} </p>
        <div>
        <h5>
    Author: <NavLink key={book.author.id} to={`/authors/${book.author.name}`}>{book.author.name}</NavLink>
        </h5>
        </div>
      </div>
    );
  }
}

export default BookId;
