import React from "react";
import { createReview } from "../services/api";
import { Button, Form } from "semantic-ui-react";

class ReviewForm extends React.Component {
  state = {
    starsRating: null,
    reviewComment: null
  };

  // change state based on form input -----------------------------------

  setReviewState = event => {
    const stars = parseInt(event.target.stars.value);
    const comment = event.target.comment.value;

    event.preventDefault();

    this.setState({
      starsRating: stars,
      reviewComment: comment
    });
    this.postReview(stars, comment);
  };

  // call the Post function to create the review in the backend --------------
  postReview = (stars, comment) => {
    const { book, user, handleChange } = this.props;

    createReview(book.id, user.id, stars, comment).then(review =>
      handleChange(review)
    );
  };

  render() {
    const { book, popUp } = this.props;
    const { setReviewState } = this;

    return (
      <Form
        size="large"
        key="large"
        className="review-form"
        onSubmit={setReviewState}
      >
        <h3>{book.title}</h3>
        <Form.Input name="stars" label="Star Rating" placeholder="stars" />
        <Form.TextArea
          name="comment"
          label="Review"
          placeholder="What did you think?"
        />
        <Button onClick={popUp} type="submit">
          Submit
        </Button>
      </Form>
    );
  }
}

export default ReviewForm;
