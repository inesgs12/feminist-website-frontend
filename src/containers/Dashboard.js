import React from "react";
import { Grid, Menu, Segment } from "semantic-ui-react";

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
  }

  render() {
    const { activeItem } = this.state;
    return (
      <div className="user-info-grid">
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
                active={activeItem === "My Books"}
                onClick={this.handleItemClick}
              />
              <Menu.Item
                name="My Authors"
                active={activeItem === "My Authors"}
                onClick={this.handleItemClick}
              />
              <Menu.Item
                name="My Theories"
                active={activeItem === "My Theories"}
                onClick={this.handleItemClick}
              />
            </Menu>
          </Grid.Column>

          <Grid.Column stretched width={12}>
            <Segment>
              This is an stretched grid column. This segment will always match
              the tab height
            </Segment>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default Dashboard;
