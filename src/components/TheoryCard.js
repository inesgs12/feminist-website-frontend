import React from "react";
import { Card } from "semantic-ui-react";
import { Icon } from "semantic-ui-react";

class TheoryCard extends React.Component {
  updateFavouriteTheories = (theory, user) => {
    if (user) {
      !this.props.isLiked
        ? this.props.addFavouriteTheory(theory, user)
        : this.props.removeFavouriteTheory(theory, user);
    } else {
      alert("Log in to add theory/movement to your favourites");
    }
  };

  render() {
    const { theory, user } = this.props;
    return (
      <Card>
        <div onClick={() => this.updateFavouriteTheories(theory, user)}>
          <Icon
            className={this.props.isLiked ? "theory-liked" : "theory-not-liked"}
            name="like"
            size="big"
          />
        </div>
        <Card.Content header={theory.name} />
        <Card.Content description={theory.history} />
      </Card>
    );
  }
}

export default TheoryCard;
