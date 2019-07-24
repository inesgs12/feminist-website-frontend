import React from "react";
import { Icon } from "semantic-ui-react";
import { NavLink } from "react-router-dom";
import ReviewCard from "../components/ReviewCard";
import { Card } from "semantic-ui-react";

class BookId extends React.Component {
  state = {
    book: null
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

  componentDidMount() {
    this.getBookInfo();
  }

  render() {
    const { book } = this.state;
    const { user } = this.props;

    if (book === null) return <h1>No book.</h1>;

    return (
      <div>
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
          <div>
            <p>
              Author:{" "}
              <NavLink key={book.author.id} to={`/authors/${book.author.name}`}>
                {book.author.name}
              </NavLink>
            </p>
            <p>Year: {book.year} </p>
            <p>Publisher: {book.publisher} </p>
            <p>Isbn-13: {book.isbn13} </p>
            <p>Language: {book.language} </p>
            <p>Synopsis: {book.synopsis} </p>
          </div>
        </div>
        <div className="review-card">
          <Card.Group itemsPerRow={2}>
            {book.reviews.map(review => (
              <ReviewCard
                key={`review-${review.id}`}
                user={user}
                book={book}
                review={review}
              />
            ))}
          </Card.Group>
        </div>
      </div>
    );
  }
}

export default BookId;
