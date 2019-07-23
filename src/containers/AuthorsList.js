import React from "react";
import { Card } from "semantic-ui-react";
import AuthorCard from "../components/AuthorCard";

class AuthorsList extends React.Component {
  showAuthor = author => {
    this.props.history.push(`/authors/${author.name}`);
    // debugger;
  };

  render() {
    const { authors, user } = this.props
    return (
      <Card.Group itemsPerRow={4}>
        {authors.map(author => (
          <AuthorCard
            key={`author-${author.id}`}
            author={author}
            user={user}
            showAuthor={this.showAuthor}
          />
        ))}
      </Card.Group>
    );
  }
}

export default AuthorsList;
