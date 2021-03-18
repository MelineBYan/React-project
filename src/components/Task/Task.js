import React from "react";
import styles from "./Task.module.css";
import { memo } from "react";
import PropTypes from "prop-types";
import { Col, Card, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faEdit,
  faCheck,
  faInfo,
} from "@fortawesome/free-solid-svg-icons";

const Task = ({
  task,
  handleDeleteTask,
  handleToggleChecked,
  isCheckedAnyTask,
  completed,
  getEditableTask,
  getTaskInfo,
}) => {
  const cls = [styles.content];
  if (completed) {
    cls.push(styles.checkedTask);
  }

  const clscheck = [];
  if (!completed) {
    clscheck.push(styles.unchecked);
  } else {
    clscheck.push(styles.checked);
  }

  return (
    <Col xs={12} sm={12} md={12} lg={12} xl={12} className=" d-flex my-3 py-0">
      <Button
        variant="light"
        className={`${styles.completeBtn}`}
        onClick={() => handleToggleChecked(task._id)}
      >
        <FontAwesomeIcon icon={faCheck} className={clscheck.join(" ")} />
      </Button>
      <Card className={cls.join(" ")}>
        <Card.Text className="d-inline-flex">
          <span className="mr-auto ml-3">{task.title}</span>

          <Button
            variant="warning"
            disabled={isCheckedAnyTask}
            onClick={() => getEditableTask(task)}
          >
            <FontAwesomeIcon icon={faEdit} />
          </Button>
          <Button
            type="button"
            variant="danger"
            className="mx-1"
            onClick={(e) => handleDeleteTask(task._id)}
            disabled={isCheckedAnyTask}
          >
            <FontAwesomeIcon icon={faTrash} />
          </Button>
          <Button
            variant="info"
            disabled={isCheckedAnyTask}
            onClick={() => getTaskInfo(task)}
          >
            <FontAwesomeIcon icon={faInfo} />
          </Button>
        </Card.Text>
      </Card>
    </Col>
  );
};
Task.propTypes = {
  task: PropTypes.shape({
    _id: PropTypes.string,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }),
  handleDeleteTask: PropTypes.func.isRequired,
  handleToggleChecked: PropTypes.func.isRequired,
  isCheckedAnyTask: PropTypes.bool.isRequired,
  completed: PropTypes.bool.isRequired,
  getEditableTask: PropTypes.func.isRequired,
};

export default memo(Task);
