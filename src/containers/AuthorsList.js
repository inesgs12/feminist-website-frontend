import React from "react";
import { Card } from "semantic-ui-react";
import AuthorCard from "../components/AuthorCard";
import OptionsBar from "../components/OptionsBar";

class AuthorsList extends React.Component {
  showAuthor = author => {
    this.props.history.push(`/authors/${author.name}`);
    // debugger;
  };

  render() {
    const { authors, user, sortAuthorsByName } = this.props;
    return (
      <div>
        <OptionsBar handleClick={sortAuthorsByName} />
        <Card.Group itemsPerRow={4}>
          {authors.map((author, index) => (
            <AuthorCard
              key={`author-${index}`}
              author={author}
              user={user}
              showAuthor={this.showAuthor}
            />
          ))}
        </Card.Group>
      </div>
    );
  }
}

export default AuthorsList;
