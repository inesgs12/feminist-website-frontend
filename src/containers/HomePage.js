import React from "react";
import { Grid, Segment, Image } from "semantic-ui-react";
import feminism3 from "./feminism3.png";

const booksUrl = "http://localhost:3001/books/";
class HomePage extends React.Component {
  render() {
    const { randomBooks } = this.props;

    if (randomBooks === undefined) return <h1>Loading...</h1>;

    return (
      <Grid stackable className="homepage-grid">
        <Grid.Row className="first-row" columns={3}>
          <Grid.Column
            verticalAlign="middle"
            className="feminism-and-books"
            width={10}
          >
            <Segment className="feminism-and-books">
              <Image
                className="feminism-definition"
                src={feminism3}
                alt={feminism3}
              />
            </Segment>
          </Grid.Column>
          <Grid.Column width={2} only="computer" />
          {randomBooks.map((twoBooks, i) => {
            return (
              <Grid.Column
                key={i}
                className="column-books"
                only="computer"
                verticalAlign="middle"
                width={2}
              >
                {twoBooks.map((book, idx) => {
                  return (
                    <Segment key={idx} className="segment-covers">
                      <img
                        href={booksUrl + book.title}
                        className="image-homepage"
                        src={book.cover}
                        alt={book.title}
                      />
                    </Segment>
                  );
                })}
              </Grid.Column>
            );
          })}
        </Grid.Row>
        <Grid.Row columns={1}>
          <Grid.Column width={16}>
            <h4>About FemHub</h4>
            <p> this is a paragraph about the about portion of it </p>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns={1}>
          <Grid.Column width={16}>
            <p> this is where the form goes </p>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default HomePage;
