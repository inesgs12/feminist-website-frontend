import React from "react";
import StarRatings from "react-star-ratings";
import { updateReview, deleteReview } from "../services/api";
import { Icon, Popup } from "semantic-ui-react";

class ReviewCard extends React.Component {
  state = {
    edit: false
  };

  editReview = () => {
    this.setState({
      edit: true
    });
  };

  saveReview = () => {
    this.setState({
      edit: false
    });
  };

  removeReview = () => {
    const { review, handleDeleteReview } = this.props;
    deleteReview(review.id);
    handleDeleteReview(review);
  };

  render() {
    const { review, user } = this.props;
    const { edit } = this.state;
    const { editReview, saveReview, removeReview } = this;

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
          <div contentEditable={edit ? true : false}>
            <StarRatings
              rating={review.star_rating}
              starDimension="30px"
              starSpacing="5px"
              starRatedColor="gold"
            />
            <p className="review-comment">{review.comment}</p>
          </div>
          <p className="username-review">posted by: {review.user_id}</p>
          {user && review.user_id === user.id && (
            <div>
              {!edit ? (
                <div onClick={editReview}>
                  <Popup
                    content="Edit review"
                    position="top right"
                    trigger={
                      <Icon
                        className="edit-review-button"
                        disabled
                        name="edit"
                      />
                    }
                  />
                </div>
              ) : (
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
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default ReviewCard;
