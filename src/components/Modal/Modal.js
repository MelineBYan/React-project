import React, { createRef } from "react";
import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid";
import { Form, Modal, Button, InputGroup, Row, Col } from "react-bootstrap";

class Modals extends React.Component {
  constructor(props) {
    super(props);
    this.inputRef = createRef(null);

    this.state = {
      title: "",
      description: "",
    };
  }
  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (e) => {
    if (
      !this.state.title ||
      !this.state.description ||
      (e.type === "keypress" && e.key !== "Enter")
    )
      return;
    this.props.onSubmit({ _id: uuidv4(), ...this.state });

    this.setState({
      title: "",
      description: "",
      inputRef: createRef(),
    });
    this.props.onHide();
  };
  componentDidMount() {
    const { isOpenEditTaskModal, editableTask } = this.props;
    if (isOpenEditTaskModal && editableTask) {
      this.setState({
        title: editableTask.title,
        description: editableTask.description,
      });
    }
    this.inputRef.current.focus();
  }

  render() {
    const {
      onHide,
      onSubmit,
      isOpenEditTaskModal,
      isOpenAddTaskModal,
      editableTask,
    } = this.props;

    const { title, description } = this.state;

    return (
      <Modal show={true} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>
            {isOpenAddTaskModal ? "Add Tasks" : "Edit Tasks"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InputGroup size="lg" className="mb-5 mt-5">
            <Form.Control
              name="title"
              placeholder="Add task"
              type="text"
              placeholder="Add task"
              value={title}
              onChange={this.handleChange}
              onKeyPress={this.handleSubmit}
              ref={this.inputRef}
            />
          </InputGroup>
          <InputGroup className="mb-5 mt-3">
            <Form.Control
              name="description"
              value={description}
              onChange={this.handleChange}
              as="textarea"
              style={{ resize: "none" }}
            />
          </InputGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={onHide}
            onClick={this.handleSubmit}
          >
            {isOpenAddTaskModal ? "Add" : "Save"}
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

Modals.propTypes = {
  onHide: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  isOpenEditTaskModal: PropTypes.bool.isRequired,
  isOpenAddTaskModal: PropTypes.bool.isRequired,
  editableTask: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
};

export default Modals;
