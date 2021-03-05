import React from "react";
import styles from "./Task.module.css";
import { memo } from "react";
import { Col, Card, Form, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit, faCheck } from "@fortawesome/free-solid-svg-icons";

const Task = ({
  task,
  handleDeleteTask,
  handleToggleChecked,
  isCheckedAnyTask,
  isChecked,
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
          <h5 className="mr-auto">{task.title}</h5>

          <Button
            type="button"
            className="align-self-flex-end"
            variant="danger"
            onClick={(e) => handleDeleteTask(task._id)}
            disabled={isCheckedAnyTask}
          >
            <FontAwesomeIcon icon={faTrash} />
          </Button>
          <Button variant="primary" disabled={isCheckedAnyTask}>
            <FontAwesomeIcon icon={faEdit} />
          </Button>
        </Card.Header>
      </Card>
    </Col>
  );
};

export default memo(Task);
