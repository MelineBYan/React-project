import React from "react";
import { Container, Row, Button, Col } from "react-bootstrap";
import styles from "./About.module.css";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";
import { faDownload } from "@fortawesome/free-solid-svg-icons";

const About = () => {
  return (
    <Container className="bg-light text-light bg-dark shadow-lg ">
      <h1 className={styles.title}>
        About me<span className={styles.span}>About me</span>
      </h1>
      <div className={styles.aboutSection}>
        <h4>
          I am <span className={styles.name}>Meline</span>
        </h4>
        <Row className={styles.aboutInfo}>
          <p className={styles.text}>
            I am a Full Stack developer. I currently work at Preezma - a
            software development and IT consulting company in Yerevan, Armenia.
            Coding is my passion. I spend most of my free time learning new
            technologies. I am proficient in Javascript, React.js, Node.js,
            Typescript.
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
        <Row>
          <Col>
            <Button variant="info" className={styles.btn}>
              <Link
                to="/CV-Meline-Barseghyan.pdf"
                target="_blank"
                download
                style={{
                  color: "white",
                  textDecoration: "none",
                }}
              >
                Download CV
                <FontAwesomeIcon icon={faDownload} className="text-dark" />
              </Link>
            </Button>
          </Col>
        </Row>
      </div>
      <div className="d-flex">
        <Button
          variant="dark"
          className="ml-auto"
          onClick={() =>
            (window.location =
              "https://www.linkedin.com/in/meline-barseghyan-62363a207/")
          }
        >
          <FontAwesomeIcon icon={faLinkedin} className="text-light h5" />
        </Button>
        <Button
          variant="dark"
          className="mr-auto"
          onClick={() => (window.location = "https://github.com/MelineBYan")}
        >
          <FontAwesomeIcon icon={faGithub} className="text-light h5" />
        </Button>
      </div>
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
