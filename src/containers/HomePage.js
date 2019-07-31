import React from "react";
import { Grid, Segment, Image } from "semantic-ui-react";
import feminism3 from "./feminism3.png";

class HomePage extends React.Component {
  render() {
    // const { book } = this.props.books.first;
    return (
      <Grid stackable className="homepage-grid">
        <Grid.Row className="first-row" columns={3}>
          <Grid.Column className="feminism-and-books" width={8}>
            <Segment className="feminism-and-books">
              <Image
                className="feminism-definition"
                src={feminism3}
                alt={feminism3}
              />
            </Segment>
          </Grid.Column>
          <Grid.Column width={2} only="computer" />
          <Grid.Column
            className="feminism-and-books"
            only="computer"
            verticalAlign="middle"
            width={3}
          >
            <Segment className="feminism-and-books">
              <Image className="image-1" src={feminism3} alt={feminism3} />
            </Segment>
            <Segment className="feminism-and-books">
              <Image className="image-2" src={feminism3} alt={feminism3} />
            </Segment>
          </Grid.Column>
          <Grid.Column only="computer" verticalAlign="middle" width={3}>
            <Segment className="feminism-and-books">
              <Image className="image-3" src={feminism3} alt={feminism3} />
            </Segment>
            <Segment className="feminism-and-books">
              <Image className="image-4" src={feminism3} alt={feminism3} />
            </Segment>
          </Grid.Column>
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
      // <div className="homepage-grid">
      //   <img className="feminism-definition" src={feminism3} alt={feminism3} />
      //   <img className="book-1" src={feminism3} alt={feminism3} />
      //   <img className="book-2" src={feminism3} alt={feminism3} />
      //   <img className="book-3" src={feminism3} alt={feminism3} />
      //   <img className="book-4" src={feminism3} alt={feminism3} />
      //   <h4 className="about-fh">About FemHub</h4>
      //   <p className="fh-paragraph">
      //     A bit about FH..... lorem ipsum bla bla bla
      //   </p>
      //   <form className="contact-form">This is a form</form>
      // </div>
    );
  }
}

export default HomePage;
