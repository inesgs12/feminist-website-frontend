import React from "react";
import { Icon } from "semantic-ui-react";
import swal from "sweetalert";

class TheoryId extends React.Component {
  state = {
    theory: null
  };

  getTheoryInfo = () => {
    const name = this.props.match.params.name;
    const base = "https://the-feminist-hub-backend.herokuapp.com/";
    const theoryIdUrl = base + `theories/${name}`;
    fetch(theoryIdUrl)
      .then(resp => resp.json())
      .then(theory => this.setState({ theory: theory }));
  };

  updateFavouriteTheories = (theory, user) => {
    if (user) {
      !this.props.isLiked
        ? this.props.addFavouriteTheory(theory, user)
        : this.props.removeFavouriteTheory(theory, user);
    } else {
      swal("Log in to add theory/movement to your favourites");
    }
  };

  componentDidMount() {
    this.getTheoryInfo();
  }

  render() {
    const { theory } = this.state;
    const { user } = this.props;

    if (this.state.theory === null) {
      return <h1>Loading...</h1>;
    } else {
      return (
        <div key={theory.id} className="theory-details">
          <h1>{this.state.theory.name}</h1>
          <div onClick={() => this.updateFavouriteTheories(theory, user)}>
            <Icon
              className={
                this.props.isLiked ? "theory-liked" : "theory-not-liked"
              }
              name="like"
              size="big"
            />
            <br />
          </div>
          <br />
          <h3 className="theory-description">{this.state.theory.history}</h3>
        </div>
      );
    }
  }
}

export default TheoryId;
