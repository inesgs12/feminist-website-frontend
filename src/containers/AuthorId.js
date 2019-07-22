import React from "react";

class AuthorId extends React.Component {
  state = {
    author: null
  };

  getAuthorInfo = () => {
    const name = this.props.match.params.name;
    const authorIdUrl = `http://localhost:3000/authors/${name}`;
    fetch(authorIdUrl)
      .then(resp => resp.json())
      .then(author => this.setState({ author: author }));
  };

  componentDidMount() {
    this.getAuthorInfo();
  }

  render() {
    if (this.state.author === null) {
      return <h1>Author not found</h1>;
    } else {
      return (
        <div className="author-info">
          <h1>{this.state.author.name}</h1>
          <h3>{this.state.author.bio}</h3>
        </div>
      );
    }
  }
}

export default AuthorId;
