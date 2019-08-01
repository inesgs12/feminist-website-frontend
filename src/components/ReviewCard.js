import React from "react";
import StarRatings from "react-star-ratings";
import { deleteReview } from "../services/api";
import { Icon, Popup } from "semantic-ui-react";
import EditReviewDashboard from "./EditReviewDashboard";
import swal from 'sweetalert';


class ReviewCard extends React.Component {
  removeReview = () => {
    const { review, handleDeleteReview } = this.props;
    swal({
      text: "Are you sure you want to delete this review?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        swal("Review Deleted", {
          icon: "success",
        }).then(deleteReview(review.id));
        handleDeleteReview(review);
      } else {
        swal("Your review is safe");
      }
    })
    
  };

  render() {
    const { review, user, book, handleEditReview } = this.props;
    const { removeReview } = this;

    return (
      <div className="ui card review-card">
        <div className="content">
          {user && review.review_user === user.username && (
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
            <p>posted by: {review.review_user}</p>
          </div>
          {user && review.review_user === user.username && (
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
