import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import styles from "./ContactForm.module.css";
import URL from "../../Utils/Constants";

const ContactForm = (props) => {
  const [formData, setFormData] = useState({
    name: {
      value: "",
      error: null,
      valid: false,
    },
    email: {
      value: "",
      error: null,
      valid: false,
    },
    message: {
      value: "",
      error: null,
      valid: false,
    },
  });

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleChange = ({ target: { name, value } }) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSend = () => {
    setLoading(true);
    const body = { ...formData };
    fetch(`${URL}/form`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-type": "Application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) throw data.error;
        props.history.push("/");
      })
      .catch((err) => {
        console.error(err.message);
        setLoading(true);
        setErrorMessage(null);
      });
  };

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
    <Form.Group key={idx}>
      <Form.Control
        name={input.name}
        type={input.type}
        placeholder={input.placeholder}
        onChange={this.handleChange}
        value={formData[input.name]}
        as={input.as || undefined}
        rows={input.rows || undefined}
        className="col bg-dark text-light d-inline-block"
      />
      {errorMessage && (
        <span className={styles.errorContainer}>
          {`${input.name} is required`}
        </span>
      )}
    </Form.Group>
  ));
  return (
    <>
      <p>{this.state.errorMessage}</p>
      <Form onSubmit={(e) => e.preventDefault()} style={{ maxWidth: "60%" }}>
        {inputsJSX}
        <Button variant="info" onClick={this.handleSend} className="col">
          Send
        </Button>
      </Form>
    </>
  );
};
ContactForm.propTypes = {
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
export default withRouter(ContactForm);
