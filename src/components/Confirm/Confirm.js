import React from "react";
import PropTypes from "prop-types";
import { Modal, Button } from "react-bootstrap";

const Confirm = (props) => {
  const { onHide, countOrTaskName, handleDeleteCheckedTasks } = props;
  return (
    <Modal show={true} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Do you sure to delete {countOrTaskName} of tasks ?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button variant="danger" onClick={handleDeleteCheckedTasks}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Confirm;
