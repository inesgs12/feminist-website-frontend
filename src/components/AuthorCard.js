import React from "react";
import { Card } from "semantic-ui-react";

class AuthorCard extends React.Component {
  render() {
    const { author, showAuthor } = this.props;
    return (
      <Card
        className="author-card-container"
        raised
        onClick={() => showAuthor(author)}
        description={author.name}
      />
    );
  }
}

export default AuthorCard;
