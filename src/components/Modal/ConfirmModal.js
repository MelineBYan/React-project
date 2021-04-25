import React, { memo } from "react";
import PropTypes from "prop-types";
import { Modal, Button } from "react-bootstrap";

const Confirm = (props) => {
  const { onHide, countOrTaskName, handleDeleteCheckedTasks } = props;
  return (
    <Modal show={true} onHide={onHide}>
      <Modal.Header
        closeButton
        className="bg-primary text-light"
      ></Modal.Header>
      <Modal.Body>
        <Modal.Title>
          Are you sure you want to delete {countOrTaskName}
          {countOrTaskName === 1 ? " task ?" : " tasks ?"}
        </Modal.Title>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={handleDeleteCheckedTasks}>
          Yes
        </Button>
        <Button variant="outline-primary" onClick={onHide}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
Confirm.propTypes = {
  onHide: PropTypes.func.isRequired,
  handleDeleteCheckedTasks: PropTypes.func.isRequired,
  countOrTaskName: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
};

export default memo(Confirm);
