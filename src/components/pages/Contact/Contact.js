import React from "react";
import ContactForm from "../../ContactForm/ContactForm";
import Spinner from "../../Spinner/Spinner";
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
    <Container>
      <h1 className="text-center">Contact Us</h1>
      <Row className="align-items-baseline justify-content-space-around">
        <Col sm={4} className="ml-auto">
          <div>
            <div className={styles.iconWrapper}>
              <FontAwesomeIcon icon={faMapMarker} className="text-dark h4" />
            </div>
            <span className="text-info font-weight-bold ml-3">Address</span>
          </div>
          <div>
            <div className={styles.iconWrapper}>
              <FontAwesomeIcon icon={faPhone} className="text-dark h4" />
            </div>
            <span className="text-info font-weight-bold ml-3">Phone</span>
          </div>
          <div>
            <div className={styles.iconWrapper}>
              <FontAwesomeIcon
                icon={faEnvelopeOpenText}
                className="text-dark h4"
              />
            </div>
            <span className="text-info font-weight-bold ml-3">Email</span>
          </div>
        </Col>

        <Col sm={6} className="mr-auto">
          <ContactForm setLoading={setLoading} />
        </Col>
      </Row>
      {setLoading() && <Spinner />}
    </Container>
  );
};

export default Contact;
