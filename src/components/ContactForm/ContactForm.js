import { text } from "@fortawesome/fontawesome-svg-core";
import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import URL from "../../Utils/Constant";

class ContactForm extends Component {
  state = {
    name: "",
    email: "",
    message: "",
    loading: false,
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  };

  handleSend = () => {
    this.setState({
      loading: true,
    });
    this.props.setLoading(this.state.loading);
    const body = { ...this.state };
    delete body.loading;
    fetch(`${URL}/form`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-type": "Application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) throw data.error;
        this.props.history.push("/");
      })
      .catch((err) => {
        console.error(err);
        this.setState({
          loading: false,
        });
      });
  };

  render() {
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
          value={this.state[input.name]}
          as={input.as || undefined}
          rows={input.rows || undefined}
        />
      </Form.Group>
    ));
    return (
      <Form onSubmit={(e) => e.preventDefault()}>
        {inputsJSX}
        <Button variant="info" onClick={this.handleSend} className="col">
          Send
        </Button>
      </Form>
    );
  }
}
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
  setLoading: PropTypes.func.isRequired,
};
export default withRouter(ContactForm);
