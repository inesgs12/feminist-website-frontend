import React from "react";
import { Card } from "semantic-ui-react";
import AuthorCard from "../components/AuthorCard";

class AuthorsList extends React.Component {
  showAuthor = author => {
    this.props.history.push(`/authors/${author.name}`);
    // debugger;
  };

  render() {
    return (
      <Card.Group itemsPerRow={4}>
        {this.props.authors.map(author => (
          <AuthorCard
            key={`author-${author.id}`}
            author={author}
            user={this.props.user}
            showAuthor={this.showAuthor}
          />
        ))}
      </Card.Group>
    );
  }
}

export default AuthorsList;
