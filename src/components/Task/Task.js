import React from "react";
import styles from "./Task.module.css";
import { memo } from "react";
import PropTypes from "prop-types";
import { Col, Card, Form, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit, faCheck } from "@fortawesome/free-solid-svg-icons";

const Task = ({
  task,
  handleDeleteTask,
  handleToggleChecked,
  isCheckedAnyTask,
  isChecked,
  getEditableTask,
}) => {
  const cls = [styles.content];
  if (isChecked) {
    cls.push(styles.checked);
  }

  return (
    <Col
      xs={12}
      sm={12}
      md={6}
      lg={4}
      xl={4}
      className="col-7 d-flex px-3 py-1 mt-2 mx-5"
    >
      <Form.Check
        type="checkbox"
        className="bg-outline-secondary"
        onChange={() => handleToggleChecked(task._id)}
        checked={isChecked}
      ></Form.Check>
      <Card className={cls.join(" ")}>
        <Card.Header className="d-inline-flex  justify-content-between">
          <h3 className="mr-auto">Title: {task.title}</h3>
          <Button
            type="button"
            className="align-self-flex-end"
            variant="danger"
            onClick={(e) => handleDeleteTask(task._id)}
            disabled={isCheckedAnyTask}
          >
            <FontAwesomeIcon icon={faTrash} />
          </Button>
        </Card.Header>
        <Card.Body className="d-inline-flex  justify-content-between">
          <h5 className="mr-auto">Description: {task.description}</h5>
          <Button
            variant="warning"
            disabled={isCheckedAnyTask}
            onClick={() => getEditableTask(task)}
          >
            <FontAwesomeIcon icon={faEdit} />
          </Button>
        </Card.Body>
      </Card>
    </Col>
  );
};
Task.propTypes = {
  task: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
  handleDeleteTask: PropTypes.func.isRequired,
  handleToggleChecked: PropTypes.func.isRequired,
  isCheckedAnyTask: PropTypes.bool.isRequired,
  getEditableTask: PropTypes.func.isRequired,
};

export default memo(Task);
