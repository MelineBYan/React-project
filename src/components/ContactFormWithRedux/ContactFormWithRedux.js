import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Form, Button, Col, Row, Container } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import {
  setChangesForm,
  resetContactData,
  sendContactData,
} from "../../Redux/actions";
import Spinner from "../Spinner/Spinner";
import styles from "./ContactFormWithHooks.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faExclamation } from "@fortawesome/free-solid-svg-icons";

const ContactFormWithHooks = (props) => {
  const {
    history,
    name,
    email,
    message,
    loading,
    errorMessage,
    setChangesForm,
    resetContactData,
    sendContactData,
  } = props;
  useEffect(() => {
    return function () {
      resetContactData();
    };
  }, []);
  const inputs = [
    {
      name: "name",
      type: "text",
      placeholder: "Name",
      loading: false,
    },
    {
      name: "email",
      type: "email",
      placeholder: "Email",
    },
    {
      name: "message",
      type: null,
      placeholder: "Type your message",
      rows: 3,
      as: "textarea",
    },
  ];

  const inputsJSX = inputs.map((input, idx) => (
    <Form.Group key={idx} className="row d-flex">
      <Form.Control
        name={input.name}
        type={input.type}
        placeholder={input.placeholder}
        onChange={({ target }) => setChangesForm(target)}
        value={[input.name].value}
        as={input.as || undefined}
        rows={input.rows || undefined}
        className={styles.input}
        autoComplete={"off"}
      />
      {[input.name].valid ? (
        <FontAwesomeIcon
          icon={faCheck}
          style={{
            visibility: "hidden",
            fontSize: "17px",
            color: "green",
            position: "relative",
            top: "-20px",
            left: "270px",
          }}
        />
      ) : (
        <FontAwesomeIcon
          icon={faExclamation}
          style={{
            display: "none",
            fontSize: "17px",
            color: "maroon",
            position: "relative",
            top: "-20px",
            left: "265px",
          }}
        />
      )}
    </Form.Group>
  ));

  const error = name.error || email.error || message.error;

  return (
    <Container className="">
      <Row className="d-flex justify-content-center align-items-center mt-5">
        <Col xs={6} className="d-flex justify-content-end mr-0 pr-0">
          {(name.error || email.error || message.error) && (
            <p
              className={styles.errorContainer}
              style={
                name.error
                  ? { bottom: "130px" }
                  : email.error
                  ? { bottom: "65px" }
                  : { bottom: "0px" }
              }
            >
              {error}
            </p>
          )}
        </Col>

        <Col xs={6} className="pr-5">
          <p className=" mb-3 text-danger text-center h6">
            {errorMessage && errorMessage.slice(6).toLowerCase()}
          </p>
          <Form
            onSubmit={(e) => e.preventDefault()}
            style={{
              minWidth: "350px",
              backdropFilter: "blur(50px)",
              backgroundColor: "inherit",
              borderRadius: "8px",
              boxShadow: "20px 20px 22px rgba(0, 0,0, 0.2)",
              padding: "45px",
            }}
          >
            {inputsJSX}
            <div className="row d-flex form-group justify-content-end">
              <Button
                variant="info"
                onClick={() =>
                  sendContactData({ name, email, message }, history)
                }
                className={`${styles.btn} col`}
                disabled={!name.valid || !email.valid || !message.valid}
              >
                <span>Send</span>
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
      {loading && <Spinner />}
    </Container>
  );
};
ContactFormWithHooks.propTypes = {
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

const mapStateToProps = (state) => {
  const { name, message, email } = state.contactReducer;
  const { loading, errorMessage } = state.globalReducer;
  return {
    name,
    message,
    email,
    loading,
    errorMessage,
  };
};
const mapDispatchToProps = {
  setChangesForm,
  resetContactData,
  sendContactData,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ContactFormWithHooks)
);
