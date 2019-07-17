import React from "react";

class Dashboard extends React.Component {
  componentDidUpdate() {
    if (!this.props.user.username) {
      debugger;
      this.props.history.push("/signin");
    } //why is this not redirecting me to the signin page?
  }

  render() {
    return (
      <div>
        <h1>This is My Account Page</h1>
      </div>
    );
  }
}

export default Dashboard;
