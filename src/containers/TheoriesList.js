import React from "react";
import TheoryCard from "../components/TheoryCard";
import { Card } from "semantic-ui-react";
import OptionsBar from "../components/OptionsBar";
import SearchBar from "../components/SearchBar";

class TheoriesList extends React.Component {
  render() {
    const {
      theories,
      user,
      addFavouriteTheory,
      removeFavouriteTheory,
      sortTheoriesByNameDown,
      sortTheoriesByNameUp,
      updateSearchTerm,
      searchTerm
    } = this.props;

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
          <Card.Group stackable itemsPerRow={2}>
            {theories
              .filter(theory => theory.name.toLowerCase().includes(searchTerm))
              .map(theory => (
                <TheoryCard
                  key={`theory-${theory.id}`}
                  theory={theory}
                  user={user}
                  addFavouriteTheory={addFavouriteTheory}
                  removeFavouriteTheory={removeFavouriteTheory}
                  isLiked={
                    user &&
                    user.favourite_theories
                      .map(t => t.name)
                      .includes(theory.name)
                  }
                />
              ))}
          </Card.Group>
        </div>
      </div>
    );
  }
}

export default TheoriesList;
