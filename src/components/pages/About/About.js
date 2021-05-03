import React from "react";
import { Container, Row } from "react-bootstrap";
import styles from "./About.module.css";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin } from "@fortawesome/free-solid-svg-icons";

const About = () => {
  return (
    <Container className="mt-5 my-3 bg-light text-light bg-dark shadow-lg p-3">
      <h1 className={styles.title}>
        About me<span className={styles.span}>About me</span>
      </h1>
      <div className={styles.aboutSection}>
        <h4>
          I am <span className={styles.name}>Meline</span>
        </h4>
        <Row className={styles.aboutInfo}>
          <p className={styles.text}>
            I am a future Web developer. I have been interested in the
            programming for a long time. I took this opportunity to learn and
            acquire a new profession․ I'm always in for learning new stuff,
            seeking to improve and grow as a professional and as a person.
          </p>
        </Row>
        <Row>
          <div className={styles.aboutDetails}>
            <p>
              Name: <span className={styles.name}>Meline Barseghyan</span>
            </p>
            <p>
              Age: <span className={styles.name}>29</span>
            </p>
            <p>
              Nationality: <span className={styles.name}>Armenian</span>
            </p>
            <p>
              Address: <span className={styles.name}>c. Armavir, Armenia</span>
            </p>
          </div>
        </Row>
        <Row></Row>
      </div>
      <Footer>
        {/* <FontAwesomeIcon icon={} className="text-dark h5" /> */}
        {/* <FontAwesomeIcon icon={faLinkedin} className="text-dark h5" /> */}
      </Footer>
    </Container>
  );
};
About.propTypes = {
  history: PropTypes.shape({
    action: PropTypes.string,
    block: PropTypes.func.isRequired,
    createHref: PropTypes.func.isRequired,
    go: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired,
    goForward: PropTypes.func.isRequired,
    length: PropTypes.number.isRequired,
    listen: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired,
    push: PropTypes.func.isRequired,
    replace: PropTypes.func.isRequired,
  }).isRequired,
  location: PropTypes.shape({
    hash: PropTypes.string,
    key: PropTypes.string,
    pathname: PropTypes.string,
    search: PropTypes.string,
    state: PropTypes.string,
  }).isRequired,
  match: PropTypes.shape({
    isExact: PropTypes.bool,
    params: PropTypes.shape({
      path: PropTypes.string,
      url: PropTypes.string,
    }).isRequired,
  }).isRequired,
};

export default About;
