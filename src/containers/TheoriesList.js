import React from "react";
import TheoryCard from "../components/TheoryCard"
import { Card } from "semantic-ui-react";

class TheoriesList extends React.Component {



  
  render() {
    return (
      <Card.Group itemsPerRow={4}>
        {this.props.theories.map(theory => (
          <TheoryCard
            key={`theory-${theory.id}`}
            theory={theory}
            user={this.props.user}
          />
        ))}
      </Card.Group>
    );
  }
}

export default TheoriesList;