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
          <div>
            <StarRatings
              rating={review.star_rating}
              starDimension="30px"
              starSpacing="5px"
              starRatedColor="rgb(78, 14, 78)"
            />
            <p className="review-comment">{review.comment}</p>
          </div>
          <p className="username-review">posted by: {review.user_id}</p>
          {user && review.user_id === user.id && (
            <div>
              <EditReviewDashboard
                book={book}
                user={user}
                review={review}
                handleEditReview={handleEditReview}
              />
              {/* {!edit ? ( */}
              {/* <div onClick={editReview}>
                <Popup
                  content="Edit review"
                  position="top right"
                  trigger={
                    <Icon className="edit-review-button" disabled name="edit" />
                  }
                />
              </div> */}
              {/* ) : (
                <div onClick={saveReview}>
                  <Popup
                    content="Save review"
                    position="top right"
                    trigger={
                      <Icon
                        className="review-save-button"
                        disabled
                        name="save"
                      />
                    }
                  />
                </div> */}
              {/* )} */}
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default ReviewCard;
