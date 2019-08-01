import React from "react";
import { createReview } from "../services/api";
import { Button, Form } from "semantic-ui-react";
import StarRatings from "react-star-ratings";
import swal from 'sweetalert';


class ReviewForm extends React.Component {
  state = {
    starsRating: 0,
    reviewComment: null
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
      () => this.postReview(this.state.starsRating, this.state.reviewComment)
    );
  };

  // call the Post function to create the review in the backend --------------
  postReview = (stars, reviewComment) => {
    const { book, user, handleChange } = this.props;

    createReview(book.id, user.id, stars, reviewComment).then(data => {
      if (data.error) {
        swal(data.error);
      } else {
        handleChange(data);
      }
    });
  };

  render() {
    const { book, popUp } = this.props;
    const { setReviewState } = this;
    const { starsRating } = this.state;

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
        <br />
        <br />
        <Form.TextArea
          name="comment"
          label="Review"
          placeholder="What did you think?"
          className="review-text"
        />
        <div className="review-submit">
          <Button className="review-submit" onClick={popUp} type="submit">
            Submit
          </Button>
        </div>
      </Form>
    );
  }
}

export default ReviewForm;
