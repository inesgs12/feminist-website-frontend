import React, { Component } from "react";
import { Icon, Grid } from "semantic-ui-react";
import { NavLink } from "react-router-dom";
import swal from "sweetalert";

class AuthorId extends Component {
  state = {
    author: null
  };

  getAuthorInfo = () => {
    const name = this.props.match.params.name;
    const base = "https://the-feminist-hub-backend.herokuapp.com/";
    const authorIdUrl = `${base}authors/${name}`;

    fetch(authorIdUrl)
      .then(resp => resp.json())
      .then(author => this.setState({ author }));
  };

  updateFavouriteAuthors = (author, user) => {
    if (user) {
      !this.props.isLiked
        ? this.props.addFavouriteAuthor(author, user)
        : this.props.removeFavouriteAuthor(author, user);
    } else {
      swal("Log in to add author to your favourites");
    }
  };

  componentDidMount() {
    this.getAuthorInfo();
  }

  render() {
    const { author } = this.state;
    const { user } = this.props;

    if (author === null) {
      return <h1>Loading...</h1>;
    }

    return (
      <Grid
        stackable
        textAlign="center"
        key={author.id}
        className="author-details"
      >
        <Grid.Row className="first-row-author" columns={1}>
          <Grid.Column width={8} className="author-name-row">
            <h1 className="author-id-name">{author.name}</h1>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row className="author-like-button-row" columns={1}>
          <Grid.Column width={8} className="author-like-button">
            <div
              className="author-like-button"
              onClick={() => this.updateFavouriteAuthors(author, user)}
            >
              <Icon
                className={
                  this.props.isLiked ? "author-liked" : "author-not-liked"
                }
                name="like"
                size="big"
              />
              <br />
            </div>
            <br />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row className="author-bio-row" columns={1}>
          <Grid.Column width={8} className="author-bio">
            <h3 className="author-bio">{author.bio}</h3>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row className="author-books-row" columns={1}>
          <Grid.Column width={8} className="books-by-author">
            <h4 className="books-by-author">
              {" "}
              Books <br />
              {author.books.map((book, index) => (
                <NavLink
                  className="books-by-author"
                  key={index}
                  to={`/books/${book.title}`}
                >
                  {" "}
                  {book.title} <br />
                </NavLink>
              ))}
            </h4>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default AuthorId;
