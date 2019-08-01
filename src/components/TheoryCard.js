import React from "react";
import { Card } from "semantic-ui-react";
import { Icon } from "semantic-ui-react";
import swal from 'sweetalert'

class TheoryCard extends React.Component {
  updateFavouriteTheories = (theory, user) => {
    if (user) {
      !this.props.isLiked
        ? this.props.addFavouriteTheory(theory, user)
        : this.props.removeFavouriteTheory(theory, user);
    } else {
      swal("Log in to add theory/movement to your favourites");
    }
  };

  render() {
    const { theory, user } = this.props;
    return (
      <Card className="theory-card">
        <Card.Content>
          <div
            className="theory-like-button"
            onClick={() => this.updateFavouriteTheories(theory, user)}
          >
            <Icon
              className={
                this.props.isLiked ? "theory-liked" : "theory-not-liked"
              }
              name="like"
              size="big"
            />
          </div>
          <Card.Header className="theory-card">{theory.name} </Card.Header>
          <br />
          <Card.Description className="theory-card-description">
            {theory.history}
          </Card.Description>
        </Card.Content>
      </Card>
    );
  }
}

export default TheoryCard;
