import React from "react";
import StarRatings from "react-star-ratings";
import { deleteReview } from "../services/api";
import { Icon, Popup } from "semantic-ui-react";
import EditReviewDashboard from "./EditReviewDashboard";

class ReviewCard extends React.Component {
  removeReview = () => {
    const { review, handleDeleteReview } = this.props;
    deleteReview(review.id);
    handleDeleteReview(review);
  };

  render() {
    const { review, user, book, handleEditReview } = this.props;
    const { removeReview } = this;

    return (
      <div className="ui card review-card">
        <div className="content">
          {user && review.user_id === user.id && (
            <div onClick={removeReview}>
              <Popup
                content="Delete review"
                position="top right"
                trigger={
                  <Icon
                    className="review-delete-button"
                    disabled
                    name="delete"
                  />
                }
              />
            </div>
          )}
          <div className="star-and-comment">
            <div className="stars-review-card">
              <StarRatings
                rating={review.star_rating}
                starDimension="30px"
                starSpacing="5px"
                starRatedColor="rgb(78, 14, 78)"
              />
            </div>
            <br />
            <div>
            <p className="review-comment">{review.comment}</p>
          </div>
          </div>
          <div className="username-review">
            <p>posted by: {user ? user.username : null}</p>
          </div>
          {user && review.user_id === user.id && (
            <div>
              <EditReviewDashboard
                book={book}
                user={user}
                review={review}
                handleEditReview={handleEditReview}
              />
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default ReviewCard;
