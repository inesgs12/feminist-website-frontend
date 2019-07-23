import React from "react";
import { Button } from "semantic-ui-react";

class OptionsBar extends React.Component {
  render() {
    // debugger;
    const { handleClick } = this.props;
    return (
      <div>
        <Button className="options-bar" onClick={handleClick}>
          Sort A-Z
        </Button>
      </div>
    );
  }
}

export default OptionsBar;
