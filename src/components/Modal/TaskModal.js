import React, { useEffect, useRef, memo } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import DatePicker from "react-datepicker";
import {
  changeModalForm,
  setDate,
  submitTaskModalForm,
  setModalInitialState,
  resetModalData,
} from "../../Redux/actions";
import { Form, Modal, Button, InputGroup } from "react-bootstrap";

const TaskModal = (props) => {
  const inputRef = useRef(null);
  const {
    state,
    onHide,
    onSubmit,
    editableTask,
    changeModalForm,
    setDate,
    setState,
    resetModalData,
  } = props;

  const { title, description, date } = state;
  useEffect(() => {
    inputRef.current.focus();
    setState(props.editableTask);
    return () => {
      resetModalData();
    };
  }, []);

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
            onChange={(e) => changeModalForm(e.target)}
            onKeyPress={(e) => submitTaskModalForm(e, state, onSubmit)}
            ref={inputRef}
          />
        </InputGroup>
        <InputGroup className="my-3">
          <Form.Control
            name="description"
            value={description}
            placeholder="Description"
            onChange={(e) => changeModalForm(e.target)}
            as="textarea"
            style={{ resize: "none" }}
          />
        </InputGroup>
        <DatePicker selected={date} onChange={(date) => setDate(date)} />
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="primary"
          onClick={onHide}
          onClick={(e) => submitTaskModalForm(e, state, onSubmit)}
        >
          {!editableTask ? "Add" : "Save"}
        </Button>
        <Button variant="outline-primary" onClick={onHide}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

TaskModal.propTypes = {
  onHide: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  editableTask: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }),
};

const mapStateToProps = (state) => {
  return {
    state: state.taskModalReducer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeModalForm: (data) => dispatch(changeModalForm(data)),
    setDate: (date) => dispatch(setDate(date)),
    setState: (data) => dispatch(setModalInitialState(data)),
    resetModalData: () => dispatch(resetModalData()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(memo(TaskModal));
