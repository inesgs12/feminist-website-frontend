import React from "react";
import { StarRatings } from "react-star-ratings";

class BookStar extends React.Component {
  // state = {
  //   rating: this.props.book.rating
  // };
  // changeRating(newRating, name) {
  //   this.setState({
  //     rating: newRating
  //   });
  // }
  render() {
    const { book, user } = this.props;
    return (
      <StarRatings
        rating={book.star_rating}
        starRatedColor="blue"
        // changeRating={this.changeRating}
        numberOfStars={5}
        name="rating"
      />
    );
  }
}

export default BookStar;
