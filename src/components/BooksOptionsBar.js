import React from "react";
import { Dropdown } from "semantic-ui-react";

class BookOptionsBar extends React.Component {
  render() {
    // debugger;
    const {
      sortBooksByTitleUp,
      sortBooksByTitleDown,
      sortBooksByAuthor,
      sortBooksByYear
    } = this.props;
    return (
      <div className="books-dropdown">
        <Dropdown
          text="Sort"
          icon="sort"
          floating
          labeled
          button
          className="icon small"
        >
          <Dropdown.Menu>
            <Dropdown.Menu scrolling>
              <Dropdown.Item
                key="A-Z"
                text="Title A-Z"
                value="A-Z"
                icon="sort alphabet down"
                onClick={sortBooksByTitleDown}
              />
              <Dropdown.Item
                key="Z-A"
                text="Title Z-A"
                value="Z-A"
                icon="sort alphabet up"
                onClick={sortBooksByTitleUp}
              />
              <Dropdown.Item
                key="By Author"
                text="By Author"
                value="By Author"
                icon="user"
                onClick={sortBooksByAuthor}
              />
              <Dropdown.Item
                key="By Year"
                text="By Year"
                value="By Year"
                icon="sort numeric down"
                onClick={sortBooksByYear}
              />
            </Dropdown.Menu>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    );
  }
}

export default BookOptionsBar;
