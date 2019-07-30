import React from "react";
import { Menu, Segment } from "semantic-ui-react";
import image from "./Panda-user-default-photo.png";
import { NavLink } from "react-router-dom";

class Dashboard extends React.Component {
  state = { activeItem: "info" };

  handleItemClick = (e, { name }) => {
    // debugger;
    this.setState({ activeItem: name });
  };

  componentDidUpdate() {
    if (!this.props.user.username) {
      // debugger;
      this.props.history.push("/signin");
    }
    this.displayInfo();
  }

  displayInfo = () => {
    const { user } = this.props;
    const { activeItem } = this.state;

    switch (activeItem) {
      case "info":
        return (
          <div className="user-display" key={user.id}>
            <h3>
              {" "}
              {user.first_name} {user.last_name}
            </h3>
            <p> Username: {user.username}</p>
            <img className="user-photo" alt={user.photo} src={image} />
          </div>
        );

      case "My Books":
        // debugger;
        return user.favourite_books.map(book => {
          return (
            <div key={book.id}>
              <NavLink className="books-display" to={`/books/${book.title}`}>
                {book.title}
              </NavLink>
              <br />
            </div>
          );
        });

      case "My Authors":
        return user.favourite_authors.map(author => {
          return (
            <div key={author.id}>
              <NavLink
                className="authors-display"
                to={`/authors/${author.name}`}
              >
                {author.name}
              </NavLink>
              <br />
            </div>
          );
        });

      case "My Theories":
        return user.favourite_theories.map((theory, key) => {
          return (
            <div key={theory.id}>
              <NavLink
                className="theories-display"
                id={key}
                to={`/theories/${theory.name}`}
              >
                {theory.name}
              </NavLink>
              <br />
            </div>
          );
        });

      default:
        return null;
    }
  };

  render() {
    const { activeItem } = this.state;
    const { displayInfo } = this;
    const { user } = this.props;

    return (
      <div className="user-info-grid" key={user.id}>
            <Menu stackable pointing secondary>
              <Menu.Item
                name="info"
                active={activeItem === "info"}
                onClick={this.handleItemClick}
              />
              <Menu.Item
                name="My Books"
                active={activeItem === "MyBooks"}
                onClick={this.handleItemClick}
              />
              <Menu.Item
                name="My Authors"
                active={activeItem === "MyAuthors"}
                onClick={this.handleItemClick}
              />
              <Menu.Item
                name="My Theories"
                active={activeItem === "MyTheories"}
                onClick={this.handleItemClick}
              />
            </Menu>
            <Segment >{displayInfo()}</Segment>
      </div>
    );
  }
}

export default Dashboard;
