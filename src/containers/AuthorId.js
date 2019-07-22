import React from "react";
import { Icon } from "semantic-ui-react";

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
    !this.props.isLiked
      ? this.props.addFavouriteAuthor(author, user)
      : this.props.removeFavouriteAuthor(author, user);
  };

  componentDidMount() {
    this.getAuthorInfo();
  }

  render() {
    const { author } = this.state;
    const { user } = this.props;

    if (this.state.author === null) {
      return <h1>Author not found</h1>;
    } else {
      return (
        <div className="author-details">
          <h1>{this.state.author.name}</h1>
          <div onClick={() => this.updateFavouriteAuthors(author, user)}>
            <Icon
              className={
                this.props.isLiked ? "author-liked" : "author-not-liked"
              }
              name="like"
              size="big"
            />
          </div>
          <br />
          <h3>{this.state.author.bio}</h3>
        </div>
      );
    }
  }
}

export default AuthorId;
