import React from "react";
import StarRatings from "react-star-ratings";
import { Button } from "semantic-ui-react";

class ReviewCard extends React.Component {
  render() {
    const { review, user } = this.props;
    return (
      <div className="ui card review-card">
        <div className="content">
          <StarRatings
            rating={review.star_rating}
            starDimension="30px"
            starSpacing="5px"
            starRatedColor="gold"
          />
          <p className="review-comment">{review.comment}</p>
          <p className="username-review">posted by: {user.username}</p>
          {review.user_id === user.id && (
            <Button className="edit-review-button" size="tiny">
              Edit
            </Button>
          )}
        </div>
      </div>
    );
  }
}

export default ReviewCard;
