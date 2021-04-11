import React from "react";
import PropTypes from "prop-types";
import formatDate from "../../Utils/helpers/dateFormatter";
import { Modal, Button } from "react-bootstrap";

const InfoModal = (props) => {
  const { onHide, task } = props;
  return (
    <Modal show={true} onHide={onHide}>
      <Modal.Header closeButton className="bg-info text-light">
        <Modal.Title>Task info</Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-secondary">
        <Modal.Title>
          Title: <b>{task.title}</b>
        </Modal.Title>
        <Modal.Title>
          Description: <b>{task.description}</b>
        </Modal.Title>
        <Modal.Title>
          Date: <b>{task.date.slice(0, 10)}</b>
        </Modal.Title>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-info" onClick={onHide}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
InfoModal.propTypes = {
  onHide: PropTypes.func.isRequired,
};

export default InfoModal;
