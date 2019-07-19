import React from "react";

class BookId extends React.Component {
  state = {
    book: null
  };

  getBookInfo = () => {
    const title = this.props.match.params.title;
    const url = `http://localhost:3000/books/${title}`;
    fetch(url)
      .then(resp => resp.json())
      .then(book => this.setState({ book }));
  };

  componentDidMount() {
    this.getBookInfo();
  }

  render() {
    if (this.state.book === null) return <h1>No book.</h1>;

    return <h1>{this.state.book.title}</h1>;
  }
}

export default BookId;
