import React from "react";
import { Card } from "semantic-ui-react";

class AuthorCard extends React.Component {
  render() {
    const { author, showAuthor } = this.props;
    return (
      <div className="ui card" onClick={() => showAuthor(author)}>
        <div className="content">
          <div className="center aligned header">{author.name}</div>
        </div>
      </div>
    );
  }
}

export default AuthorCard;
