import React, { useContext } from "react";
import { contactContext } from "../../Context/Context";
import { Form, Button, Col, Row, Container } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import Spinner from "../Spinner/Spinner";
import styles from "./ContactFormWithHooks.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faExclamation } from "@fortawesome/free-solid-svg-icons";

const ContactFormWithHooks = (props) => {
  const context = useContext(contactContext);
  const { formData, loading, errorMessage, handleChange, handleSend } = context;
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
        onChange={handleChange}
        value={formData[input.name].value}
        as={input.as || undefined}
        rows={input.rows || undefined}
        className={styles.input}
      />
      {formData[input.name].valid ? (
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

  const error =
    formData.name.error || formData.email.error || formData.message.error;

  return (
    <Container className="">
      <Row className="d-flex justify-content-center align-items-center mt-5">
        <Col xs={6} className="d-flex justify-content-end mr-0 pr-0">
          {(formData.name.error ||
            formData.email.error ||
            formData.message.error) && (
            <p
              className={styles.errorContainer}
              style={
                formData.name.error
                  ? { bottom: "130px" }
                  : formData.email.error
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
            {errorMessage.slice(6).toLowerCase()}
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
                onClick={handleSend}
                className={`${styles.btn} col`}
                disabled={
                  formData.name.error ||
                  formData.email.error ||
                  formData.message.error
                }
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

export default withRouter(ContactFormWithHooks);
