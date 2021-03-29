import React from "react";
import ContactForm from "../../ContactForm/ContactForm";
import Spinner from "../../Spinner/Spinner";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarker,
  faEnvelopeOpenText,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { Container, Row, Col } from "react-bootstrap";
import styles from "./Contact.module.css";

const Contact = () => {
  const setLoading = (loading) => {
    return loading;
  };
  return (
    <Container className="">
      <h1 className="text-center mt-5 pt-3">Contact Us</h1>
      <Row className=" mt-5 align-items-center">
        <Col sm={6} className="ml-auto  mt-5 pt-5">
          <div>
            <div className={styles.iconWrapper}>
              <FontAwesomeIcon icon={faMapMarker} className="text-dark h4" />
            </div>
            <span className="text-info font-weight-bold ml-3 h5">Address</span>
          </div>
          <div>
            <div className={styles.iconWrapper}>
              <FontAwesomeIcon icon={faPhone} className="text-dark h4" />
            </div>
            <span className="text-info font-weight-bold ml-3 h5">Phone</span>
          </div>
          <div>
            <div className={styles.iconWrapper}>
              <FontAwesomeIcon
                icon={faEnvelopeOpenText}
                className="text-dark h4"
              />
            </div>
            <span className="text-info font-weight-bold ml-3 h5">Email</span>
          </div>
        </Col>

        <Col sm={6} className="mr-auto  mt-5 pt-5">
          <ContactForm setLoading={setLoading} />
        </Col>
      </Row>
      {setLoading() && <Spinner />}
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
