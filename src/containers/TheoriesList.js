import React from "react";
import TheoryCard from "../components/TheoryCard";
import { Card } from "semantic-ui-react";
import OptionsBar from "../components/OptionsBar";

class TheoriesList extends React.Component {
  render() {
    const {
      theories,
      user,
      addFavouriteTheory,
      removeFavouriteTheory,
      myTheories,
      sortTheoriesByName
    } = this.props;

    return (
      <div>
        <OptionsBar handleClick={sortTheoriesByName} />
        <Card.Group itemsPerRow={1}>
          {theories.map(theory => (
            <TheoryCard
              key={`theory-${theory.id}`}
              theory={theory}
              user={user}
              addFavouriteTheory={addFavouriteTheory}
              removeFavouriteTheory={removeFavouriteTheory}
              isLiked={myTheories.map(t => t.name).includes(theory.name)}
            />
          ))}
        </Card.Group>
      </div>
    );
  }
}

export default TheoriesList;
