import React from "react";
import { Card } from "semantic-ui-react";

class TheoryCard extends React.Component {
  render() {
    const { theory, showTheory } = this.props;
    return (
      <Card
        className="theory-card-container"
        raised
        onClick={() => showTheory(theory)}
        description={theory.name}
      />
    );
  }
}
export default TheoryCard;
