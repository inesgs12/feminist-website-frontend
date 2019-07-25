import React, { Component } from "react";
import Dialog from "@material-ui/core/Dialog";
import ReviewForm from "./ReviewForm";

class ReviewDashboard extends Component {
  state = { show: false };

  handleClick = () => {
    this.setState({ show: !this.state.show });
  };

  render() {
    const { user, book, handleChange } = this.props;
    const { handleClick } = this;
    return (
      <main>
        <br />

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
        <button type="button" onClick={this.handleClick}>
          Add Review
        </button>
      </main>
    );
  }
}

const container = document.createElement("div");
document.body.appendChild(container);

export default ReviewDashboard;
