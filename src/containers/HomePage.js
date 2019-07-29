import React from "react";
import feminism from "./feminism.png";

class HomePage extends React.Component {
  // randomBook = () => {
  //   const { books } = this.props;
  //  books.map(book => book.cover).sample;
  // };
  render() {
    return (
      <div className="homepage">
        <img className="feminism-definition" src={feminism} alt={feminism} />
        {/* <img
          className="book-cover-sample feminism-definition"
          src={feminism}
          alt="feminism-book-random"
        /> */}
      </div>
    );
  }
}

export default HomePage;
