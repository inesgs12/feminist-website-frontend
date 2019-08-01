import React, { Component } from "react";
import Dialog from "@material-ui/core/Dialog";
import EditReviewForm from "./EditReviewForm";
import { Icon, Popup } from "semantic-ui-react";
import swal from 'sweetalert';

class EditReviewDashboard extends Component {
  state = { show: false };

  handleClick = () => {
    // debugger;
    const { user } = this.props;
    if (user) {
      this.setState({ show: !this.state.show });
    } else {
      swal("You can only edit your own reviews");
    }
  };

  render() {
    const { user, book, handleEditReview, review } = this.props;
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
          <EditReviewForm
            book={book}
            user={user}
            review={review}
            popUp={handleClick}
            handleEditReview={handleEditReview}
          />
        </Dialog>
        <div onClick={handleClick}>
          <Popup
            content="Edit review"
            position="top right"
            trigger={
              <Icon className="edit-review-button" disabled name="edit" />
            }
          />
        </div>
        {/* <button type="button" onClick={this.handleClick}>
          Add Review
        </button> */}
      </main>
    );
  }
}

const container = document.createElement("div");
document.body.appendChild(container);

export default EditReviewDashboard;
