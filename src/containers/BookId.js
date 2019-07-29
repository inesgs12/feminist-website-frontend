import React from "react";
import { NavLink } from "react-router-dom";
import ReviewCard from "../components/ReviewCard";
import { Card, Icon, Grid } from "semantic-ui-react";
import ReviewDashboard from "../components/ReviewDashboard";

class BookId extends React.Component {
  state = {
    book: null,
    reviews: null
  };

  getBookInfo = () => {
    const title = this.props.match.params.title;
    const url = `http://localhost:3000/books/${title}`;
    fetch(url)
      .then(resp => resp.json())
      .then(book => {
        this.setState({
          book: book,
          reviews: book.reviews
        });
      });
  };

  handleChange = review => {
    this.setState({
      reviews: [...this.state.reviews, review]
    });
  };

  handleEditReview = bookReviews => {
    console.log(bookReviews);
    this.setState({
      reviews: bookReviews
    });
  };

  handleDeleteReview = review => {
    this.setState({
      reviews: this.state.reviews.filter(r => r.id !== review.id)
    });
  };

  updateFavouriteBooks = (book, user) => {
    if (user) {
      !this.props.isLiked
        ? this.props.addFavouriteBook(book, user)
        : this.props.removeFavouriteBook(book, user);
    } else {
      alert("Log in to add book to your favourites");
    }
  };

  componentDidMount() {
    this.getBookInfo();
  }

  render() {
    const { book, reviews } = this.state;
    const { user } = this.props;
    const { handleChange, handleDeleteReview, handleEditReview } = this;

    if (book === null) return <h1>No book.</h1>;

    return (
      <Grid>
        <Grid.Row columns={1} key={book.id}>
          <Grid.Column className="title-like">
            <p className="book-title">{book.title}</p>
            <div
              className="like-button-book-id"
              onClick={() => this.updateFavouriteBooks(book, user)}
            >
              <Icon
                className={this.props.isLiked ? "book-liked" : "book-not-liked"}
                name="like"
                size="big"
              />
              <br />
            </div>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row className="cover-details" columns={3}>
          <Grid.Column>
            <img className="book-cover" src={book.cover} alt={book.title} />
          </Grid.Column>
          <Grid.Column verticalAlign="middle" className="book-details-grid">
            <p>Synopsis: {book.synopsis} </p>
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
            <ReviewDashboard
              book={book}
              user={user}
              handleChange={handleChange}
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row centered column={1} className="review-card">
          <Card.Group className="card-group" itemsPerRow={2}>
            {reviews.map(review => (
              <ReviewCard
                key={`review-${review.id}`}
                user={user}
                book={book}
                review={review}
                handleDeleteReview={handleDeleteReview}
                handleEditReview={handleEditReview}
              />
            ))}
          </Card.Group>
        </Grid.Row>
      </Grid>
    );
  }
}

export default BookId;
