import React from "react";
import { NavLink } from "react-router-dom";
import ReviewCard from "../components/ReviewCard";
import { Card, Icon, Grid, Segment, Image, Button } from "semantic-ui-react";
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
    const { user, books } = this.props;
    const { handleChange, handleDeleteReview, handleEditReview } = this;

    if (book === null) return <h1>No book.</h1>;

    return (
      <Grid>
        <Grid.Row key={book.id}>
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
        <Grid.Row className="cover-details" columns={4}>
          <Grid.Column mobile={16} tablet={8} largeScreen={5}>
            <Image className="book-cover" src={book.cover} alt={book.title} />
            <ReviewDashboard
              book={book}
              user={user}
              handleChange={handleChange}
              className="add-review-button"
            />
          </Grid.Column>
          <Grid.Column
            mobile={16}
            tablet={8}
            largeScreen={7}
            verticalAlign="middle"
            className="book-details-grid"
          >
            <p className="author-in-book">
              Author:{" "}
              <NavLink
                className="book-author-link"
                key={book.author.id}
                to={`/authors/${book.author.name}`}
              >
                {book.author.name}
              </NavLink>
            </p>
            <p> {book.synopsis} </p>
            <div className="book-year-others">
              <p className="book-year-others">Year: {book.year} </p>
              <p className="book-year-others">Publisher: {book.publisher} </p>
              <p className="book-year-others">Isbn-13: {book.isbn13} </p>
              <p className="book-year-others">Language: {book.language} </p>
            </div>
            <br />
            <Button
              className="buy-book"
              href={book.link}
              position="right"
              target="_blank"
            >
              Buy Book
            </Button>
          </Grid.Column>
          <Grid.Column largeScreen={2} only="large screen" />
          <Grid.Column
            largeScreen={2}
            only="large screen"
            verticalAlign="middle"
            width={2}
          >
            <div className="thumbnails-div">
              <Image
                className="book-thumbnail"
                src={book.cover}
                alt={book.title}
              />{" "}
              <br />
              <Image
                className="book-thumbnail"
                src={book.cover}
                alt={book.title}
              />
            </div>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row centered column={1} className="review-card">
          <Grid.Column />
          <Card.Group stackable className="card-group" itemsPerRow={3}>
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
          <Grid.Column />
        </Grid.Row>
      </Grid>
    );
  }
}

export default BookId;
