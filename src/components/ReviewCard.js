import React from "react";
import StarRatings from "react-star-ratings";

// import { Divider, Grid } from "semantic-ui-react";
// import Ratings from "react-ratings-declarative";

class ReviewCard extends React.Component {
  render() {
    const { review } = this.props;
    return (
      <div className="ui card review-card">
        <div className="content">
          {/* <div className="center aligned header">Stars: {review.star_rating}</div> */}
          <StarRatings
            rating={review.star_rating}
            starDimension="30px"
            starSpacing="5px"
            starRatedColor="gold"
          />
          <p className="review-comment">{review.comment}</p>
        </div>
      </div>
    );
  }
}

export default ReviewCard;
