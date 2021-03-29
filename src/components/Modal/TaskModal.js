import React, { createRef } from "react";
import PropTypes from "prop-types";
import DatePicker from "react-datepicker";
import formatDate from "../../Utils/dateFormatter";
import { Form, Modal, Button, InputGroup } from "react-bootstrap";

class TaskModal extends React.Component {
  constructor(props) {
    super(props);
    this.inputRef = createRef(null);
    this.state = {
      title: "",
      description: "",
      date: new Date(),
      ...this.props.editableTask,
    };
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (e) => {
    const { title, description, date } = this.state;
    if (!title || !description || (e.type === "keypress" && e.key !== "Enter"))
      return;

    this.props.onSubmit({ ...this.state, date: formatDate(date) });

    this.setState({
      title: "",
      description: "",
    });
  };

  setDate = (date) => {
    this.setState({
      date,
    });
  };
  componentDidMount() {
    this.inputRef.current.focus();
  }

  render() {
    const { onHide, editableTask } = this.props;
    const { title, description, date } = this.state;

    return (
      <Modal show={true} onHide={onHide}>
        <Modal.Header closeButton className="bg-primary text-light">
          <Modal.Title>{!editableTask ? "Add Task" : "Edit Task"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InputGroup className="my-3">
            <Form.Control
              name="title"
              placeholder="Add task"
              type="text"
              placeholder="Title"
              value={title}
              onChange={this.handleChange}
              onKeyPress={this.handleSubmit}
              ref={this.inputRef}
            />
          </InputGroup>
          <InputGroup className="my-3">
            <Form.Control
              name="description"
              value={description}
              placeholder="Description"
              onChange={this.handleChange}
              as="textarea"
              style={{ resize: "none" }}
            />
          </InputGroup>
          <DatePicker selected={date} onChange={(date) => this.setDate(date)} />
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={onHide}
            onClick={this.handleSubmit}
          >
            {!editableTask ? "Add" : "Save"}
          </Button>
          <Button variant="outline-primary" onClick={onHide}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

TaskModal.propTypes = {
  onHide: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  editableTask: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }),
};

export default TaskModal;
