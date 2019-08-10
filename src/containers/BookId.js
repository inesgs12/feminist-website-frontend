import React from "react";
import { NavLink } from "react-router-dom";
import ReviewCard from "../components/ReviewCard";
import { Card, Icon, Grid, Image, Button, Header } from "semantic-ui-react";
import ReviewDashboard from "../components/ReviewDashboard";
import swal from "sweetalert";

const booksUrl = "https://www.thefeministhub.net/books/";
class BookId extends React.Component {
  state = {
    book: null,
    reviews: null,
    randomBook1: {},
    randomBook2: {}
  };

  getBookInfo = () => {
    const title = this.props.match.params.title;
    const url = `https://the-feminist-hub-backend.herokuapp.com/books/${title}`;
    return fetch(url)
      .then(resp => resp.json())
      .then(book => {
        this.setState({
          book: book,
          reviews: book.reviews
        });
      });
  };

  setRandomBooks = () => {
    const { books } = this.props;

    let book_one = books[Math.floor(Math.random() * Math.floor(books.length))];
    let book_two = books[Math.floor(Math.random() * Math.floor(books.length))];

    this.setState({
      randomBook1: book_one || {},
      randomBook2: book_two || {}
    });
  };

  componentDidUpdate = prevProps => {
    if (prevProps !== this.props) this.setRandomBooks();
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
    // debugger;
    if (user) {
      !this.props.isLiked
        ? this.props.addFavouriteBook(book, user)
        : this.props.removeFavouriteBook(book, user);
    } else {
      swal("Log in to add book to your favourites");
    }
  };

  componentDidMount() {
    this.getBookInfo();
  }

  render() {
    // debugger;
    const { book, reviews } = this.state;
    const { user, twoRandomBooks } = this.props;
    const { handleChange, handleDeleteReview, handleEditReview } = this;

    if (book === null || twoRandomBooks == null) return <h1>Loading...</h1>;

    return (
      <Grid stackable>
        <Grid.Row key={book.id} column={1}>
          <Grid.Column className="title-like" width={16}>
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
          <Grid.Column width={5}>
            <Image className="book-cover" src={book.cover} alt={book.title} />
          </Grid.Column>
          <Grid.Column
            width={7}
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
            <p className="synopsis"> {book.synopsis} </p>
            <div className="book-year-others">
              <span className="details-margin">
                <p>Year: {book.year} </p>
                <p className="details-margin">Publisher: {book.publisher} </p>
                <p className="details-margin">Isbn-13: {book.isbn13} </p>
                <p className="details-margin">Language: {book.language} </p>
              </span>
              <span className="buy-book">
                <Button className="buy-book" href={book.link} target="_blank">
                  <Icon className="amazon" size="huge" name="amazon" />
                </Button>
              </span>
            </div>
          </Grid.Column>
          <Grid.Column width={2} only="computer" />
          <Grid.Column width={2} only="computer" verticalAlign="middle">
            <div className="thumbnails-div">
              {twoRandomBooks &&
                twoRandomBooks.map((book, i) => {
                  return (
                    <Image
                      key={i}
                      href={booksUrl + book.title}
                      className="book-thumbnail"
                      src={book.cover}
                      alt={book.title}
                    />
                  );
                })}
            </div>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row column={1} className="reviews-header">
          <Grid.Column verticalAlign="middle" width={8}>
            <Header className="review-word" as="h3">
              <Icon name="bookmark outline" />
              <Header.Content>REVIEWS</Header.Content>
            </Header>
          </Grid.Column>
          <Grid.Column mobile={16} tablet={4} largeScreen={8}>
            <ReviewDashboard
              book={book}
              user={user}
              handleChange={handleChange}
              className="add-review-button"
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row column={1} className="review-card">
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
