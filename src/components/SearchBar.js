import React from "react";
import { Input, Icon } from "semantic-ui-react";

class SearchBar extends React.Component {
  render() {
    const { searchTerm, updateSearchTerm } = this.props;
    return (
      <div className="search-bar">
        <Input
          icon
          placeholder="Search..."
          value={searchTerm}
          onChange={updateSearchTerm}
        >
          <input />
          <Icon name="search" />
        </Input>
      </div>
    );
  }
}

export default SearchBar;
