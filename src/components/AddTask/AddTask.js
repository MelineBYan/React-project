import React, { Component } from "react";
import { Form, Button, InputGroup } from "react-bootstrap";

class AddTask extends Component {
  state = {
    inputValue: "",
  };

  handleChange = ({ target }) => {
    this.setState({
      inputValue: target.value,
    });
  };

  handleSubmit = (e) => {
    if (!this.state.inputValue || (e.type === "keypress" && e.key !== "Enter"))
      return;

    this.props.cb(this.state.inputValue);
    this.setState({
      inputValue: "",
    });
  };

  render() {
    return (
      <div>
        <InputGroup size="lg" className="mb-5 mt-5">
          <Form.Control
            placeholder="Add task"
            type="text"
            placeholder="Add task"
            value={this.state.inputValue}
            onChange={this.handleChange}
            onKeyPress={this.handleSubmit}
          />

          <InputGroup.Append>
            <Button variant="primary" onClick={this.handleSubmit}>
              Add
            </Button>
          </InputGroup.Append>
        </InputGroup>
      </div>
    );
  }
}

export default AddTask;
