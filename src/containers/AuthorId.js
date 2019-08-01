import React from "react";
import { Icon } from "semantic-ui-react";
import { NavLink } from "react-router-dom";

class AuthorId extends React.Component {
  state = {
    author: null
  };

  getAuthorInfo = () => {
    const name = this.props.match.params.name;
    const authorIdUrl = `http://localhost:3000/authors/${name}`;
    fetch(authorIdUrl)
      .then(resp => resp.json())
      .then(author => this.setState({ author: author }));
  };

  updateFavouriteAuthors = (author, user) => {
    if (user) {
      !this.props.isLiked
        ? this.props.addFavouriteAuthor(author, user)
        : this.props.removeFavouriteAuthor(author, user);
    } else {
      alert("Log in to add author to your favourites");
    }
  };

  componentDidMount() {
    this.getAuthorInfo();
  }

  render() {
    const { author } = this.state;
    const { user } = this.props;

    if (this.state.author === null) {
      return <h1>Loading...</h1>;
    } else {
      return (
        <div key={author.id} className="author-details">
          <h1>{this.state.author.name}</h1>
          <div onClick={() => this.updateFavouriteAuthors(author, user)}>
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
          <h3 className="author-bio">{this.state.author.bio}</h3>
          <div>
            <h4>
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
          </div>
        </div>
      );
    }
  }
}

export default AuthorId;
