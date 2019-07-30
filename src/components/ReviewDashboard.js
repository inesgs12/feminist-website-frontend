import React, { Component } from "react";
import Dialog from "@material-ui/core/Dialog";
import ReviewForm from "./ReviewForm";
import { Button, Segment } from "semantic-ui-react";

class ReviewDashboard extends Component {
  state = { show: false };

  handleClick = () => {
    const { user } = this.props;
    if (user) {
      this.setState({ show: !this.state.show });
    } else {
      alert("Log in to leave a review");
    }
  };

  render() {
    const { user, book, handleChange } = this.props;
    const { handleClick } = this;
    return (
      <main>
        <Dialog
          open={this.state.show}
          onClose={() => {
            this.setState({ show: false });
          }}
        >
          <ReviewForm
            book={book}
            user={user}
            popUp={handleClick}
            handleChange={handleChange}
          />
        </Dialog>
        {/* <div > */}
        <Button className="add-review-button" onClick={this.handleClick}>
          Add Review
        </Button>
        {/* </div> */}
      </main>
    );
  }
}

const container = document.createElement("div");
document.body.appendChild(container);

export default ReviewDashboard;
