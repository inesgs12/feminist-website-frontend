import React from "react";
import { updateReview } from "../services/api";
import { Button, Form } from "semantic-ui-react";
import StarRatings from "react-star-ratings";
import swal from 'sweetalert';

class EditReviewForm extends React.Component {
  state = {
    starsRating: this.props.review.star_rating,
    reviewComment: this.props.review.comment
  };

  // change star rating based on stars form ------------------------------------
  changeRating = newRating => {
    this.setState({
      starsRating: newRating
    });
  };

  // change comment state based on form input -----------------------------------
  setReviewState = event => {
    const comment = event.target.comment.value;
    event.preventDefault();

    this.setState(
      {
        reviewComment: comment
      },
      () => this.editReview(this.state.starsRating, this.state.reviewComment)
    );
  };

  // call the Post function to create the review in the backend --------------
  editReview = (stars, reviewComment) => {
    const { book, user, review, handleEditReview } = this.props;
    updateReview(book.id, user.id, stars, reviewComment, review.id).then(
      data => {
        if (data.error) {
          swal("Update failed - Please enter comment and star rating");
        } else {
          handleEditReview(data);
        }
      }
    );
  };

  render() {
    const { book, popUp } = this.props;
    const { setReviewState } = this;
    const { starsRating, reviewComment } = this.state;

    return (
      <Form
        size="large"
        key="large"
        className="review-form"
        onSubmit={setReviewState}
      >
        <h3>{book.title}</h3>
        <StarRatings
          rating={starsRating}
          starRatedColor="rgb(78, 14, 78)"
          starHoverColor="rgb(78, 14, 78)"
          changeRating={this.changeRating}
          name="stars"
          numberOfStars={5}
          starDimension="30px"
          starSpacing="5px"
          className="star-form"
        />
        <Form.TextArea
          name="comment"
          label="Review"
          className="review-text"
        >{reviewComment}</Form.TextArea>
        <div className="review-submit">
          <Button className="review-submit" onClick={popUp} type="submit">
            Submit
          </Button>
        </div>
      </Form>
    );
  }
}

export default EditReviewForm;
