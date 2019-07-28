import React from "react";
import { Dropdown } from "semantic-ui-react";

class OptionsBar extends React.Component {
  render() {
    // debugger;
    const { sortAtoZ, sortZtoA, theories } = this.props;

    return (
      <div className="options-bar">
        <Dropdown
          text="Sort"
          icon="sort"
          floating
          labeled
          button
          className="icon small"
        >
          <Dropdown.Menu>
            <Dropdown.Menu scrolling>
              <Dropdown.Item
                key="A-Z"
                text={
                  theories && theories.length > 0
                    ? "Theories A-Z"
                    : "Authors A-Z"
                }
                value="A-Z"
                icon="sort alphabet down"
                onClick={sortAtoZ}
              />
              <Dropdown.Item
                key="Z-A"
                text={
                  theories && theories.length > 0
                    ? "Theories Z-A"
                    : "Authors Z-A"
                }
                value="Z-A"
                icon="sort alphabet up"
                onClick={sortZtoA}
              />
            </Dropdown.Menu>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    );
  }
}

export default OptionsBar;
