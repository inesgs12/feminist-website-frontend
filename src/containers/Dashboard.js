import React from "react";
import { Grid, Menu, Segment } from "semantic-ui-react";
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
    const { user, myBooks, myAuthors, myTheories } = this.props;
    const { activeItem } = this.state;

    switch (activeItem) {
      case "info":
        return (
          <div className="user-display">
            <h3> {user.first_name} {user.last_name}</h3>
            <p> Username: {user.username}</p>
            <img className="user-photo" alt={user.photo} src={image} />
          </div>
        );

      case "My Books":
        return myBooks.map(book => {
          return (
            <div>
              <NavLink className="books-display" to={`/books/${book.title}`}>
                {book.title}
              </NavLink>
              <br />
            </div>
          );
        });

      case "My Authors":
        return myAuthors.map(author => {
          return (
            <div>
            <NavLink className="authors-display" to={`/authors/${author.name}`}>
              {author.name}
            </NavLink>
            <br/>
            </div>
          );
        });

      case "My Theories":
        return myTheories.map((theory, key) => {
          return (
            <div>
            <NavLink
              className="theories-display" id={key}
              to={`/theories/${theory.name}`}
            >
              {theory.name}
            </NavLink>
            <br/>
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
    const { user } = this.props

    return (
      <div className="user-info-grid" key={user.id}>
        <Grid>
          <Grid.Column width={4}>
            <Menu fluid vertical tabular>
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
          </Grid.Column>

          <Grid.Column stretched width={12}>
            <Segment>{displayInfo()}</Segment>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default Dashboard;
