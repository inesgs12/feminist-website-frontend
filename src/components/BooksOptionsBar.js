import React from "react";
import { Button } from "semantic-ui-react";

class BookOptionsBar extends React.Component {
  render() {
    // debugger;
    const { sortBooksByTitle, sortBooksByAuthor } = this.props;
    return (
      <div>
        <Button className="options-bar" onClick={sortBooksByTitle}>
          Sort by Title
        </Button>
        <Button className="options-bar" onClick={sortBooksByAuthor}>
          Sort by Author
        </Button>
      </div>
    );
  }
}

export default BookOptionsBar;
