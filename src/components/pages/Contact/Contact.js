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
      <h1 className="text-center ">Contact Us</h1>
      <Row className=" mt-5 pt-5  align-items-center justify-content-space-around mx-5">
        <Col xs={12} md={4} className=" ml-auto  mt-5 ">
          <div>
            <div className={styles.iconWrapper}>
              <FontAwesomeIcon icon={faMapMarker} className="text-dark h4" />
            </div>
            <span className="text-info font-weight-bold ml-3 h5">
              Address, City, Country
            </span>
          </div>
          <div>
            <div className={styles.iconWrapper}>
              <FontAwesomeIcon icon={faPhone} className="text-dark h4" />
            </div>
            <span className="text-info font-weight-bold ml-3 h5">
              Phone +374 00 000000
            </span>
          </div>
          <div>
            <div className={styles.iconWrapper}>
              <FontAwesomeIcon
                icon={faEnvelopeOpenText}
                className="text-dark h4"
              />
            </div>
            <span className="text-info font-weight-bold ml-3 h5">
              Email contact@email.com
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
