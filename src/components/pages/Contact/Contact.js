import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarker,
  faEnvelopeOpenText,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { Container, Row, Col } from "react-bootstrap";
import styles from "./Contact.module.css";
import ContactFormWithRedux from "../../ContactFormWithRedux/ContactFormWithRedux";

const Contact = () => {
  return (
    <Container className={`fluid ${styles.cover} `}>
      <h1 className={styles.title}>
        Contact me<span className={styles.span}>Contact me</span>
      </h1>
      <Row className=" mt-5   align-items-center justify-content-space-around mx-5">
        <Col xs={12} md={4} className=" ml-auto  mt-5 ">
          <div>
            <div className={styles.iconWrapper}>
              <FontAwesomeIcon icon={faMapMarker} className="text-dark h5" />
            </div>
            <span className="font-weight-bold ml-3 h5">
              c. Armavir, Armenia
            </span>
          </div>
          <div>
            <div className={styles.iconWrapper}>
              <FontAwesomeIcon icon={faPhone} className="text-dark h5" />
            </div>
            <span className="font-weight-bold ml-3 h5">+374 94 33 14 20</span>
          </div>
          <div>
            <div className={styles.iconWrapper}>
              <FontAwesomeIcon
                icon={faEnvelopeOpenText}
                className="text-dark h5"
              />
            </div>
            <span className="font-weight-bold ml-3 h5">
              meline.barseghyan.91@gmail.com
            </span>
          </div>
        </Col>

        <Col xs={12} md={8} className=" mr-auto pr-5">
          <ContactFormWithRedux />
        </Col>
      </Row>
    </Container>
  );
};
Contact.propTypes = {
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

export default Contact;
