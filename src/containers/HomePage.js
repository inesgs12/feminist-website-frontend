import React from "react";
import { Grid, Segment, Image, Icon, Item } from "semantic-ui-react";
import feminism3 from "./feminism3.png";
import about from "./About.png";

const booksUrl = "https://the-feminist-hub.herokuapp.com/books/";
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
                      <Image
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
        <Grid.Row columns={3}>
          <Grid.Column width={4} />
          <Grid.Column width={8}>
            <Image src={about} alt="about femhub" />
          </Grid.Column>
          <Grid.Column width={4} />
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={6} />
          <Grid.Column width={4}>
            <Item className="mail-icon" href="mailto:inesgs@gmail.com">
              <Icon className="mail-icon" size="big" name="mail" />
            </Item>
          </Grid.Column>
        </Grid.Row>
        <Grid.Column width={6} />
      </Grid>
    );
  }
}

export default HomePage;
