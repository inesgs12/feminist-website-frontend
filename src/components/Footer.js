import React from "react";
import { Icon } from "semantic-ui-react";

class Footer extends React.Component {
  render() {
    return (
      <footer className="Footer">
        <h4 className="footer-text">
          <a
            className="footer-text"
            href="https://www.linkedin.com/in/inesguerrerosirker/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon name="copyright" /> Ines Guerrero 2019
          </a>
        </h4>
      </footer>
    );
  }
}

export default Footer;
