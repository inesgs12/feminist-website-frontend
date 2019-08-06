import React from "react";
import TheoryCard from "../components/TheoryCard";
import { Card } from "semantic-ui-react";
import OptionsBar from "../components/OptionsBar";
import SearchBar from "../components/SearchBar";

class TheoriesList extends React.Component {
  showTheory = theory => {
    this.props.history.push(`/theories/${theory.name}`);
  };
  componentWillUnmount = () => {
    const { resetSearch } = this.props;

    resetSearch();
  };

  render() {
    const {
      theories,
      user,
      sortTheoriesByNameDown,
      sortTheoriesByNameUp,
      updateSearchTerm,
      searchTerm
    } = this.props;

    const { showTheory } = this;

    return (
      <div className="theories-container">
        <div className="container-filter">
          <OptionsBar
            theories={theories}
            sortAtoZ={sortTheoriesByNameDown}
            sortZtoA={sortTheoriesByNameUp}
          />
          <SearchBar
            updateSearchTerm={updateSearchTerm}
            searchTerm={searchTerm}
          />
        </div>
        <div className="theories-container">
          <Card.Group stackable itemsPerRow={4}>
            {theories
              .filter(theory =>
                theory.name.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map(theory => (
                <TheoryCard
                  key={`theory-${theory.id}`}
                  theory={theory}
                  user={user}
                  showTheory={showTheory}
                />
              ))}
          </Card.Group>
        </div>
      </div>
    );
  }
}

export default TheoriesList;
