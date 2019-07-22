import React from "react";
import { Grid, Menu, Segment } from "semantic-ui-react";

class TheoriesList extends React.Component {

  state = { 
    activeTheory: "info" 
  }

  handleItemClick = (e, { name }) => {
    // debugger;
    this.setState({ 
      activeTheory: name 
    });
  };


  
  render() {

    const { activeTheory } = this.state;

    return (
      <div className="theories-grid">
        <Grid>
          <Grid.Column width={4}>
            <Menu fluid vertical tabular>
              <Menu.Item
                name="info"
                active={activeTheory === "info"}
                onClick={this.handleItemClick}
              />
              <Menu.Item
                name="My Books"
                active={activeTheory === "My Books"}
                onClick={this.handleItemClick}
              />
              <Menu.Item
                name="My Authors"
                active={activeTheory === "My Authors"}
                onClick={this.handleItemClick}
              />
              <Menu.Item
                name="My Theories"
                active={activeTheory === "My Theories"}
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

export default TheoriesList;