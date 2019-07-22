import React from "react";
import { Card } from "semantic-ui-react";

class TheoryCard extends React.Component {
  render() {
    const { theory } = this.props;
    return (
        // <div className="ui card" onClick={() => showTheory(theory)}>
            <Card>
                <Card.Content header={theory.name} />
                <Card.Content description={theory.history} />
                {/* <Card.Content extra>
                <Icon name='user' />
                4 Friends */}
                {/* </Card.Content> */}
            </Card>
        // </div>
      );
    }
  }

export default TheoryCard;