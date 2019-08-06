import React from "react";
import { Card } from "semantic-ui-react";
import AuthorCard from "../components/AuthorCard";
import OptionsBar from "../components/OptionsBar";
import SearchBar from "../components/SearchBar";

class AuthorsList extends React.Component {
  showAuthor = author => {
    this.props.history.push(`/authors/${author.name}`);
  };

  componentWillUnmount = () => {
    const { resetSearch } = this.props;

    resetSearch();
  };

  render() {
    const {
      authors,
      user,
      sortAuthorsByNameDown,
      sortAuthorsByNameUp,
      updateSearchTerm,
      searchTerm
    } = this.props;

    const { showAuthor } = this;

    return (
      <div className="author-container">
        <div className="container-filter">
          <OptionsBar
            sortAtoZ={sortAuthorsByNameDown}
            sortZtoA={sortAuthorsByNameUp}
          />
          <SearchBar
            updateSearchTerm={updateSearchTerm}
            searchTerm={searchTerm}
          />
        </div>
        <div className="author-container">
          <Card.Group centered>
            {authors
              .filter(author =>
                author.name.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((author, index) => (
                <AuthorCard
                  key={`author-${index}`}
                  author={author}
                  user={user}
                  showAuthor={showAuthor}
                />
              ))}
          </Card.Group>
        </div>
      </div>
    );
  }
}

export default AuthorsList;
